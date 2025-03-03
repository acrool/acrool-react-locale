import {useCallback, useContext} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from './LocaleProvider/context';
import {II18nTexts} from './types';


/**
 * 翻譯 Hook
 */
export const useLocale = <T extends II18nTexts>() => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();


    /**
     * 包含default方法
     */
    const t = useCallback(<K extends keyof T>(
        id: K,
        options?: { def?: string; args?: Record<string, any> }
    ) => {
        return formatMessage({id: id as string, defaultMessage: options?.def}, options?.args);
    }, [locale]);

    return {
        t,
        i18n: t,
        locale,
        setLocale,
    };
};
