import logger from '@acrool/js-logger';

import {formatMessage} from '../formatMessage';
import {TI18nGroupTexts, TI18nTexts, TLocale, TLocaleDictionaries, TTranslationKey} from '../types';

/**
 * 扁平化 Group to Texts
 * @param locale 選擇語系
 * @param defaultLocale
 * @param localeDictionaries
 */
export const formatTranslationMessages = (locale: TLocale, defaultLocale: TLocale, localeDictionaries: TLocaleDictionaries): TI18nTexts => {

    // Get Default Setting
    let messages = localeDictionaries[locale];
    if(typeof messages === 'undefined') {
        logger.warning('@acrool/react-locale', `localeDictionaries not have key \`${locale}\` in locale!, use default \`${defaultLocale}\``);
        messages = localeDictionaries[defaultLocale];
        if (typeof messages === 'undefined') {
            logger.warning('@acrool/react-locale', `localeDictionaries not have key \`${defaultLocale}\` in locale!, please check`);
            return {};
        }
    }

    // 扁平化
    const flat: TI18nTexts = {};
    Object.values(messages).forEach(group => {
        Object.entries(group).forEach(([k, v]) => {
            flat[k] = v;
        });
    });
    return flat;
};


interface IGetLocale<T extends Record<string, Record<string, string>>> {
    t: (id: TTranslationKey<T>, options?: {
        def?: string,
        args?: Record<string, any>,
    }) => string
}

/**
 * 直翻多語系
 * @param locale
 * @param localeDictionary
 */
export const getLocale = <T extends Record<string, Record<string, string>>>(locale: TLocale, localeDictionary: TI18nGroupTexts): IGetLocale<T> => {
    const localeDictionaries: TLocaleDictionaries = {[locale]: localeDictionary};
    const messages = formatTranslationMessages(locale, locale, localeDictionaries);
    const onError = (error: {message: string}) => logger.danger('@acrool/react-locale', error.message);
    return {
        t: (
            id: TTranslationKey<T>,
            options?: { def?: string, args?: Record<string, any> }
        ) => {
            return formatMessage({locale, defaultLocale: locale, messages, onError}, id as string, options);
        }
    };
};
