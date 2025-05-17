import logger from '@acrool/js-logger';
import React, {Fragment, ReactNode} from 'react';
import {IntlProvider} from 'react-intl';

import {
    TLocale,
    TLocaleDictionaries,
    TOnchangeLocale,
} from '../types';
import {LocaleContextProvider} from './context';
import TranslationWrapper from './TranslationWrapper';
import useMessages from './useMessages';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    isReMountWithChangeLocale?: boolean
    ignoreMissingLocaleMessage?: boolean
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
    ignoreMissingLocaleMessage = false,
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

    /**
     * 處理警告訊息
     * @param message
     */
    const handleOnWarning = (message: string) => {
        logger.danger('@acrool/react-locale', message.replace('@formatjs/intl',''));
    };

    /**
     * 處理錯誤訊息
     * @param err
     */
    const handleOnError = (err: Error) => {
        if(ignoreMissingLocaleMessage && err.message.includes('MISSING_TRANSLATION')){
            return;
        }
        logger.danger('@acrool/react-locale', err.message.replace('@formatjs/intl Error ',''));
    };

    return <LocaleContextProvider value={{locale, setLocale: onHandleChangeLocale}}>
        <IntlProvider
            key={isReMountWithChangeLocale ? locale: undefined} // Using Key will cause the language to be changed and remounted.
            locale={locale}
            defaultLocale={defaultLocale}
            messages={messages}
            onWarn={handleOnWarning}
            onError={handleOnError}
            textComponent={TranslationWrapper as React.ComponentType}
        >
            <Fragment>
                {children}
            </Fragment>
        </IntlProvider>
    </LocaleContextProvider>;
};

export default OriginLocaleProvider;
