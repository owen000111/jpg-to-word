"use client";
import { usePathname } from 'next/navigation';
import { Language } from '../lib/i18n';

export function useLanguage(): Language {
  const pathname = usePathname();
  
  // 检查pathname是否存在
  if (!pathname) {
    return 'en';
  }
  
  // 从路径中提取语言代码
  const segments = pathname.split('/');
  const locale = segments[1];
  
  // 验证语言代码
  const supported: Language[] = ['en','zh','zh-Hant','es','ar','pt','ru','fr','de','ja','ko'];
  if (supported.includes(locale as Language)) return locale as Language;
  
  // 默认为英文
  return 'en';
}
