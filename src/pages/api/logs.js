const fs = require('fs');
const path = require('path');

export const config = {
  api: {
    // 返回 JSON 即使在开发模式
    externalResolver: true
  }
};

const LOG_FILE = path.join(process.cwd(), 'logs', 'requests.log');
function ensureLogDir() {
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function readLastLogs(limit = 100) {
  if (!fs.existsSync(LOG_FILE)) return [];
  const data = fs.readFileSync(LOG_FILE, 'utf8').trim();
  if (!data) return [];
  const lines = data.split('\\n').filter(Boolean);
  return lines.slice(-limit).map((line) => JSON.parse(line));
}

export default function handler(req, res) {
  // 简单读取最近日志
  const logs = readLastLogs(200);
  res.status(200).json({ ok: true, logs });
}