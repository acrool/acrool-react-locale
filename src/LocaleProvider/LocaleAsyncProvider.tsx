import React, {ReactNode, useEffect, useState} from 'react';

import {TLocale, TLocaleDictionariesAsync, TOnchangeLocale, TRenderLoading} from '../types';
import OriginLocaleAsyncProvider from './OriginLocaleAsyncProvider';


interface IProps{
    localeDictionaries: TLocaleDictionariesAsync
    children: ReactNode
    defaultLocale: TLocale
    persistKey?: string
    onChangeLocale?: TOnchangeLocale
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
const LocaleAsyncProvider = ({
    localeDictionaries,
    defaultLocale,
    persistKey = 'persist:acrool-locale',
    children,
    onChangeLocale,
    ignoreMissingLocaleMessage,
    renderLoading,
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

    return <OriginLocaleAsyncProvider
        locale={locale}
        onChangeLocale={setLocale}
        defaultLocale={defaultLocale}
        renderLoading={renderLoading}
        ignoreMissingLocaleMessage={ignoreMissingLocaleMessage}
        localeDictionaries={localeDictionaries}
    >
        {children}
    </OriginLocaleAsyncProvider>;
};

export default LocaleAsyncProvider;
