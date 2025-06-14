import {useCallback, useContext} from 'react';
import {useIntl} from 'react-intl';

import {LocaleContext} from './LocaleProvider/context';
import {TTranslationKey} from './types';


/**
 * 翻譯 Hook
 */
export const useLocale = <T extends Record<string, Record<string, string>>>() => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();


    /**
     * 包含default方法
     */
    const t = useCallback((
        id: TTranslationKey<T>,
        options?: { def?: string, args?: Record<string, any> }
    ) => {
        return formatMessage({id: id as string, defaultMessage: options?.def}, options?.args);
    }, [locale]);

    return {
        t,
        locale,
        setLocale,
    };
};
