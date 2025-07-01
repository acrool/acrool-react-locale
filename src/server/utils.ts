import logger from '@acrool/js-logger';
import {createIntl, createIntlCache} from '@formatjs/intl';

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





const cache = createIntlCache();

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
    const intlShape = createIntl({locale, messages}, cache);
    return {
        t: (
            id: TTranslationKey<T>,
            options?: { def?: string, args?: Record<string, any> }
        ) => {
            return intlShape.formatMessage({id: id as string, defaultMessage: options?.def}, options?.args) as string;
        }
    };
};
