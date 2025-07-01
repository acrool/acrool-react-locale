import {TLocaleDictionaries, TLocaleDictionariesOrAsync} from '@acrool/react-locale';

import {default as localeEnUS} from '../locales/en-US';
import {default as localeJaJP} from '../locales/ja-JP';
import {default as localeZhTW} from '../locales/zh-TW';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

export const localeDictionaries: TLocaleDictionaries = {
    [ELocales.enUS]: localeEnUS,
    [ELocales.zhTW]: localeZhTW,
    [ELocales.jaJP]: localeJaJP,
};


export const localeDictionariesAsync: TLocaleDictionariesOrAsync = {
    [ELocales.enUS]: () => import('../locales/en-US').then((module) => module.default),
    [ELocales.zhTW]: () => import('../locales/zh-TW').then((module) => module.default),
    [ELocales.jaJP]: () => import('../locales/ja-JP').then((module) => module.default),
};

export const DEFAULT_LOCALE = ELocales.enUS;
