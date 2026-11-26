import React, {Fragment, ReactNode} from 'react';

import {LocaleContextProvider} from '../context';
import {
    TLocale,
    TLocaleDictionariesAsync,
    TOnChangeLocale,
    TRenderLoading
} from '../types';
import useFormatMessage from '../useFormatMessage';
import {isEmpty} from '../utils';
import useMessagesAsync from './useMessagesAsync';

/** 翻譯還沒載入時用的空物件（固定同一個，避免每次 render 產生新的翻譯函式） */
const NO_MESSAGES = {};


interface IProps{
    localeDictionaries: TLocaleDictionariesAsync
    children: ReactNode
    isReMountWithChangeLocale?: boolean
    ignoreMissingLocaleMessage?: boolean
    locale: TLocale
    onChangeLocale: TOnChangeLocale
    defaultLocale: TLocale
    renderLoading?: TRenderLoading
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
const OriginLocaleAsyncProvider = ({
    localeDictionaries,
    isReMountWithChangeLocale = false,
    ignoreMissingLocaleMessage = false,
    locale,
    onChangeLocale,
    defaultLocale,
    renderLoading,
    children
}: IProps) => {
    const {messages, setMessages} = useMessagesAsync({locale, defaultLocale, localeDictionaries});

    /**
     * 當語系異動時
     * @param newLocale
     */
    const onHandleChangeLocale = (newLocale: string) => {
        setMessages(newLocale)
            .then(() => {
                onChangeLocale(newLocale);
            });
    };

    /**
     * 渲染內容
     */
    const renderChildren = () => {
        if(isEmpty(messages)){
            return renderLoading ? renderLoading(): <div>loading...</div>;
        }

        return children;
    };

    const translate = useFormatMessage({locale, defaultLocale, messages: messages ?? NO_MESSAGES, ignoreMissingLocaleMessage});

    return <LocaleContextProvider value={{locale, setLocale: onHandleChangeLocale, formatMessage: translate}}>
        {/* 有 key 時切換語系會重新掛載 children */}
        <Fragment key={isReMountWithChangeLocale ? locale : undefined}>
            {renderChildren()}
        </Fragment>
    </LocaleContextProvider>;
};

export default OriginLocaleAsyncProvider;
