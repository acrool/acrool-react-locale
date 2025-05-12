import React, {Fragment, ReactNode} from 'react';
import {IntlProvider} from 'react-intl';

import RegisterGlobal from '../RegisterGlobal';
import {
    TLocale,
    TLocaleDictionariesAsync,
    TOnchangeLocale,
    TRenderLoading
} from '../types';
import {isEmpty} from '../utils';
import {LocaleContextProvider} from './context';
import TranslationWrapper from './TranslationWrapper';
import useMessagesAsync from './useMessagesAsync';


interface IProps{
    localeDictionaries: TLocaleDictionariesAsync
    children: ReactNode
    isReMountWithChangeLocale?: boolean
    locale: TLocale
    onChangeLocale: TOnchangeLocale
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
const OriginLocaleProvider = ({
    localeDictionaries,
    isReMountWithChangeLocale = false,
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
                {renderChildren()}
            </Fragment>
        </IntlProvider>
    </LocaleContextProvider>;
};

export default OriginLocaleProvider;
