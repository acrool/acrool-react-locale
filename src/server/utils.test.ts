import {TLocale, TLocaleDictionaries} from '../types';
import {formatTranslationMessages} from './utils';

describe('formatTranslationMessages', () => {
    const dict: TLocaleDictionaries = {
        zh: {
            common: {hello: '你好', world: '世界'},
            page: {title: '標題'},
        },
        en: {
            common: {hello: 'Hello', world: 'World'},
            page: {title: 'Title'},
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
