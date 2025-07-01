import {useEffect, useState} from 'react';

import {TI18nTexts, TLocale, TLocaleDictionariesAsync} from '../types';
import {formatTranslationMessagesAsync} from './utils';

interface IProps {
    locale: TLocale
    defaultLocale: TLocale
    localeDictionaries: TLocaleDictionariesAsync
}

/**
 * 非同步多語系翻譯
 * @param locale
 * @param defaultLocale
 * @param localeDictionaries
 */
const useMessagesAsync = ({
    locale,
    defaultLocale,
    localeDictionaries,
}: IProps) => {
    const [messages, setMessages] = useState<TI18nTexts|undefined>();

    useEffect(() => {
        formatTranslationMessagesAsync(locale, defaultLocale, localeDictionaries)
            .then(newMessage => {
                setMessages(newMessage);
            });
    }, []);

    /**
     * 當語系異動時
     * @param newLocale
     */
    const onHandleFormatTranslationMessages = (newLocale: string) => {
        return new Promise(resolve => {
            formatTranslationMessagesAsync(newLocale, defaultLocale, localeDictionaries)
                .then(newMessage => {
                    requestAnimationFrame(() => {
                        setMessages(newMessage);
                        resolve('');
                    });
                });
        });

    };


    return {
        messages,
        setMessages: onHandleFormatTranslationMessages,
    };
};

export default useMessagesAsync;





