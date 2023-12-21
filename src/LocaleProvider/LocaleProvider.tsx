import React, {Children, Fragment} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import RegisterGlobal from '../RegisterGlobal';
import {formatTranslationMessages} from '../utils';
import {LocaleContextProvider} from './context';
import {TLocale, TLocaleDictionaries} from '../types';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    key?: string,
    locale: TLocale,
    setLocale: (locale: string) => void,
    defaultLocale: TLocale,
}



const LocaleProvider = ({
    key,
    localeDictionaries,
    locale,
    setLocale,
    defaultLocale,
    children
}: IProps) => {
    const message = formatTranslationMessages(locale, defaultLocale, localeDictionaries);

    return <LocaleContextProvider value={{locale, setLocale}}>
        <IntlProvider
            key={key} // Using Key will cause the language to be changed and remounted.
            locale={locale}
            defaultLocale={defaultLocale}
            messages={message}
            // @ts-ignore
            textComponent={TranslationWrapper}
        >
            <Fragment>
                <RegisterGlobal/>
                {Children.only(children)}
            </Fragment>
        </IntlProvider>
    </LocaleContextProvider>;

};

export default React.memo(LocaleProvider, (a, b) => a.locale === b.locale && a.defaultLocale === b.defaultLocale);
