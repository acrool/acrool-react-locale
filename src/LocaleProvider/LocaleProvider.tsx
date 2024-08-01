import React, {Children, Fragment, ReactNode, useEffect, useState} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import RegisterGlobal from '../RegisterGlobal';
import {formatTranslationMessages} from '../utils';
import {LocaleContextProvider} from './context';
import {II18nTexts, TLocale, TLocaleDictionaries} from '../types';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    isReMountWithChangeLocale?: boolean,
    locale: TLocale,
    setLocale: (locale: string) => void,
    defaultLocale: TLocale,
}


/**
 * Locale Provider
 * @param localeDictionaries
 * @param isReMountWithChangeLocale
 * @param locale
 * @param setLocale
 * @param defaultLocale
 * @param children
 */
const LocaleProvider = ({
    localeDictionaries,
    isReMountWithChangeLocale = false,
    locale,
    setLocale,
    defaultLocale,
    children
}: IProps) => {

    const [message, setMessage] = useState<II18nTexts|undefined>(undefined);

    useEffect(() => {
        formatTranslationMessages(locale, defaultLocale, localeDictionaries)
            .then(newMessage => {
                console.log('newMessage', newMessage);
                setMessage(newMessage);
            });

    }, [locale, defaultLocale]);
    
    
    const renderChildren = () => {
        if(!message){
            return <div>loading...</div>;
        }
        
        return children;
    };

    return <LocaleContextProvider value={{locale, setLocale}}>
        <IntlProvider
            key={isReMountWithChangeLocale ? locale: undefined} // Using Key will cause the language to be changed and remounted.
            locale={locale}
            defaultLocale={defaultLocale}
            messages={message}
            textComponent={TranslationWrapper as React.ComponentType}
        >
            <Fragment>
                <RegisterGlobal/>
                {renderChildren()}
            </Fragment>
        </IntlProvider>
    </LocaleContextProvider>;
};

export default LocaleProvider;
