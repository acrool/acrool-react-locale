import { isEmpty, formatTranslationMessages, formatTranslationMessagesAsync } from './utils';
import type { TLocale, TLocaleDictionaries, TLocaleDictionariesAsync } from './types';

describe('isEmpty', () => {
  it('應正確判斷空值', () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('   ')).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
  });
  it('應正確判斷非空值', () => {
    expect(isEmpty('abc')).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(new Date())).toBe(false);
  });
  it('可自訂 isZero/isFalse 行為', () => {
    expect(isEmpty(0, { isZero: false })).toBe(false);
    expect(isEmpty(false, { isFalse: false })).toBe(false);
  });
});

describe('formatTranslationMessages', () => {
  const dict: TLocaleDictionaries = {
    zh: {
      common: { hello: '你好', world: '世界' },
      page: { title: '標題' },
    },
    en: {
      common: { hello: 'Hello', world: 'World' },
      page: { title: 'Title' },
    },
  };
  it('應正確扁平化指定語系', () => {
    expect(formatTranslationMessages('zh', 'en', dict)).toEqual({
      hello: '你好',
      world: '世界',
      title: '標題',
    });
    expect(formatTranslationMessages('en', 'zh', dict)).toEqual({
      hello: 'Hello',
      world: 'World',
      title: 'Title',
    });
  });
  it('找不到 locale 時 fallback 到 defaultLocale', () => {
    expect(formatTranslationMessages('ja' as TLocale, 'en', dict)).toEqual({
      hello: 'Hello',
      world: 'World',
      title: 'Title',
    });
  });
  it('找不到 locale 及 defaultLocale 時回傳空物件', () => {
    expect(formatTranslationMessages('ja' as TLocale, 'fr' as TLocale, dict)).toEqual({});
  });
});

describe('formatTranslationMessagesAsync', () => {
  const dict: TLocaleDictionariesAsync = {
    zh: async () => ({ default: { common: { hello: '你好' } } }),
    en: { common: { hello: 'Hello' } },
  };
  it('應正確處理同步/非同步字典', async () => {
    await expect(formatTranslationMessagesAsync('zh', 'en', dict)).resolves.toEqual({ hello: '你好' });
    await expect(formatTranslationMessagesAsync('en', 'zh', dict)).resolves.toEqual({ hello: 'Hello' });
  });
  it('找不到 locale 時 fallback 到 defaultLocale', async () => {
    await expect(formatTranslationMessagesAsync('ja' as TLocale, 'en', dict)).resolves.toEqual({ hello: 'Hello' });
  });
  it('找不到 locale 及 defaultLocale 時回傳空物件', async () => {
    await expect(formatTranslationMessagesAsync('ja' as TLocale, 'fr' as TLocale, dict)).resolves.toEqual({});
  });
}); 