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
import {decodeToJson} from 'bear-jsutils/string';
import RegisterGlobal from '../RegisterGlobal';
import {II18nTexts, TLocaleSetting, TMessage} from '../typings';
import {formatTranslationMessages} from '../utils';




// Stores
interface IProps{
    localeConfig: TLocaleSetting
    children: JSX.Element
    // messages: TMessage
    defaultLocale?: ELocales,
    persistKey: string,
}



const LanguageProvider = ({
    localeConfig,
    // messages,
    defaultLocale= ELocales.enUS,
    persistKey = 'persist:bear-locale',
    children
}: IProps) => {
    let initLocale = defaultLocale;
    const persistString = window.localStorage.getItem(persistKey);
    if(persistString){
        const persistLocale = decodeToJson<{locale: ELocales}>(persistString)?.locale;
        if(persistLocale){
            initLocale = persistLocale;
        }
    }

    const [locale, setLocale] = useState<ELocales>(initLocale);

    // @ts-ignore
    const message = formatTranslationMessages(locale, localeConfig[locale], defaultLocale, localeConfig);

    useEffect(() => {
        // 同步語系到瀏覽器中
        window.localStorage.setItem(persistKey, JSON.stringify({locale}));

    }, [locale]);


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
