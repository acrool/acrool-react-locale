import React, {ReactNode, useEffect, useState} from 'react';
import LocaleProvider from './LocaleProvider';
import {TLocale, TLocaleDictionaries, TOnchangeLocale, TRenderLoading} from '../types';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    defaultLocale: TLocale
    persistKey?: string
    onChangeLocale?: TOnchangeLocale
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
const StateControlLocaleProvider = ({
    localeDictionaries,
    defaultLocale,
    persistKey = 'persist:acrool-example_locale',
    children,
    onChangeLocale,
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

    return <LocaleProvider
        locale={locale}
        onChangeLocale={setLocale}
        defaultLocale={defaultLocale}
        renderLoading={renderLoading}
        localeDictionaries={localeDictionaries}
    >
        {children}
    </LocaleProvider>;
};

export default StateControlLocaleProvider;
