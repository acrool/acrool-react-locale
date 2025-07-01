import logger from '@acrool/js-logger';
import {createIntl, createIntlCache} from 'react-intl';

import {
    TI18nGroupTexts,
    TI18nTexts,
    TLocale,
    TLocaleDictionaries,
    TLocaleDictionariesOrAsync
} from './types';


export type Empty = null | undefined | false | '' | 0;


/**
 * 判断是否为空
 * @param value
 * @param checkOption
 * @returns {boolean}
 */
export function isEmpty<T>(value: T, checkOption?: {
    isZero?: boolean,
    isFalse?: boolean,
}): value is Extract<T, Empty> {
    const defaultCheckOption = {
        isZero: checkOption?.isZero ?? true,
        isFalse: checkOption?.isFalse ?? true,
    };
    return (
        value === undefined
        || value === null
        || (defaultCheckOption.isFalse && (value === false || value === 'false'))
        || (defaultCheckOption.isZero && (value === 0 || value === '0'))
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
    );
}


