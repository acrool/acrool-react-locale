import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import {IntlProvider} from 'react-intl';
import TranslationWrapper from './TranslationWrapper';
import RegisterGlobal from '../RegisterGlobal';
import {formatTranslationMessages} from '../utils';
import {LocaleContextProvider} from './context';
import {II18nTexts, TLocale, TLocaleDictionaries, TOnchangeLocale, TRenderLoading} from '../types';


interface IProps{
    localeDictionaries: TLocaleDictionaries
    children: ReactNode
    isReMountWithChangeLocale?: boolean,
    locale: TLocale,
    onChangeLocale: TOnchangeLocale,
    defaultLocale: TLocale,
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
    const [message, setMessage] = useState<II18nTexts|undefined>(undefined);

    useEffect(() => {
        formatTranslationMessages(locale, defaultLocale, localeDictionaries)
            .then(newMessage => {
                setMessage(newMessage);
            });
    }, []);

    /**
     * 當語系異動時
     * @param newLocale
     */
    const onHandleChangeLocale = (newLocale: string) => {
        formatTranslationMessages(newLocale, defaultLocale, localeDictionaries)
            .then(newMessage => {
                requestAnimationFrame(() => {
                    setMessage(newMessage);
                    onChangeLocale(newLocale);
                });
            });
    };
    
    const renderChildren = () => {
        if(!message){
            if(renderLoading){
                return renderLoading();
            }
            return <div>loading...</div>;
        }
        
        return children;
    };

    return <LocaleContextProvider value={{locale, setLocale: onHandleChangeLocale}}>
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

export default OriginLocaleProvider;
