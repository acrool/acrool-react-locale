import {MessageFormatElement} from 'intl-messageformat-parser';
import {ReactNode} from 'react';

export type TLocale = string


export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleDictionaries = {
    [localeCode in TLocale]: II18nTexts | (() => Promise<{ default: II18nTexts }>)
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}

interface IArgs {
    [key: string]: string|number,
}

export type TTranslateI18n = (id: string, options?: {def?: string, args?: IArgs}) => string


export type TRenderLoading = () => ReactNode;
export type TOnchangeLocale = (locale: string) => void;
