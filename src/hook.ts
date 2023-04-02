import {useCallback, useContext} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from './LocaleProvider/context';
import {TTranslateI18n} from './types';


export const useLocale = () => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();

    const i18n: TTranslateI18n = useCallback((id, options) => {
        return formatMessage({id, defaultMessage: options?.def}, options?.args);
    }, [locale]);

    return {
        i18n,
        locale,
        setLocale,
    };
};
