import React, {Children} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import {TLocales} from '../typings';
import RegisterGlobal from '../RegisterGlobal';
import {TLocaleDictionaries} from '../typings';
import {formatTranslationMessages} from '../utils';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: JSX.Element
    locale: TLocales,
    defaultLocale: TLocales,
}



const LanguageProvider = ({
    localeDictionaries,
    locale,
    defaultLocale,
    children
}: IProps) => {
    const message = formatTranslationMessages(locale, defaultLocale, localeDictionaries);

    return <IntlProvider
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

};

export default LanguageProvider;
