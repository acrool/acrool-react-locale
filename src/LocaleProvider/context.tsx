import React from 'react';
import {TLocales} from '../typings';


/** -----------------------------------------
 |               Interface                   |
 /** ---------------------------------------*/
export interface IState {
    locale?: TLocales,
    setLocale: (locale: TLocales) => void
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
