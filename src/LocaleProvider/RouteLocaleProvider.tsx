import React, {Children, useState} from 'react';
import LocaleProvider from './LocaleProvider';
import {TLocale, TLocaleDictionaries} from '../types';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    defaultLocale: TLocale,
    currentLocale: string,
}

/**
 * For SSG Route
 * @param localeDictionaries
 * @param currentLocale
 * @param defaultLocale
 * @param children
 */
const RouteLocaleProvider = ({
    localeDictionaries,
    currentLocale,
    defaultLocale,
    children
}: IProps) => {
    const initLocale = (currentLocale || defaultLocale) as TLocale;
    const [locale, setLocale] = useState<TLocale>(initLocale);

    return <LocaleProvider
        locale={locale}
        setLocale={setLocale}
        defaultLocale={defaultLocale}
        localeDictionaries={localeDictionaries}
    >
        {Children.only(children)}
    </LocaleProvider>;
};

export default RouteLocaleProvider;
