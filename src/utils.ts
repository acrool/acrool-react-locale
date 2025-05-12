import {II18nTexts, TLocale, TLocaleDictionaries, TLocaleDictionariesAsync,TMessage} from './types';


export type Empty = null | undefined | false | '' | 0;


/**
 * 判断是否为空
 * @param value
 * @param checkOption
 * @returns {boolean}
 */
export function isEmpty<T>(value: T, checkOption?: {
    isZero?: boolean,
    isFalse?: boolean,
}): value is Extract<T, Empty> {
    const defaultCheckOption = {
        isZero: checkOption?.isZero ?? true,
        isFalse: checkOption?.isFalse ?? true,
    };
    return (
        value === undefined
        || value === null
        || (defaultCheckOption.isFalse && (value === false || value === 'false'))
        || (defaultCheckOption.isZero && (value === 0 || value === '0'))
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
    );
}


/**
 *
 * @param locale 選擇語系
 * @param defaultLocale
 * @param localeDictionaries
 */
export const formatTranslationMessagesAsync = async (locale: TLocale, defaultLocale: TLocale, localeDictionaries: TLocaleDictionariesAsync): Promise<II18nTexts> => {

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

    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        return Object.assign(formattedMessages, {[key]: messages[key]});
    };

    return Object.keys(messages).reduce((formattedMessages, key) => {
        return flattenFormattedMessages(formattedMessages, key);
    }, {});
};
