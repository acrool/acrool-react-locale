import {TLocaleDictionaries} from 'bear-react-locale';
import {default as localeEnUS} from '../locales/en-US';
import {default as localeZhTW} from '../locales/zh-TW';
import {default as localeJaJP} from '../locales/ja-JP';

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

export const DEFAULT_LOCALE = ELocales.enUS;
