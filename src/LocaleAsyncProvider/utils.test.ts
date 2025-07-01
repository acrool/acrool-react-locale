import {TLocale, TLocaleDictionariesOrAsync} from '../types';
import {formatTranslationMessagesAsync} from './utils';

describe('formatTranslationMessagesAsync', () => {
    const dict: TLocaleDictionariesOrAsync = {
        zh: async () => ({common: {hello: '你好'}}),
        en: {common: {hello: 'Hello'}},
    };
    it('應正確處理同步/非同步字典', async () => {
        await expect(formatTranslationMessagesAsync('zh', 'en', dict)).resolves.toEqual({hello: '你好'});
        await expect(formatTranslationMessagesAsync('en', 'zh', dict)).resolves.toEqual({hello: 'Hello'});
    });
    it('找不到 locale 時 fallback 到 defaultLocale', async () => {
        await expect(formatTranslationMessagesAsync('ja' as TLocale, 'en', dict)).resolves.toEqual({hello: 'Hello'});
    });
    it('找不到 locale 及 defaultLocale 時回傳空物件', async () => {
        await expect(formatTranslationMessagesAsync('ja' as TLocale, 'fr' as TLocale, dict)).resolves.toEqual({});
    });
}); 