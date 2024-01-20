# Bear React Locale

<a href="https://bear-react-locale.pages.dev/" title="Bear React Locale - Internationalize Elegant intl library based for Reactjs">
    <img src="https://bear-react-locale.pages.dev/img/banner.webp" alt="Bear React Table Logo"/>
</a>

<p align="center">
    Internationalize Elegant intl library based for Reactjs
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/bear-react-locale.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-locale)
[![npm downloads](https://img.shields.io/npm/dm/bear-react-locale.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-locale)
[![npm](https://img.shields.io/npm/dt/bear-react-locale.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-locale)
[![npm](https://img.shields.io/npm/l/bear-react-locale?style=for-the-badge)](https://github.com/imagine10255/bear-react-locale/blob/main/LICENSE)

</div>



## Install

```bash
yarn add bear-react-locale
```

## Usage

create src/config/locale.ts

```tsx
import {TLocaleDictionaries} from 'bear-react-locale';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

export const localeDictionaries: TLocaleDictionaries = {
    [ELocales.enUS]: require('locales/en-US').default,
    [ELocales.zhTW]: require('locales/zh-TW').default,
    [ELocales.jaJP]: require('locales/ja-JP').default,
};
```


in your src/app.tsx add  (is not global state)

```tsx
import {StateControlLocaleProvider} from 'bear-react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';

<StateControlLocaleProvider 
    localeDictionaries={localeDictionaries}
    defaultLocale={DEFAULT_LOCALE}
    persistKey="bear-example"
    isReMountWithChangeLocale={true} // option: If you want to change the language, re-mount
>
    <AppRoute/>
</StateControlLocaleProvider>
```


if you use redux(global state) link locale, your can create custom Provider in your project

```tsx
import React, {Children} from 'react';
import {LocaleProvider} from 'bear-react-locale';
import {useDispatch, useSelector} from 'react-redux';
import {localeDictionaries, DEFAULT_LOCALE, ELocales} from 'config/locale';

// Stores
import {selector, actions} from 'store/main/language';

interface IProps {
    children: JSX.Element
}

const LanguageProvider = ({
    children
}: IProps) => {
    const dispatch = useDispatch();
    const locale = useSelector(selector.selectLanguage);

    const handleChangeLocale = (locale: ELocales) => {
        dispatch(actions.setLocale({locale}));
    };

    return <LocaleProvider
        localeDictionaries={localeDictionaries}
        defaultLocale={DEFAULT_LOCALE}
        locale={locale}
        setLocale={(locale: string ) => handleChangeLocale(locale as ELocales)}
    >
        {Children.only(children)}
    </LocaleProvider>;
};

export default LanguageProvider;

```

then in your src/app.tsx

```tsx

const App = () => {
    return (
        <Provider store={setup.store}>
            <LanguageProvider>
                <AppRoute/>
            </LanguageProvider>
        </Provider>
    );
};
```


### How to use

function component hook
```tsx
import {useLocale} from 'bear-react-locale';

const {i18n} = useLocale();

return <div>{i18n('page.promotion.title', {defaultMessage: 'promotions', params: {country: 'taiwan'}})}</div>
```

global function (in not function component) `only in provider children component`
```
import {translateI18n} from 'bear-react-locale';
translateI18n('page.promotion.title', {defaultMessage: 'promotions', params: {country: 'taiwan'}})
```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-react-locale-ejk43)

[Component and setup docs](./docs/component.md)


## License

MIT © [imagine10255](https://github.com/imagine10255)
