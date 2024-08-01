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
 * 通常使用路徑上帶有語系，直接設定語系內容
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
        onChangeLocale={setLocale}
        defaultLocale={defaultLocale}
        localeDictionaries={localeDictionaries}
    >
        {children}
    </LocaleProvider>;
};

export default RouteLocaleProvider;
