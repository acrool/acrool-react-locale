import {TLocaleDictionaries} from 'bear-locale';



export enum ELocales {
    enUS = 'en-US',
    zhTW= 'zh-TW',
    jaJP = 'ja-JP',
}

export const localeConfig: TLocaleDictionaries = {
    [ELocales.enUS]: require('locales/en-US').default,
    [ELocales.zhTW]: require('locales/zh-TW').default,
    [ELocales.jaJP]: require('locales/ja-JP').default,

};

export const DEFAULT_LOCALE = ELocales.enUS;
