"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { getTranslation, translations } from "../../lib/i18n";
import { convertImagesToDocx } from "../../lib/jpg-to-word";
import { SiteHeader } from "./SiteHeader";

const KEYWORD = "JPG to Word";

type TranslationKey = keyof typeof translations.zh;

const WHY_POINTS = [
  {
    titleKey: "whyPointEditableTitle",
    descKey: "whyPointEditableDesc",
    icon: "📝",
    color: "bg-blue-100 text-blue-600",
  },
  {
    titleKey: "whyPointPrivateTitle",
    descKey: "whyPointPrivateDesc",
    icon: "🔒",
    color: "bg-purple-100 text-purple-600",
  },
  {
    titleKey: "whyPointWorkflowTitle",
    descKey: "whyPointWorkflowDesc",
    icon: "⚡",
    color: "bg-pink-100 text-pink-600",
  },
];

const FEATURE_CARDS = [
  {
    titleKey: "featureLocalTitle",
    descKey: "featureLocalDesc",
    icon: "⚙️",
    color: "bg-blue-100 text-blue-600",
  },
  {
    titleKey: "featureLanguageTitle",
    descKey: "featureLanguageDesc",
    icon: "🌐",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    titleKey: "featureBatchTitle",
    descKey: "featureBatchDesc",
    icon: "🗂️",
    color: "bg-amber-100 text-amber-600",
  },
  {
    titleKey: "featureParagraphTitle",
    descKey: "featureParagraphDesc",
    icon: "📐",
    color: "bg-rose-100 text-rose-600",
  },
];

const TUTORIAL_STEPS = [
  {
    titleKey: "tutorialStep1Title",
    detailKey: "tutorialStep1Desc",
    color: "bg-blue-100 text-blue-600 border border-blue-200",
  },
  {
    titleKey: "tutorialStep2Title",
    detailKey: "tutorialStep2Desc",
    color: "bg-purple-100 text-purple-600 border border-purple-200",
  },
  {
    titleKey: "tutorialStep3Title",
    detailKey: "tutorialStep3Desc",
    color: "bg-amber-100 text-amber-600 border border-amber-200",
  },
];

const BENEFITS = [
  {
    titleKey: "benefit1Title",
    descKey: "benefit1Desc",
    icon: "🚀",
    color: "bg-sky-100 text-sky-600",
  },
  {
    titleKey: "benefit2Title",
    descKey: "benefit2Desc",
    icon: "⌨️",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    titleKey: "benefit3Title",
    descKey: "benefit3Desc",
    icon: "🔍",
    color: "bg-lime-100 text-lime-600",
  },
  {
    titleKey: "benefit4Title",
    descKey: "benefit4Desc",
    icon: "♿",
    color: "bg-orange-100 text-orange-600",
  },
];

const FAQ_ITEMS = [
  {
    questionKey: "faq1Question",
    answerKey: "faq1Answer",
    icon: "🛡️",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    questionKey: "faq2Question",
    answerKey: "faq2Answer",
    icon: "🎯",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    questionKey: "faq3Question",
    answerKey: "faq3Answer",
    icon: "🖼️",
    color: "bg-violet-100 text-violet-700",
  },
  {
    questionKey: "faq4Question",
    answerKey: "faq4Answer",
    icon: "✏️",
    color: "bg-amber-100 text-amber-700",
  },
  {
    questionKey: "faq5Question",
    answerKey: "faq5Answer",
    icon: "📦",
    color: "bg-rose-100 text-rose-700",
  },
];

