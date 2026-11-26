import React, {Fragment, ReactNode} from 'react';

import {LocaleContextProvider} from '../context';
import {
    TLocale,
    TLocaleDictionaries,
    TOnChangeLocale,
} from '../types';
import useFormatMessage from '../useFormatMessage';
import useMessages from './useMessages';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    isReMountWithChangeLocale?: boolean
    ignoreMissingLocaleMessage?: boolean
    locale: TLocale
    onChangeLocale: TOnChangeLocale
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

    const translate = useFormatMessage({locale, defaultLocale, messages, ignoreMissingLocaleMessage});

    return <LocaleContextProvider value={{locale, setLocale: onHandleChangeLocale, formatMessage: translate}}>
        {/* 有 key 時切換語系會重新掛載 children */}
        <Fragment key={isReMountWithChangeLocale ? locale : undefined}>
            {children}
        </Fragment>
    </LocaleContextProvider>;
};

export default OriginLocaleProvider;
