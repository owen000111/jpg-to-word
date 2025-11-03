"use client";
import { PDFDocument } from "pdf-lib";

export async function convertImagesToPdf(files: File[]): Promise<{ name: string; url: string }> {
  if (typeof window === 'undefined') {
    throw new Error('此功能只能在浏览器中运行');
  }

  try {
    console.log('开始将图片转换为PDF...', { fileCount: files.length });

    // 创建新的 PDF 文档
    const pdfDoc = await PDFDocument.create();

    // 遍历所有图片文件
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`正在处理第 ${i + 1}/${files.length} 个图片: ${file.name}`);

      // 读取图片文件
      const arrayBuffer = await file.arrayBuffer();
      
      // 嵌入图片到 PDF（支持 PNG、JPEG、WEBP）
      let image;
      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();
      
      console.log(`处理图片类型: ${fileType}, 文件名: ${file.name}`);
      
      try {
        // 首先根据文件类型和扩展名判断
        if (fileType === 'image/png' || fileName.endsWith('.png')) {
          console.log(`尝试作为 PNG 嵌入...`);
          image = await pdfDoc.embedPng(arrayBuffer);
          console.log(`PNG 嵌入成功，尺寸: ${image.width}x${image.height}`);
        } else if (
          fileType === 'image/jpeg' || 
          fileType === 'image/jpg' || 
          fileName.endsWith('.jpg') || 
          fileName.endsWith('.jpeg')
        ) {
          console.log(`尝试作为 JPEG 嵌入...`);
          image = await pdfDoc.embedJpg(arrayBuffer);
          console.log(`JPEG 嵌入成功，尺寸: ${image.width}x${image.height}`);
        } else if (fileType === 'image/webp' || fileName.endsWith('.webp')) {
          // WEBP 格式需要特殊处理：pdf-lib 不支持 WEBP，需要先转换为 PNG
          console.log(`检测到 WEBP 格式，尝试转换为 PNG...`);
          // 对于 WEBP，我们尝试使用 Canvas API 转换
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('无法创建 Canvas 上下文');
          }
          
          const img = new Image();
          const imgUrl = URL.createObjectURL(file);
          
          await new Promise((resolve, reject) => {
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              URL.revokeObjectURL(imgUrl);
              resolve(null);
            };
            img.onerror = () => {
              URL.revokeObjectURL(imgUrl);
              reject(new Error('无法加载 WEBP 图片'));
            };
            img.src = imgUrl;
          });
          
          // 将 Canvas 转换为 PNG
          const pngBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Canvas 转 PNG 失败'));
              }
            }, 'image/png');
          });
          
          const pngArrayBuffer = await pngBlob.arrayBuffer();
          image = await pdfDoc.embedPng(pngArrayBuffer);
          console.log(`WEBP 转换成功，尺寸: ${image.width}x${image.height}`);
        } else {
          // 尝试作为 PNG 处理
          console.log(`未知格式，尝试作为 PNG 处理...`);
          try {
            image = await pdfDoc.embedPng(arrayBuffer);
            console.log(`PNG 嵌入成功`);
          } catch (pngError) {
            console.log(`PNG 嵌入失败，尝试作为 JPEG...`);
            // 如果失败，尝试作为 JPEG
            image = await pdfDoc.embedJpg(arrayBuffer);
            console.log(`JPEG 嵌入成功`);
          }
        }
      } catch (embedError) {
        console.error(`图片嵌入失败 (${file.name}):`, embedError);
        throw new Error(`无法处理图片 "${file.name}": ${embedError instanceof Error ? embedError.message : String(embedError)}`);
      }

      // 创建新页面，使用图片的尺寸
      const page = pdfDoc.addPage([image.width, image.height]);
      
      // 将图片绘制到页面上
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      console.log(`第 ${i + 1} 个图片处理完成`);
    }

    // 生成 PDF 字节数组
    const pdfBytes = await pdfDoc.save();
    console.log('PDF生成完成');

    // 创建 Blob 和 URL
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // 生成文件名
    const fileName = 'pngtopdf.pdf';

    return {
      name: fileName,
      url: url,
    };

  } catch (error) {
    console.error('图片转PDF失败:', error);
    let errorMessage = '未知错误';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      errorMessage = String(error);
    }
    
    console.error('错误详情:', {
      error,
      errorType: typeof error,
      errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    throw new Error(`图片转PDF失败: ${errorMessage}`);
  }
}






