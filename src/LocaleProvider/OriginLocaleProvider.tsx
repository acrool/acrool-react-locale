import React, {Fragment, ReactNode} from 'react';
import {IntlProvider} from 'react-intl';

import RegisterGlobal from '../RegisterGlobal';
import {
    TLocale,
    TLocaleDictionaries,
    TOnchangeLocale,
    TRenderLoading
} from '../types';
import {LocaleContextProvider} from './context';
import TranslationWrapper from './TranslationWrapper';
import useMessages from './useMessages';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    isReMountWithChangeLocale?: boolean
    locale: TLocale
    onChangeLocale: TOnchangeLocale
    defaultLocale: TLocale
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
const OriginLocaleProvider = ({
    localeDictionaries,
    isReMountWithChangeLocale = false,
    locale,
    onChangeLocale,
    defaultLocale,
    children
}: IProps) => {
    const {messages, setMessages} = useMessages({locale, defaultLocale, localeDictionaries});

    /**
     * 當語系異動時
     * @param newLocale
     */
    const onHandleChangeLocale = (newLocale: string) => {
        setMessages(newLocale);
        onChangeLocale(newLocale);
    };

    return <LocaleContextProvider value={{locale, setLocale: onHandleChangeLocale}}>
        <IntlProvider
            key={isReMountWithChangeLocale ? locale: undefined} // Using Key will cause the language to be changed and remounted.
            locale={locale}
            defaultLocale={defaultLocale}
            messages={messages}
            textComponent={TranslationWrapper as React.ComponentType}
        >
            <Fragment>
                <RegisterGlobal/>
                {children}
            </Fragment>
        </IntlProvider>
    </LocaleContextProvider>;
};

export default OriginLocaleProvider;
