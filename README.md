# Acrool React Locale

<a href="https://acrool-react-locale.pages.dev/" title="Acrool React Locale - Internationalize Elegant intl library based for Reactjs">
    <img src="https://acrool-react-locale.pages.dev/og.webp" alt="Acrool React Locale Logo"/>
</a>

<p align="center">
    Internationalize Elegant intl library based for Reactjs
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-locale.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-locale)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-locale?style=for-the-badge)](https://github.com/acrool/@acrool/react-locale/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-locale?style=for-the-badge)](https://github.com/acrool/react-locale/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-locale.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-locale)
[![npm](https://img.shields.io/npm/dt/@acrool/react-locale.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-locale)


</div>



## Install

```bash
yarn add @acrool/react-locale
```

## Usage

create src/config/locale.ts

```tsx
import {TLocaleDictionaries} from '@acrool/react-locale';

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

create src/locales/en-US.ts

```ts
export default {
    'page.home.title': 'Home',
    'page.home.desc': `This is a carousel developed directly using React + Flexbox (non-js secondary development package into React),<br/>
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`,
    'page.home.feature.title': 'Feature',
};
```

create src/locales/zh-TW.ts

```ts
export default {
    'page.home.title': '關於',
    'page.home.desc': `Bear Carousel 是一個直接使用React + Flexbox開發的輪播套件 (非js二次開發包成React)，<br/>
     並且只包含你需要的功能，沒有太多很酷的效果，因為那些可能會讓你變得不容易使用並且產生其他奇怪的問題`,
    'page.home.feature.title': '特性',
};
```


in your src/app.tsx add  (is not global state)

```tsx
import {StateControlLocaleProvider} from '@acrool/react-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';

<StateControlLocaleProvider 
    localeDictionaries={localeDictionaries}
    defaultLocale={DEFAULT_LOCALE}
    persistKey="acrool-example"
    isReMountWithChangeLocale={true} // option: If you want to change the language, re-mount
>
    <AppRoute/>
</StateControlLocaleProvider>
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
import {useLocale} from '@acrool/react-locale';


const Example = () => {
    const {i18n} = useLocale();
    return <div>{i18n('page.promotion.title', {defaultMessage: 'promotions', params: {country: 'Taiwan'}})}</div>
}
```

global function (in not function component) `only in provider children component`

```ts
import {translateI18n} from '@acrool/react-locale';
translateI18n('page.promotion.title', {defaultMessage: 'promotions', params: {country: 'taiwan'}})
```


## Option

if you use redux(global state) link locale, your can create custom Provider in your project

```tsx
import React, {Children} from 'react';
import {LocaleProvider} from '@acrool/react-locale';
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


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
