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

interface IPrams {
    [key: string]: string|number,
}

export type TTranslateI18n = (id: string, options?: {defaultMessage?: string|number, params?: IPrams}) => string

declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        translateI18n: TTranslateI18n,
    }
}
