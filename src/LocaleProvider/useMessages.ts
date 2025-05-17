import {useEffect, useState} from 'react';

import {II18nTexts, TLocale, TLocaleDictionaries} from '../types';
import {formatTranslationMessages} from '../utils';

interface IProps {
    locale: TLocale
    defaultLocale: TLocale
    localeDictionaries: TLocaleDictionaries
}

const useMessages = ({
    locale,
    defaultLocale,
    localeDictionaries,
}: IProps) => {
    const [messages, setMessages] = useState<II18nTexts>(
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





