import React, {ReactNode, useState} from 'react';

import {TLocale, TLocaleDictionaries} from '../types';
import OriginLocaleProvider from './OriginLocaleProvider';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    defaultLocale: TLocale
    ignoreMissingLocaleMessage?: boolean
    currentLocale: string
}

/**
 * 通常使用路徑上帶有語系，直接設定語系內容
 * For SSG/SSR Route (NextJS)
 * @param localeDictionaries
 * @param currentLocale
 * @param defaultLocale
 * @param ignoreMissingLocaleMessage
 * @param children
 */
const RouteLocaleProvider = ({
    localeDictionaries,
    currentLocale,
    defaultLocale,
    ignoreMissingLocaleMessage,
    children
}: IProps) => {
    const initLocale = (currentLocale || defaultLocale) as TLocale;
    const [locale, setLocale] = useState<TLocale>(initLocale);

    return <OriginLocaleProvider
        locale={locale}
        onChangeLocale={setLocale}
        defaultLocale={defaultLocale}
        localeDictionaries={localeDictionaries}
        ignoreMissingLocaleMessage={ignoreMissingLocaleMessage}
    >
        {children}
    </OriginLocaleProvider>;
};

export default RouteLocaleProvider;
