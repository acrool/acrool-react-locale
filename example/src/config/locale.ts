import {TLocaleDictionaries} from '@acrool/react-locale';
// import {default as localeEnUS} from '../locales/en-US';
// import {default as localeZhTW} from '../locales/zh-TW';
// import {default as localeJaJP} from '../locales/ja-JP';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

// export const localeDictionaries: TLocaleDictionaries = {
//     [ELocales.enUS]: localeEnUS,
//     [ELocales.zhTW]: localeZhTW,
//     [ELocales.jaJP]: localeJaJP,
// };


export const localeDictionaries: TLocaleDictionaries = {
    [ELocales.enUS]: () => import('../locales/en-US'),
    [ELocales.zhTW]: () => import('../locales/zh-TW'),
    [ELocales.jaJP]: () => import('../locales/ja-JP'),
};

export const DEFAULT_LOCALE = ELocales.enUS;
