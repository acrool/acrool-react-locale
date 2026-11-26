import {act,renderHook} from '@testing-library/react';
import React, {ReactNode} from 'react';

import {useLocale} from './hook';
import {LocaleProvider} from './LocaleProvider';


const localeDictionaries = {
    'zh-TW': {
        common: {
            'common.hello': '你好',
            'common.greet': '哈囉, {name}!'
        }
    },
    'en-US': {
        common: {
            'common.hello': 'Hi',
            'common.greet': 'Hello, {name}!'
        }
    }
};

describe('useLocale', () => {
    beforeEach(() => {
        // 語系會存進 localStorage，每個測試從預設語系開始
        window.localStorage.clear();
    });

    function wrapper({children}: { children: ReactNode }) {
        return (
            <LocaleProvider
                localeDictionaries={localeDictionaries}
                defaultLocale="zh-TW"
                ignoreMissingLocaleMessage
            >
                {children}
            </LocaleProvider>
        );
    }

    it('能正確取得 t/i18n/locale/setLocale', () => {
        const {result} = renderHook(() => useLocale(), {wrapper});
        expect(result.current.locale).toBe('zh-TW');
        expect(result.current.t('common.hello')).toBe('你好');
        expect(result.current.t('common.greet', {args: {name: '小明'}})).toBe('哈囉, 小明!');
    });

    it('setLocale 能切換語言', () => {
        const {result} = renderHook(() => useLocale(), {wrapper});
        act(() => {
            result.current.setLocale('en-US');
        });
        expect(result.current.locale).toBe('en-US');
    });

    it('切換語言後 t 用新語系的翻譯', () => {
        const {result} = renderHook(() => useLocale(), {wrapper});
        act(() => {
            result.current.setLocale('en-US');
        });
        expect(result.current.t('common.greet', {args: {name: 'Amy'}})).toBe('Hello, Amy!');
    });

    it('數字參數原樣輸出；找不到的 key 回傳 key 本身', () => {
        const {result} = renderHook(() => useLocale(), {wrapper});
        expect(result.current.t('common.greet', {args: {name: 1234567}})).toBe('哈囉, 1234567!');
        expect(result.current.t('common.not_exist' as any)).toBe('common.not_exist');
    });

    it('t 支援 def 預設值', () => {
        const {result} = renderHook(() => useLocale(), {wrapper});
        expect(result.current.t('common.not_exist' as any, {def: '預設值'})).toBe('預設值');
    });
}); 
