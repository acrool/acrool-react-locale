import {TLocales, II18nTexts, TLocaleDictionaries, TMessage} from './typings';


/**
 *
 * @param locale 選擇語系
 * @param defaultLocale
 * @param localeDictionaries
 */
export const formatTranslationMessages = (locale: TLocales, defaultLocale: TLocales, localeDictionaries: TLocaleDictionaries): II18nTexts => {

    // Get Default Setting
    const messages = localeDictionaries[locale];
    const defaultLocaleDictionary = locale !== defaultLocale ? formatTranslationMessages(defaultLocale, defaultLocale, localeDictionaries) : {};
    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        const formattedMessage = !messages[key] && locale !== defaultLocale ? defaultLocaleDictionary[key] : messages[key];
        return Object.assign(formattedMessages, {[key]: formattedMessage});
    };
    return Object.keys(messages).reduce((formattedMessages, key) => flattenFormattedMessages(formattedMessages, key), {});
};
