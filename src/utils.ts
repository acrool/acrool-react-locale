import {ELocales, II18nTexts, TFormatTranslationMessages, TMessage} from './typings';

const DEFAULT_LOCALE = ELocales.enUS;

export const formatTranslationMessages: TFormatTranslationMessages = (locale, messages, localeConfig) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, localeConfig[DEFAULT_LOCALE], localeConfig) : {};
    const flattenFormattedMessages = (formattedMessages: TMessage, key: string): TMessage => {
        const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
        return Object.assign(formattedMessages, {[key]: formattedMessage});
    };
    return Object.keys(messages).reduce((formattedMessages, key) => flattenFormattedMessages(formattedMessages, key), {});
};
