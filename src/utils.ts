import {II18nTexts, TLocaleDictionaries, TMessage, TLocale} from './types';


/**
 *
 * @param locale 選擇語系
 * @param defaultLocale
 * @param localeDictionaries
 */
export const formatTranslationMessages = (locale: TLocale, defaultLocale: TLocale, localeDictionaries: TLocaleDictionaries): II18nTexts => {

    // Get Default Setting
    let messages = localeDictionaries[locale];
    if(typeof messages === 'undefined') {
        console.log(`[@acrool/react-locale] localeDictionaries not have key \`${locale}\` in locale!, use default \`${defaultLocale}\``);
        messages = localeDictionaries[defaultLocale];
        if (typeof messages === 'undefined') {
            console.warn(`[@acrool/react-locale] localeDictionaries not have key \`${defaultLocale}\` in locale!, please check`);
            return {};
        }
    }
    const defaultLocaleDictionary = locale !== defaultLocale ? formatTranslationMessages(defaultLocale, defaultLocale, localeDictionaries) : {};
    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        const formattedMessage = !messages[key] && locale !== defaultLocale ? defaultLocaleDictionary[key] : messages[key];
        return Object.assign(formattedMessages, {[key]: formattedMessage});
    };
    return Object.keys(messages).reduce((formattedMessages, key) => flattenFormattedMessages(formattedMessages, key), {});
};
