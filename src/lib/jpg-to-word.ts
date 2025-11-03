"use client";
import { createWorker } from "tesseract.js";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";

type ConvertOptions = {
  language?: string; // e.g. 'chi_sim+eng'
  onProgress?: (p: number, fileIndex: number, fileName: string) => void;
};

export async function convertImagesToDocx(
  files: File[],
  options: ConvertOptions = {}
): Promise<{ name: string; url: string }> {
  if (typeof window === "undefined") {
    throw new Error("此功能只能在浏览器中运行");
  }

  if (!files.length) {
    throw new Error("请先选择图片文件");
  }

  const language = options.language || "chi_sim+eng";

  // Create Tesseract worker (no logger to avoid DataCloneError)
  const worker = await createWorker();
  await worker.loadLanguage(language);
  await worker.initialize(language);

  try {
    const paragraphs: Paragraph[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Recognize text
      const imageUrl = URL.createObjectURL(file);
      const { data } = await worker.recognize(imageUrl);
      // Emit near-100% when finishing each image
      options.onProgress?.(100, i, file.name);
      URL.revokeObjectURL(imageUrl);

      const text = (data?.text || "").trim();

      // Add a page header for each image
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: `Image: ${file.name}`,
              bold: true,
              size: 26,
            }),
          ],
        })
      );

      paragraphs.push(new Paragraph(""));

      // Add OCR text (split to avoid overly long runs)
      const lines = text.split(/\r?\n/);
      for (const line of lines) {
        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({ text: line }),
            ],
          })
        );
      }

      if (i < files.length - 1) {
        paragraphs.push(new Paragraph(""));
        paragraphs.push(new Paragraph(""));
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs.length ? paragraphs : [new Paragraph("")],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const name = "jpg-to-word.docx";

    return { name, url };
  } finally {
    await worker.terminate();
  }
}


