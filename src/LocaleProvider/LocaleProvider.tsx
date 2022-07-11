import React, {Children} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import {TLocale} from '../typings';
import RegisterGlobal from '../RegisterGlobal';
import {TLocaleDictionaries} from '../typings';
import {formatTranslationMessages} from '../utils';
import { LocaleContextProvider } from './context';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    locale: TLocale,
    setLocale: (locale: string) => void,
    defaultLocale: TLocale,
}



const LocaleProvider = ({
    localeDictionaries,
    locale,
    setLocale,
    defaultLocale,
    children
}: IProps) => {
    const message = formatTranslationMessages(locale, defaultLocale, localeDictionaries);

    return <LocaleContextProvider value={{locale, setLocale}}>
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
    </LocaleContextProvider>

};

export default React.memo(LocaleProvider, (a, b) => a.locale === b.locale && a.defaultLocale === b.defaultLocale);
