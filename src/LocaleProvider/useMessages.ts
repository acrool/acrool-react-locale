import {useEffect, useState} from 'react';

import {formatTranslationMessages} from '../server';
import {TI18nTexts, TLocale, TLocaleDictionaries} from '../types';

interface IProps {
    locale: TLocale
    defaultLocale: TLocale
    localeDictionaries: TLocaleDictionaries
}


/**
 * 多語系翻譯
 * @param locale
 * @param defaultLocale
 * @param localeDictionaries
 */
const useMessages = ({
    locale,
    defaultLocale,
    localeDictionaries,
}: IProps) => {
    const [messages, setMessages] = useState<TI18nTexts>(
        formatTranslationMessages(locale, defaultLocale, localeDictionaries),
    );

    useEffect(() => {
        const newMessage = formatTranslationMessages(locale, defaultLocale, localeDictionaries);
        setMessages(newMessage);
    }, []);

    /**
     * 當語系異動時
     * @param newLocale
     */
    const onHandleFormatTranslationMessages = (newLocale: string) => {
        const newMessage = formatTranslationMessages(newLocale, defaultLocale, localeDictionaries);
        setMessages(newMessage);
    };
    
    return {
        messages,
        setMessages: onHandleFormatTranslationMessages,
    };
};

export default useMessages;





