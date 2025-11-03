const fs = require('fs');
const path = require('path');
const os = require('os');
const { IncomingForm } = require('formidable');
const { spawn } = require('child_process');

// 直接在本地 API 路由中处理上传和转换
// 禁用 Next.js 的默认 body 解析，以便用 formidable 处理文件上传
export const config = {
  api: {
    bodyParser: false
  }
};

const MAX_PDF_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB
const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'requests.log');
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
function logEvent(event) {
  try {
    ensureDir(LOG_DIR);
    const line = JSON.stringify({ timestamp: new Date().toISOString(), ...event });
    fs.appendFileSync(LOG_FILE, line + '\\n', 'utf8');
  } catch (e) {
    // 回退日志失败时尽量不影响主流程
  }
}
async function saveUploadedFile(file) {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  ensureDir(uploadsDir);
  // formidable 提供的 filepath 为临时文件
  const tempPath = file.filepath;
  const destPath = path.join(uploadsDir, file.originalFilename);
  // 将临时文件移动到目标路径
  fs.renameSync(tempPath, destPath);
  return destPath;
}

function convertPdfToPng(pdfPath, outputDir, options = {}) {
  return new Promise((resolve, reject) => {
    const dpi = options.dpi || 150;
    const firstPage = options.firstPage;
    const lastPage = options.lastPage;
    const transparent = options.transparent === true;

    ensureDir(outputDir);

    const baseName = path.basename(pdfPath, path.extname(pdfPath)) + '_page';
    const args = ['-png', '-r', String(dpi)];

    if (typeof firstPage === 'number' && typeof lastPage === 'number') {
      args.push('-f', String(firstPage), '-l', String(lastPage));
    }

    if (transparent) {
      // 某些 Poppler 构建支持 -transp，若不支持会失败
      args.push('-transp');
    }

    // 输出前缀
    args.push(pdfPath, path.join(outputDir, baseName));

    const proc = spawn('pdftoppm', args);

    let stderr = '';
    proc.stderr.on('data', (data) => {
      stderr += data.toString();
      // 实时日志
      logEvent({ event: 'pdftoppm_stderr', data: data.toString() });
    });

    proc.on('close', (code) => {
      if (code === 0) {
        // 收集输出的 PNG 文件
        const files = [];
        if (fs.existsSync(outputDir)) {
          const dirFiles = fs.readdirSync(outputDir);
          dirFiles.forEach((f) => {
            if (
              f.startsWith(path.basename(pdfPath, path.extname(pdfPath)) + '_page') &&
              f.endsWith('.png')
            ) {
              files.push(path.posix.join('/outputs', f));
            }
          });
        }
        logEvent({ event: 'conversion_complete', pdf: pdfPath, count: files.length });
        resolve({ ok: true, files });
      } else {
        logEvent({ event: 'conversion_failed', pdf: pdfPath, code, error: stderr });
        reject(new Error(`pdftoppm failed with code ${code}. ${stderr}`));
      }
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const form = new IncomingForm({ keepExtensions: true, multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      logEvent({ event: 'parse_error', error: err.message || 'Invalid form data' });
      res.status(400).json({ ok: false, error: 'Invalid form data' });
      return;
    }

    // PDF 文件校验
    const pdfFile = files?.pdf;
    if (!pdfFile) {
      logEvent({ event: 'missing_pdf' });
      res.status(400).json({ ok: false, error: 'PDF file is required' });
      return;
    }

    // 大小限制
    const size = pdfFile.size != null ? Number(pdfFile.size) : undefined;
    if (typeof size === 'number' && size > MAX_PDF_SIZE_BYTES) {
      logEvent({ event: 'size_exceeded', size, limit: MAX_PDF_SIZE_BYTES });
      res.status(413).json({ ok: false, error: 'PDF file too large' });
      return;
    }

    // 保存文件
    const pdfPath = await saveUploadedFile(pdfFile);
    logEvent({ event: 'file_saved', path: pdfPath, size });

    // 参数解析
    const dpi = fields?.dpi ? parseInt(fields.dpi, 10) : 150;
    const firstPage = fields?.firstPage ? parseInt(fields.firstPage, 10) : undefined;
    const lastPage = fields?.lastPage ? parseInt(fields.lastPage, 10) : undefined;
    const transparent = fields?.transparent === 'true' || fields?.transparent === true;

    const outputDir = path.join(process.cwd(), 'outputs');
    ensureDir(outputDir);

    try {
      logEvent({ event: 'conversion_start', pdf: pdfPath, dpi, firstPage, lastPage, transparent });
      const result = await convertPdfToPng(pdfPath, outputDir, {
        dpi,
        firstPage,
        lastPage,
        transparent,
      });

      res.status(200).json({
        ok: true,
        outputs: result.files,
        pdf: pdfPath,
        options: { dpi, firstPage, lastPage, transparent },
      });
      logEvent({ event: 'conversion_success', pdf: pdfPath, outputs: result.files.length });
    } catch (e) {
      logEvent({ event: 'conversion_error', pdf: pdfPath, error: e.message });
      res.status(500).json({ ok: false, error: e.message || 'Conversion failed' });
    }
  });
}