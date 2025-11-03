"use client";
import { useCallback, useState } from "react";

type UploadAreaProps = {
  onFiles: (files: File[]) => void;
  maxSizeMB?: number;
};

export default function UploadArea({ onFiles, maxSizeMB = 50 }: UploadAreaProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (f: File) => {
    const isImage = f.type.startsWith("image/") || 
      /\.(png|jpg|jpeg|webp)$/i.test(f.name);
    const okSize = f.size <= maxSizeMB * 1024 * 1024;
    return { isImage, okSize };
  };

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    setError(null);
    
    const arr = Array.from(fileList);
    const valid: File[] = [];
    const invalid: string[] = [];

    arr.forEach(f => {
      const v = validate(f);
      if (v.isImage && v.okSize) {
        valid.push(f);
      } else {
        if (!v.isImage) {
          invalid.push(`${f.name} - 不是图片文件`);
        } else if (!v.okSize) {
          invalid.push(`${f.name} - 文件过大 (超过 ${maxSizeMB}MB)`);
        }
      }
    });

    if (invalid.length > 0) {
      setError(invalid.join(", "));
    }

    if (valid.length > 0) {
      onFiles(valid);
    }
  }, [onFiles, maxSizeMB]);

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
          dragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={(e) => { 
          e.preventDefault(); 
          setDragging(true); 
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { 
          e.preventDefault(); 
          setDragging(false); 
          handleFiles(e.dataTransfer.files); 
        }}
      >
        <div className="space-y-4">
          {/* Upload Icon */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          {/* Main Text */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              拖拽您的文件到这里
            </h3>
            <p className="text-gray-600 mb-4">
              或者点击下面的按钮选择文件
            </p>
          </div>

          {/* Upload Button */}
          <label className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            选择图片文件
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,.png,.jpg,.jpeg,.webp"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>

          {/* File Info */}
          <div className="text-sm text-gray-500">
            <p>支持多文件上传，支持 PNG、JPG、JPEG、WEBP</p>
            <p>每个文件最大 {maxSizeMB}MB</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">文件验证失败</h3>
                <div className="mt-1 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}