import {MessageFormatElement} from 'intl-messageformat-parser';

export type TLocale = string


export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleDictionaries = {
    [localeCode in TLocale]: II18nTexts | (() => Promise<unknown>)
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}

interface IArgs {
    [key: string]: string|number,
}

export type TTranslateI18n = (id: string, options?: {def?: string, args?: IArgs}) => string

