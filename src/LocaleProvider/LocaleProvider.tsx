/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */
import React, {Children, useCallback, useEffect, useState} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import {ELocales, } from '../typings';
import {LocaleContextProvider} from './context';
// import {persistKey} from 'config/app';
// import {decodeToJson} from 'bear-jsutils/string';
import RegisterGlobal from '../RegisterGlobal';
import {II18nTexts, TLocaleSetting, TMessage} from '../typings';
import {formatTranslationMessages} from '../utils';




// Stores
interface IProps{
    localeConfig: TLocaleSetting
    children: JSX.Element
    // messages: TMessage
    defaultLocale: ELocales,
}

// const cacheData = decodeToJson<{locale: ELocales}>(window.localStorage.getItem(persistKey) ?? '');


const LanguageProvider = ({
    localeConfig,
    // messages,
    defaultLocale= ELocales.enUS,
    children
}: IProps) => {
    // const [locale, setLocale] = useState<ELocales>(cacheData?.locale ?? ELocales.enUS);
    const [locale, setLocale] = useState<ELocales>(defaultLocale);


    /**
     *
     * @param locale 選擇語系
     * @param messages 處理字典檔案轉換的 JSON Data
     */
    const formatTranslationMessages = (locale: ELocales, messages: II18nTexts): II18nTexts => {
        // @ts-ignore
        const defaultFormattedMessages = locale !== defaultLocale ? formatTranslationMessages(defaultLocale, localeConfig[defaultLocale]) : {};
        const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
            const formattedMessage = !messages[key] && locale !== defaultLocale ? defaultFormattedMessages[key] : messages[key];
            return Object.assign(formattedMessages, {[key]: formattedMessage});
        };
        return Object.keys(messages).reduce((formattedMessages, key) => flattenFormattedMessages(formattedMessages, key), {});
    };


    // const localeKeys = Object.keys(localeConfig) as ELocales[];
    // let prev: TLocaleSetting = {};
    // const messages = localeKeys.reduce((prev, localeCode) => {
    //     prev[localeCode] = formatTranslationMessages(localeCode, localeConfig[localeCode], localeConfig);
    //     return prev;
    // }, prev);
    // @ts-ignore
    const message = formatTranslationMessages(locale, localeConfig[locale]);


    // const activeMessage = messages[locale];

    // useEffect(() => {
        // 同步語系到瀏覽器中
        // window.localStorage.setItem(persistKey, JSON.stringify({locale}));

    // }, [locale]);


    return <LocaleContextProvider
        value={{
            locale,
            setLocale,
        }}

    >
        <IntlProvider
            locale={locale}
            key={locale}
            defaultLocale={ELocales.enUS}
            messages={message}
            // @ts-ignore
            textComponent={TranslationWrapper}
        >
            <RegisterGlobal>
                {Children.only(children)}
            </RegisterGlobal>
        </IntlProvider>

    </LocaleContextProvider>;

};

export default LanguageProvider;
