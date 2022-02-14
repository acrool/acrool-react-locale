import {MessageFormatElement} from 'intl-messageformat-parser';


export enum ELocales {
    enUS = 'en-US',
    zhTW= 'zh-TW',
    zhCN = 'zh-CN',
    zhSG = 'zh-SG',
    jaJP= 'ja-JP',
    thTH = 'th-TH',
    idID = 'id-ID',
    viVN = 'vi-VN',
}


export interface II18nTexts {
    [i18nKey: string]: string
}

export type TLocaleSetting = {
    [localeCode in ELocales]?: II18nTexts
}


export type TMessage = {
    [code: string]: Record<string, string> | Record<string, MessageFormatElement[]>;
}


export type TFormatTranslationMessages<Texts = any, Config = any> = (locale: string, messages: Texts, localeConfig: Config) => II18nTexts;


declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        i18n: any,
    }
}
