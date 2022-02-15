/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */
import React, {Children, useEffect, useState} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import {TLocales} from '../typings';
import {LocaleContextProvider} from './context';
import RegisterGlobal from '../RegisterGlobal';
import {TLocaleDictionaries} from '../typings';
import {formatTranslationMessages} from '../utils';




// Stores
interface IProps{
    localeConfig: TLocaleDictionaries
    children: JSX.Element
    // messages: TMessage
    defaultLocale: TLocales,
    persistKey: string,
}



const LanguageProvider = ({
    localeConfig,
    // messages,
    defaultLocale,
    persistKey = 'persist:bear_locale',
    children
}: IProps) => {
    const initLocale = (window.localStorage.getItem(persistKey) || defaultLocale) as TLocales;

    const [locale, setLocale] = useState<TLocales>(initLocale);

    // @ts-ignore
    const message = formatTranslationMessages(locale, defaultLocale, localeConfig);

    useEffect(() => {
        // 同步語系到瀏覽器中
        window.localStorage.setItem(persistKey, locale);

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
            defaultLocale={defaultLocale}
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
