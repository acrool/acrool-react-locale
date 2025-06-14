import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import {ReactNode} from 'react';

export type TLocale = string
export type TGroupKey = string

export type TI18nTexts = Record<string, string>;

export type TI18nGroupTexts = {
    [groupKey: TGroupKey]: TI18nTexts,
}

export type TTranslationKey<T extends Record<TGroupKey, Record<string, string>>> = {
    [K in keyof T]: keyof T[K];
}[keyof T];


export type TLocaleDictionariesAsync = {
    [localeCode in TLocale]: TI18nGroupTexts | (() => Promise<{ default: TI18nGroupTexts }>)
}
export type TLocaleDictionaries = {
    [localeCode in TLocale]: TI18nGroupTexts
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>,
}


export type TRenderLoading = () => ReactNode;
export type TOnchangeLocale = (locale: string) => void;


