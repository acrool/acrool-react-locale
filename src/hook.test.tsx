import {act,renderHook} from '@testing-library/react';
import React, {ReactNode} from 'react';
import {createIntl, createIntlCache, IntlProvider, RawIntlProvider} from 'react-intl';

import {useLocale} from './hook';
import {LocaleContext} from './LocaleProvider/context';
import LocaleProvider from "./LocaleProvider";


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

    it('t 支援 def 預設值', () => {
        const {result} = renderHook(() => useLocale(), {wrapper});
        expect(result.current.t('common.not_exist' as any, {def: '預設值'})).toBe('預設值');
    });
}); 
