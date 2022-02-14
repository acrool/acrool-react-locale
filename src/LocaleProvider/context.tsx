import React from 'react';
import {ELocales} from '../typings';


/** -----------------------------------------
 |               Interface                   |
 /** ---------------------------------------*/
export interface IState {
    locale: ELocales,
    setLocale: (locale: ELocales) => void
}

/** -----------------------------------------
 |            Initial State                 |
 /** ---------------------------------------*/
const state: IState = {
    locale: ELocales.enUS,
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
