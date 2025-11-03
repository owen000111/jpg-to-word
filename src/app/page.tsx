"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation, Language } from "../lib/i18n";
import { convertImagesToDocx } from "../lib/jpg-to-word";

export default function Page() {
  const MAX_FILES = 20;
  const MAX_SIZE_PER = 10 * 1024 * 1024; // 10MB
  const MAX_TOTAL = 200 * 1024 * 1024; // 200MB
  const language = useLanguage();
  const t = (key: keyof typeof import('../lib/i18n').translations.zh, params?: Record<string, string | number>) => 
    getTranslation(language, key, params);
  
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update document title and description based on current language
  useEffect(() => {
    const titleText = 'JPG 转 Word — 本地OCR，免费、无需上传';
    const descText = '拖拽JPG/PNG，浏览器本地OCR识别生成Word（docx），保护隐私。';
    if (titleText) {
      document.title = titleText;
    }
    if (descText) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = descText;
    }
  }, [language]);

  const isAcceptableImage = (f: File) => {
    const isImage = f.type.startsWith("image/") || /\.(png|jpg|jpeg|webp)$/i.test(f.name);
    return isImage && f.size <= MAX_SIZE_PER;
  };

  const clampByLimits = (list: File[]): File[] => {
    let filtered = list.filter(isAcceptableImage).slice(0, MAX_FILES);
    // Enforce total size limit by trimming from the end
    let total = 0;
    const kept: File[] = [];
    for (const f of filtered) {
      if (total + f.size <= MAX_TOTAL) {
        kept.push(f);
        total += f.size;
      } else {
        break;
      }
    }
    return kept;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    setFiles((prev) => {
      const merged = [...prev, ...incoming];
      return clampByLimits(merged);
    });
  };

  const onConvert = async () => {
    if (!files.length) return;
    setBusy(true);
    setError(null);
    setResult(null);
    
    try {
      const result = await convertImagesToDocx(files, { language: 'chi_sim+eng' });
      setResult(result);
    } catch (e: any) {
      setError(e?.message ?? "转换失败，请重试");
    } finally {
      setBusy(false);
    }
  };

  const downloadPdf = async () => {
    if (!result) return;
    try {
      const response = await fetch(result.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("下载失败:", error);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setResult(null);
    setError(null);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-500">JPG</span>
                <span className="mx-2 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider bg-gray-100 text-gray-600 align-middle">to</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500">Word</span>
              </h1>
              <span className="ml-3 hidden sm:inline text-sm text-gray-500">{t('subtitle')}</span>
              <span className="ml-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                <svg className="w-3.5 h-3.5 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9s-.2107-1.0391-.5858-1.4142C13.0391 7.2107 12.5304 7 12 7s-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9s.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11zm0 0v4m8-6a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
                {t('privacyNoticeSimple')}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  value={language} 
                  onChange={(e) => {
                    const newLang = e.target.value as Language;
                    const currentPath = window.location.pathname;
                    const segments = currentPath.split('/');
                    
                    // 替换语言代码
                    const supported: Language[] = ['en','zh','zh-Hant','es','ar','pt','ru','fr','de','ja','ko'];
                    if (segments[1] && supported.includes(segments[1] as Language)) {
                      segments[1] = newLang;
                    } else {
                      segments.splice(1, 0, newLang);
                    }
                    
                    const newPath = segments.join('/');
                    window.location.href = newPath;
                  }}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="zh-Hant">繁體中文</option>
                  <option value="es">Español</option>
                  <option value="ar">العربية</option>
                  <option value="pt">Português</option>
                  <option value="ru">Русский</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="ko">한국어</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - 极简版 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-500">JPG</span>
            <span className="mx-2 px-3 py-1 rounded-full text-sm font-semibold tracking-wider bg-gray-100 text-gray-600 align-middle">to</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500">Word</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-500 font-light mb-4">
              {t('heroDescriptionSimple')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start p-4 bg-white/70 backdrop-blur rounded-xl border border-gray-100">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm mt-0.5 mr-3">1</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t('step1Title')}</div>
                  <div className="text-sm text-gray-600 mt-1">{t('step1Desc')}</div>
                  <div className="text-sm text-gray-500 mt-1">{t('step1FileLimit')}</div>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white/70 backdrop-blur rounded-xl border border-gray-100">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm mt-0.5 mr-3">2</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t('step2Title')}</div>
                  <div className="text-sm text-gray-600 mt-1">{t('step2Desc')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area - 苹果风格（扩展并内嵌文件队列） */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div 
              className="relative border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (!e.dataTransfer.files) return;
                const incoming = Array.from(e.dataTransfer.files);
                setFiles((prev) => {
                  const merged = [...prev, ...incoming];
                  return clampByLimits(merged);
                });
              }}
            >
              <div className="space-y-4">
                {/* 隐藏的文件输入（移至顶部） */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,.png,.jpg,.jpeg,.webp"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    {t('selectFiles')}
                  </div>
                </label>

                {/* 极简图标 */}
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>

                {/* 简洁文案 */}
                <div>
                  <h3 className="text-2xl font-light text-gray-800 mb-2">
                    {t('uploadTitleSimple')}
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {t('uploadSubtitleSimple')}
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-8 text-left">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-medium text-gray-900">{t('fileQueueWithCount', { count: files.length })}</h3>
                      <button
                        onClick={clearFiles}
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        {t('clearQueue')}
                      </button>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 divide-y max-h-72 overflow-auto">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3">
                          <div className="flex items-center min-w-0">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-bold text-sm">IMG</span>
                            </div>
                            <span className="text-sm text-gray-700 truncate" title={file.name}>{file.name}</span>
                            <span className="ml-2 text-xs text-gray-500 flex-shrink-0">
                              ({(file.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {busy && (
                              <div className="flex items-center text-blue-600">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                <span className="text-sm">{t('converting')}</span>
                              </div>
                            )}
                            <button
                              onClick={() => removeFile(index)}
                              className="text-xs text-gray-500 hover:text-red-600"
                              title={t('remove')}
                            >
                              {t('remove')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Action Buttons - 苹果风格 */}
        {files.length > 0 && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onConvert}
                disabled={busy || !files.length}
                className="flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-lg font-medium rounded-2xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
              >
                {busy ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {t('converting')}
                  </div>
                ) : (
                  '开始转换为 Word'
                )}
              </button>
              {result && !busy && (
                <button
                  onClick={downloadPdf}
                  className="flex-1 py-4 px-8 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 text-lg font-medium rounded-2xl transition-all duration-200 transform hover:scale-105"
                >
                  下载 Word (.docx)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">转换失败</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Results - 苹果风格 */}
        {result && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-gray-800 mb-2">
                {t('conversionComplete')}
              </h3>
              <p className="text-gray-500">
                Word 文件已准备就绪
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">{result.name}</h4>
                <p className="text-sm text-gray-500">DOCX 文件</p>
              </div>
              <button
                onClick={downloadPdf}
                className="w-full py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>下载 Word (.docx)</span>
              </button>
            </div>
          </div>
        )}

        {/* Why Choose Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">{t('whyChooseTitle')}</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{t('whyChooseP1')}</p>
              <p className="text-gray-700 leading-relaxed">{t('whyChooseP2')}</p>
              <p className="text-gray-700 leading-relaxed">{t('whyChooseP3')}</p>
              <p className="text-gray-700 leading-relaxed">{t('whyChooseP4')}</p>
            </div>
          </div>
        </div>

        {/* Quality & Technical Details */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">{t('qualityTitle')}</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{t('qualityP1')}</p>
              <p className="text-gray-700 leading-relaxed">{t('qualityP2')}</p>
              <p className="text-gray-700 leading-relaxed">{t('qualityP3')}</p>
              <p className="text-gray-700 leading-relaxed">{t('qualityP4')}</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">{t('faqTitle')}</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">{t('faqQ1')}</div>
              <div className="text-sm text-gray-600">{t('faqA1')}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">{t('faqQ2')}</div>
              <div className="text-sm text-gray-600">{t('faqA2')}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">{t('faqQ3')}</div>
              <div className="text-sm text-gray-600">{t('faqA3')}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">{t('faqQ4')}</div>
              <div className="text-sm text-gray-600">{t('faqA4')}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-900 mb-1">{t('faqQ5')}</div>
              <div className="text-sm text-gray-600">{t('faqA5')}</div>
            </div>
          </div>
        </div>

        {/* Footer - 极简版 */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-4">
            {t('privacyNoticeSimple')}
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a 
              href={`/${language}/privacy`}
              className="hover:text-gray-700 transition-colors duration-200"
            >
              {t('privacyPolicy')}
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href={`/${language}/terms`}
              className="hover:text-gray-700 transition-colors duration-200"
            >
              {t('termsOfService')}
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            {t('agreementNotice')}
          </p>
        </div>
    </main>
      </div>
  );
}
