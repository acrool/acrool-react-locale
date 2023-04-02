import React, {Children, useEffect, useState} from 'react';
import LocaleProvider from './LocaleProvider';
import {TLocale, TLocaleDictionaries} from '../types';




interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    defaultLocale: TLocale,
    persistKey: string,
}


const StateControlLocaleProvider = ({
    localeDictionaries,
    defaultLocale,
    persistKey= 'persist:bear-example_locale',
    children
}: IProps) => {
    const initLocale = (window.localStorage.getItem(persistKey) || defaultLocale) as TLocale;
    const [locale, setLocale] = useState<TLocale>(initLocale);

    useEffect(() => {
        // 同步語系到瀏覽器中
        window.localStorage.setItem(persistKey, locale);

    }, [locale]);

    return <LocaleProvider
        locale={locale}
        setLocale={setLocale}
        defaultLocale={defaultLocale}
        localeDictionaries={localeDictionaries}
    >
        {Children.only(children)}
    </LocaleProvider>;
};

export default React.memo(StateControlLocaleProvider, () => true);
