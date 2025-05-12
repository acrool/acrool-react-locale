import React, {Children, useState} from 'react';

import {TLocale, TLocaleDictionaries} from '../types';
import OriginLocaleProvider from './OriginLocaleProvider';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    defaultLocale: TLocale
    currentLocale: string
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

    return <OriginLocaleProvider
        locale={locale}
        onChangeLocale={setLocale}
        defaultLocale={defaultLocale}
        localeDictionaries={localeDictionaries}
    >
        {children}
    </OriginLocaleProvider>;
};

export default RouteLocaleProvider;
