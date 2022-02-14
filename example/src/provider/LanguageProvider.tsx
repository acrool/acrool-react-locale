/*
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/resources/lang`)
 */

import React, {Children, ReactNode, useState} from 'react';
import {LocaleProvider} from 'bear-locale';
import {localeConfig, DEFAULT_LOCALE} from '../config/locale';


interface IProps {
    children: JSX.Element,
}

const LanguageProvider = ({
    children
}: IProps) => {

    return (
        <LocaleProvider
            localeConfig={localeConfig}
            defaultLocale={DEFAULT_LOCALE}
        >
            {Children.only(children)}
        </LocaleProvider>
    );
};

export default LanguageProvider;
