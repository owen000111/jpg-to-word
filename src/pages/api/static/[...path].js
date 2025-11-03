const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

export default function handler(req, res) {
  const { path: filePath } = req.query;
  
  if (!filePath || !Array.isArray(filePath)) {
    return res.status(400).json({ error: 'Invalid path' });
  }
  
  // 构建文件路径
  const fullPath = path.join(process.cwd(), 'public', ...filePath);
  
  // 安全检查 - 确保文件在public目录内
  if (!fullPath.startsWith(path.join(process.cwd(), 'public'))) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  // 检查文件是否存在
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  try {
    // 读取文件
    const fileBuffer = fs.readFileSync(fullPath);
    const mimeType = mime.lookup(fullPath) || 'application/octet-stream';
    
    // 设置响应头
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 缓存1小时
    
    // 发送文件
    res.send(fileBuffer);
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ error: 'Error reading file' });
  }
}



