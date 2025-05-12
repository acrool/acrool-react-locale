import {act,renderHook} from '@testing-library/react';
import React from 'react';
import {createIntl, createIntlCache, IntlProvider, RawIntlProvider} from 'react-intl';

import {useLocale} from './hook';
import {LocaleContext} from './LocaleProvider/context';

const messages = {
    'hello': '你好',
    'greet': '哈囉, {name}!'
};

describe('useLocale', () => {
    function wrapper({children, locale = 'zh-TW'}: any) {
        const [currentLocale, setCurrentLocale] = React.useState(locale);
        const cache = createIntlCache();
        const intl = createIntl({locale: currentLocale, messages, defaultLocale: 'zh-TW'}, cache);
        return (
            <LocaleContext.Provider value={{locale: currentLocale, setLocale: setCurrentLocale}}>
                <RawIntlProvider value={intl}>
                    {children}
                </RawIntlProvider>
            </LocaleContext.Provider>
        );
    }

    it('能正確取得 t/i18n/locale/setLocale', () => {
        const {result} = renderHook(() => useLocale<typeof messages>(), {wrapper});
        expect(result.current.locale).toBe('zh-TW');
        expect(result.current.t('hello')).toBe('你好');
        expect(result.current.t('greet', {args: {name: '小明'}})).toBe('哈囉, 小明!');
    });

    it('setLocale 能切換語言', () => {
        const {result} = renderHook(() => useLocale<typeof messages>(), {wrapper});
        act(() => {
            result.current.setLocale('en-US');
        });
        expect(result.current.locale).toBe('en-US');
    });

    it('t 支援 def 預設值', () => {
        const {result} = renderHook(() => useLocale<typeof messages>(), {wrapper});
        expect(result.current.t('not_exist' as any, {def: '預設值'})).toBe('預設值');
    });
}); 
