import {LocaleAsyncProvider} from '@acrool/react-locale';
import dayjs from 'dayjs';
import React, {Children, JSX} from 'react';

import {persistKey} from '@/config/app';
import {DEFAULT_LOCALE, localeDictionaries} from './config';

interface IProps {
    children: JSX.Element
}

/**
 * 多語系提供者
 * @param children
 */
const LocaleProvider = ({
    children
}: IProps) => {
    const handleChangeLocale = (newLocale: string) => {
        dayjs.locale(newLocale);
    };

    return <LocaleAsyncProvider
        localeDictionaries={localeDictionaries}
        defaultLocale={DEFAULT_LOCALE}
        onChangeLocale={handleChangeLocale}
        // renderLoading={() => <BlockWrapperFixed queueKey="locale-fetching"/>}
        persistKey={`${persistKey}-locale`}
    >
        {Children.only(children)}
    </LocaleAsyncProvider>;
};

export default LocaleProvider;

