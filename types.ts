export type LanguageCode =
  | 'en' | 'fa' | 'ru' | 'de' | 'es' // Original
  | 'ar' | 'hi' | 'he' | 'el' | 'ja' // New additions batch 1
  | 'ko' | 'th' | 'uk' | 'bg' | 'ka' // New additions batch 2
  | 'hy' | 'sr' | 'mk' | 'be' | 'am' // New additions batch 3
  | 'my' | 'km' | 'lo' | 'si' | 'dv' // New additions batch 4
  | 'ti' | 'iu'; // New additions batch 5

export type Direction = 'ltr' | 'rtl';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  dir: Direction;
  map: { [key: string]: string };
}

export type AppMode = 'freeform' | 'practice';

export interface PracticeSessionResult {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

export type CustomMap = Record<string, string>;
export type CustomMaps = Partial<Record<LanguageCode, CustomMap>>;
