import {MessageFormatElement} from 'intl-messageformat-parser';

// export interface DefaulTLocale {}
export type TLocale = string


export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleDictionaries = {
    [localeCode in TLocale]: II18nTexts
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}

interface IPrams {
    [key: string]: string|number,
}

export type TTranslateI18n = (id: string, options?: {defaultMessage?: string, params?: IPrams}) => string