export default function HomePageClient() {
  const MAX_FILES = 20;
  const MAX_SIZE_PER = 10 * 1024 * 1024; // 10MB
  const MAX_TOTAL = 200 * 1024 * 1024; // 200MB
  const language = useLanguage();
  const t = (key: keyof typeof import('../../lib/i18n').translations.zh, params?: Record<string, string | number>) => 
    getTranslation(language, key, params);
  
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heroBadge = t('heroBadge', { keyword: KEYWORD });
  const heroTitle = t('heroTitle', { keyword: KEYWORD });
  const heroDescription = t('heroDescription', { keyword: KEYWORD });
  const heroPrimaryCta = t('heroPrimaryCta', { keyword: KEYWORD });
  const heroSecondaryCta = t('heroSecondaryCta', { keyword: KEYWORD });

  const uploadTitle = t('uploadHeroTitle', { keyword: KEYWORD });
  const uploadSubtitle = t('uploadHeroSubtitle', { keyword: KEYWORD });
  const uploadButtonText = t('uploadHeroButton');

  const actionStartText = t('actionStart', { keyword: KEYWORD });
  const actionDownloadText = t('actionDownload', { keyword: KEYWORD });

  const resultTitle = t('resultTitle', { keyword: KEYWORD });
  const resultDescription = t('resultDescription', { count: files.length || 0, keyword: KEYWORD });
  const resultDownloadText = t('resultDownload', { keyword: KEYWORD });

  const whyLabel = t('whyLabel', { keyword: KEYWORD });
  const whyHeading = t('whyHeading', { keyword: KEYWORD });
  const featuresLabel = t('featuresLabel');
  const featuresHeading = t('featuresHeading', { keyword: KEYWORD });
  const tutorialLabel = t('tutorialLabel');
  const tutorialHeading = t('tutorialHeading', { keyword: KEYWORD });
  const benefitsLabel = t('benefitsLabel');
  const benefitsHeading = t('benefitsHeading', { keyword: KEYWORD });
  const faqLabel = t('faqLabel');
  const faqHeading = t('faqHeading', { keyword: KEYWORD });
  const finalCtaTitle = t('finalCtaTitle', { keyword: KEYWORD });
  const finalCtaDescription = t('finalCtaDescription', { keyword: KEYWORD });
  const finalCtaButton = t('finalCtaButton', { keyword: KEYWORD });

  // Update document title and description based on current language
  useEffect(() => {
    const titleText = getTranslation(language, 'title');
    const descText = getTranslation(language, 'heroDescriptionSimple');
    if (titleText) {
      document.title = titleText;
    }
    if (descText) {
      let meta = document.querySelector('meta[name=\"description\"]') as HTMLMetaElement | null;
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
      setError(e?.message ?? t('conversionFailed'));
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
      console.error("Download failed:", error);
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
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className="inline-flex px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm mb-4">
            {heroBadge}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#upload-area" className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
              {heroPrimaryCta}
            </a>
            <a href="#why-jpg-to-word" className="px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition">
              {heroSecondaryCta}
            </a>
          </div>
        </div>

        {/* Upload Area */}
        <div className="mb-12" id="upload-area">
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
                    {uploadButtonText}
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
                    {uploadTitle}
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {uploadSubtitle}
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
                  actionStartText
                )}
              </button>
              {result && !busy && (
                <button
                  onClick={downloadPdf}
                  className="flex-1 py-4 px-8 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 text-lg font-medium rounded-2xl transition-all duration-200 transform hover:scale-105"
                >
                  {actionDownloadText}
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
                <h3 className="text-sm font-medium text-red-800">{t('conversionFailed')}</h3>
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
                {resultTitle}
              </h3>
              <p className="text-gray-500">
                {resultDescription}
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
                <p className="text-sm text-gray-500">DOCX</p>
              </div>
              <button
                onClick={downloadPdf}
                className="w-full py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0116 9.414V19a2 2 0 01-2 2z" />
                </svg>
                <span>{resultDownloadText}</span>
              </button>
            </div>
          </div>
        )}

        {/* Why Section */}
        <section id="why-jpg-to-word" className="mt-20 max-w-5xl mx-auto">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">{whyLabel}</p>
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            {whyHeading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {WHY_POINTS.map((point) => (
              <div key={point.titleKey} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${point.color}`}>
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(point.titleKey as TranslationKey, { keyword: KEYWORD })}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(point.descKey as TranslationKey, { keyword: KEYWORD })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features-jpg-to-word" className="mt-20 max-w-6xl mx-auto">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">{featuresLabel}</p>
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            {featuresHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURE_CARDS.map((card) => (
              <div key={card.titleKey} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(card.titleKey as TranslationKey)}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t(card.descKey as TranslationKey, { keyword: KEYWORD })}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tutorial Section */}
        <section id="tutorial-jpg-to-word" className="mt-20 max-w-5xl mx-auto">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">{tutorialLabel}</p>
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            {tutorialHeading}
          </h2>
          <div className="space-y-6">
            {TUTORIAL_STEPS.map((step, idx) => (
              <div key={step.titleKey} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold ${step.color}`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(step.titleKey as TranslationKey)}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(step.detailKey as TranslationKey, { keyword: KEYWORD })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits-jpg-to-word" className="mt-20 max-w-4xl mx-auto">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">{benefitsLabel}</p>
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            {benefitsHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {BENEFITS.map((benefit) => (
              <div key={benefit.titleKey} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 shadow-sm">
                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-lg ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">{t(benefit.titleKey as TranslationKey)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {t(benefit.descKey as TranslationKey, { keyword: KEYWORD })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq-jpg-to-word" className="mt-20 max-w-4xl mx-auto">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">{faqLabel}</p>
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            {faqHeading}
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq) => (
              <div key={faq.questionKey} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${faq.color}`}>
                  {faq.icon}
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900 mb-1">{t(faq.questionKey as TranslationKey, { keyword: KEYWORD })}</div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {t(faq.answerKey as TranslationKey, { keyword: KEYWORD })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta-jpg-to-word" className="mt-20 max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-3xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{finalCtaTitle}</h2>
          <p className="text-lg text-blue-50 mb-6">
            {finalCtaDescription}
          </p>
          <a href="#upload-area" className="inline-flex px-10 py-4 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-50 transition">
            {finalCtaButton}
          </a>
        </section>

        {/* Footer - 极简版 */}
        <div className="mt-16 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a
              href="/privacy"
              className="hover:text-gray-700 transition-colors duration-200"
            >
              {t('privacyPolicy')}
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/terms"
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
