"use client";

import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { getTranslation, Language, translations } from "../../lib/i18n";

const KEYWORD = "JPG to Word";

type TranslationKey = keyof typeof translations.zh;

const NAV_LINKS = [
  { labelKey: "navFeatures", href: "#features-jpg-to-word" },
  { labelKey: "navTutorial", href: "#tutorial-jpg-to-word" },
  { labelKey: "navWhy", href: "#why-jpg-to-word" },
  { labelKey: "navBenefits", href: "#benefits-jpg-to-word" },
  { labelKey: "navFAQ", href: "#faq-jpg-to-word" },
  { labelKey: "navCTA", href: "#upload-area" },
] as const;

export function SiteHeader() {
  const language = useLanguage();
  const t = (
    key: TranslationKey,
    params?: Record<string, string | number>
  ) => getTranslation(language, key, params);

  const headerTagline = t("headerTagline", { keyword: KEYWORD });
  const homeUrl = language === "en" ? "/" : `/${language}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <a href={homeUrl} className="hover:opacity-80 transition-opacity">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-500">
                    JPG
                  </span>
                  <span className="mx-2 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider bg-gray-100 text-gray-600 align-middle">
                    to
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500">
                    Word
                  </span>
                </h1>
              </a>
              <span className="ml-3 hidden sm:inline text-sm text-gray-500">
                {headerTagline}
              </span>
            </div>
            <nav className="hidden md:flex space-x-3 text-sm">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1 rounded-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {t(item.labelKey as TranslationKey, { keyword: KEYWORD })}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => {
                  const newLang = e.target.value as Language;
                  if (newLang === "en") {
                    window.location.href = "/";
                    return;
                  }

                  const supported: Language[] = [
                    "es",
                    "pt",
                    "fr",
                    "de",
                  ];

                  if (supported.includes(newLang)) {
                    window.location.href = `/${newLang}`;
                  } else {
                    window.location.href = "/";
                  }
                }}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


