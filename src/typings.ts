import {MessageFormatElement} from 'intl-messageformat-parser';

// export interface DefaultLocales {}
export type TLocales = string


export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleDictionaries = {
    [localeCode in TLocales]: II18nTexts
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}


export type TI18n = (id: string, options?: {defaultMessage?: string, params?: any}) => string

declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        i18n: any,
    }
}
