import logger from '@acrool/js-logger';
import {useCallback} from 'react';

import {formatMessage, IFormatError, IFormatMessageOptions} from './formatMessage';
import {TI18nTexts, TLocale} from './types';

interface IArgs {
    locale: TLocale
    defaultLocale: TLocale
    messages: TI18nTexts
    ignoreMissingLocaleMessage: boolean
}

/**
 * 給 Provider 用的翻譯函式：依目前語系的翻譯格式化，錯誤以 logger 輸出
 * @param locale
 * @param defaultLocale
 * @param messages
 * @param ignoreMissingLocaleMessage 不輸出找不到翻譯的錯誤
 */
const useFormatMessage = ({locale, defaultLocale, messages, ignoreMissingLocaleMessage}: IArgs) => {
    return useCallback((id: string, options?: IFormatMessageOptions) => {
        const onError = (error: IFormatError) => {
            if (ignoreMissingLocaleMessage && error.code === 'MISSING_TRANSLATION') {
                return;
            }
            logger.danger('@acrool/react-locale', error.message);
        };
        return formatMessage({locale, defaultLocale, messages, onError}, id, options);
    }, [locale, defaultLocale, messages, ignoreMissingLocaleMessage]);
};

export default useFormatMessage;
