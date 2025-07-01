import {LocaleProvider, TLocaleDictionaries} from '@acrool/react-locale';
import {ReactNode} from 'react';

import localeZhTW from '@/locales/zh-TW';

import {ELocales} from './config';

export const localeDictionaries: TLocaleDictionaries = {
    [ELocales.zhTW]: localeZhTW,
};

interface IProps {
  children: ReactNode
}


/**
 * Mock 多語系提供者
 * @param children
 * @constructor
 */
const MockI18nProvider = ({children}: IProps) => {
    return (
        <LocaleProvider
            localeDictionaries={localeDictionaries}
            defaultLocale={ELocales.zhTW}
            ignoreMissingLocaleMessage
        >
            {children}
        </LocaleProvider>
    );
};

export default MockI18nProvider;
