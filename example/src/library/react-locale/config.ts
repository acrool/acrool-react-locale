import {TLocaleDictionariesAsync} from '@acrool/react-locale';


export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
    // thTH = 'th-TH',
}

export const localeDictionaries: TLocaleDictionariesAsync = {
    [ELocales.enUS]: () => import('@/locales/en-US'),
    [ELocales.zhTW]: () => import('@/locales/zh-TW'),
    [ELocales.jaJP]: () => import('@/locales/ja-JP'),
    // [ELocales.thTH]: localeThTH,
};

export const DEFAULT_LOCALE = ELocales.enUS;


