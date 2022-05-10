import React from 'react';
import {TLocale} from '../typings';


/** -----------------------------------------
 |               Interface                   |
 /** ---------------------------------------*/
export interface IState {
    locale: TLocale,
    setLocale: (locale: TLocale) => void
}

/** -----------------------------------------
 |            Initial State                 |
 /** ---------------------------------------*/
const state: IState = {
    locale: 'en-US',
    setLocale: () => {},
};

const LocaleContext = React.createContext<IState>(state);
LocaleContext.displayName = 'LocaleProvider';
const LocaleContextConsumer = LocaleContext.Consumer;
const LocaleContextProvider = LocaleContext.Provider;


export {
    LocaleContext,
    LocaleContextConsumer,
    LocaleContextProvider,
};
