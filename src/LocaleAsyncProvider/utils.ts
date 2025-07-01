import logger from '@acrool/js-logger';

import {TI18nTexts, TLocale, TLocaleDictionariesOrAsync} from '../types';



/**
 *
 * @param locale 選擇語系
 * @param defaultLocale
 * @param localeDictionaries
 */
export const formatTranslationMessagesAsync = async (locale: TLocale, defaultLocale: TLocale, localeDictionaries: TLocaleDictionariesOrAsync): Promise<TI18nTexts> => {

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

    const fetchMessage = typeof messages === 'function' ? (await messages()): messages;

    // Flatten messages
    const flat: TI18nTexts = {};
    Object.values(fetchMessage).forEach(group => {
        Object.entries(group).forEach(([k, v]) => {
            flat[k] = v;
        });
    });
    return flat;
};

