import React, {Children, useEffect, useState} from 'react';
import {TLocales} from '../typings';
import {LocaleContextProvider} from './context';
import {TLocaleDictionaries} from '../typings';
import LocaleProvider from './LocaleProvider';




interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    defaultLocale: TLocales,
    persistKey: string,
}


const LocaleControlProvider = ({
    localeDictionaries,
    defaultLocale,
    persistKey= 'persist:bear-example_locale',
    children
}: IProps) => {
    const initLocale = (window.localStorage.getItem(persistKey) || defaultLocale) as TLocales;
    const [locale, setLocale] = useState<TLocales>(initLocale);

    useEffect(() => {
        // 同步語系到瀏覽器中
        window.localStorage.setItem(persistKey, locale);

    }, [locale]);

    return <LocaleContextProvider value={{locale, setLocale}}>
        <LocaleProvider
            locale={locale}
            defaultLocale={defaultLocale}
            localeDictionaries={localeDictionaries}
        >
            {Children.only(children)}
        </LocaleProvider>
    </LocaleContextProvider>;
};

export default LocaleControlProvider;
