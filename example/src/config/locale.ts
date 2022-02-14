/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
import {ELocales, II18nTexts, TMessage, TLocaleSetting} from 'bear-locale';

export const localeConfig: Partial<TLocaleSetting> = {
    [ELocales.enUS]: require('locales/en-US').default,
    [ELocales.zhTW]: require('locales/zh-TW').default,
    [ELocales.jaJP]: require('locales/ja-JP').default,
    // [ELocales.zhCN]: require('locales/zh-CN').default,
    // [ELocales.thTH]: require('locales/th-TH').default,
    // [ELocales.viVN]: require('locales/vi-VN').default,
    // [ELocales.idID]: require('locales/id-ID').default,
};

export const DEFAULT_LOCALE = ELocales.enUS;
