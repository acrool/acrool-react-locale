import {useCallback, useContext} from 'react';

import {LocaleContext} from './context';
import {TTranslationKey} from './types';


/**
 * 翻譯 Hook
 */
export const useLocale = <T extends Record<string, Record<string, string>>>() => {
    const {locale, setLocale, formatMessage} = useContext(LocaleContext);


    /**
     * 包含default方法
     */
    const t = useCallback((
        id: TTranslationKey<T>,
        options?: { def?: string, args?: Record<string, any> }
    ) => {
        return formatMessage(id as string, options);
    }, [formatMessage]);

    return {
        t,
        locale,
        setLocale,
    };
};
