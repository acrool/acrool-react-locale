import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {ReactNode} from 'react';

export type TLocale = string


export interface II18nGroupTexts {
    [i18nGroup: string]: II18nTexts
}
export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleDictionariesAsync = {
    [localeCode in TLocale]: II18nGroupTexts | (() => Promise<{ default: II18nGroupTexts }>)
}
export type TLocaleDictionaries = {
    [localeCode in TLocale]: II18nGroupTexts
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>,
}

interface IArgs {
    [key: string]: string|number
}

export type TTranslateI18n<T extends Record<string, string>> = <
    K extends keyof T
>(
    id: K,
    options?: { def?: string, args?: IArgs }
) => string;


export type TRenderLoading = () => ReactNode;
export type TOnchangeLocale = (locale: string) => void;
