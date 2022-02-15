import {useIntl} from 'react-intl';
import {useCallback, useContext} from 'react';
import {LocaleContext} from './LocaleProvider/context';
import {TI18n} from 'typings';


export const useLocale = () => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();

    const i18n: TI18n = useCallback((id, options) => {
        return formatMessage({id, defaultMessage: options?.defaultMessage}, options?.params);
    }, [locale]);

    return {
        i18n,
        locale,
        setLocale,
    };
};
