import {ELocales, II18nTexts, TFormatTranslationMessages, TLocaleSetting, TMessage} from './typings';


/**
 *
 * @param locale 選擇語系
 * @param messages 處理字典檔案轉換的 JSON Data
 * @param defaultLocale
 * @param localeConfig
 */
export const formatTranslationMessages = (locale: ELocales, messages: II18nTexts, defaultLocale: ELocales, localeConfig: TLocaleSetting): II18nTexts => {
    // @ts-ignore
    const defaultFormattedMessages = locale !== defaultLocale ? formatTranslationMessages(defaultLocale, localeConfig[defaultLocale], defaultLocale, localeConfig) : {};
    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        const formattedMessage = !messages[key] ? defaultFormattedMessages[key] : messages[key];
        return Object.assign(formattedMessages, {[key]: formattedMessage});
    };
    return Object.keys(messages).reduce((formattedMessages, key) => flattenFormattedMessages(formattedMessages, key), {});
};
