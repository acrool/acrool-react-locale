import {II18nTexts, TLocaleDictionaries, TMessage, TLocale} from './types';


/**
 *
 * @param locale 選擇語系
 * @param defaultLocale
 * @param localeDictionaries
 */
export const formatTranslationMessages = async (locale: TLocale, defaultLocale: TLocale, localeDictionaries: TLocaleDictionaries): Promise<II18nTexts> => {

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
    
    const fetchMessage = typeof messages === 'function' ? (await messages()).default: messages;
    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        return Object.assign(formattedMessages, {[key]: fetchMessage[key]});
    };
    
    return Object.keys(fetchMessage).reduce((formattedMessages, key) => {
        return flattenFormattedMessages(formattedMessages, key);
    }, {});
};
