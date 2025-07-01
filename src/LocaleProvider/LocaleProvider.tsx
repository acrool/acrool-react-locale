import React, {ReactNode, useEffect, useState} from 'react';

import {TLocale, TLocaleDictionaries, TOnChangeLocale, TRenderLoading} from '../types';
import OriginLocaleProvider from './OriginLocaleProvider';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    defaultLocale: TLocale
    persistKey?: string
    onChangeLocale?: TOnChangeLocale
    ignoreMissingLocaleMessage?: boolean
    renderLoading?: TRenderLoading
}


/**
 * State Control Locale Provider
 * @param localeDictionaries
 * @param defaultLocale
 * @param persistKey
 * @param children
 * @param onChangeLocale 當語系異動時
 * @param renderLoading
 */
const LocaleProvider = ({
    localeDictionaries,
    defaultLocale,
    persistKey = 'persist:acrool-locale',
    children,
    ignoreMissingLocaleMessage,
    onChangeLocale,
}: IProps) => {
    const initLocale = (window.localStorage.getItem(persistKey) || defaultLocale) as TLocale;
    const [locale, setLocale] = useState<TLocale>(initLocale);

    useEffect(() => {
        // 同步語系到瀏覽器中
        window.localStorage.setItem(persistKey, locale);

        if(onChangeLocale){
            onChangeLocale(locale);
        }
    }, [locale]);

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

export default LocaleProvider;
