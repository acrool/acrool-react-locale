import React from 'react';

import {IFormatMessageOptions} from './formatMessage';
import {TLocale} from './types';


/** -----------------------------------------
 |               Interface                   |
 /** ---------------------------------------*/
export interface IState {
    locale: TLocale
    setLocale: (locale: TLocale) => void
    formatMessage: (id: string, options?: IFormatMessageOptions) => string
}

/** -----------------------------------------
 |            Initial State                 |
 /** ---------------------------------------*/
const state: IState = {
    locale: 'en-US',
    setLocale: () => console.log('not yet ready setLocale'),
    formatMessage: (id, options) => options?.def ?? id,
};

const LocaleContext = React.createContext<IState>(state);
LocaleContext.displayName = 'LocaleProvider';
const LocaleContextProvider = LocaleContext.Provider;


export {
    LocaleContext,
    LocaleContextProvider,
};
