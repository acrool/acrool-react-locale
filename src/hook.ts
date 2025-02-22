import {useCallback, useContext} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from './LocaleProvider/context';
import {II18nTexts, TTranslateI18n} from './types';


export const useLocale = <T extends II18nTexts>() => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();

    const i18n = useCallback(<K extends keyof T>(
        id: K,
        options?: { def?: string; args?: Record<string, any> }
    ) => {
        return formatMessage({id: id as string, defaultMessage: options?.def}, options?.args);
    }, [locale]);


    return {
        i18n,
        locale,
        setLocale,
    };
};
