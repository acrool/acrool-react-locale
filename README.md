# Acrool React Locale

<a href="https://acrool-react-locale.pages.dev/" title="Acrool React Locale - Internationalize Elegant intl library based for Reactjs">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-locale/main/example/public/og.webp" alt="Acrool React Locale Logo"/>
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


`^3.2.1 support react >=18.0.0 <20.0.0`


## Features

- Use `react-intl v7` for packaging
- Support Hooks
- Support `Nextjs 14+`


## Install

```bash
yarn add @acrool/react-locale
```

## Usage

create src/config/locale.ts

```tsx
import {TLocaleDictionaries} from '@acrool/react-locale';
import {enUS} from '@/locales/en-US';
import {zhTW} from '@/locales/zh-TW';
import {jaJP} from '@/locales/ja-JP';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

export const localeDictionaries: TLocaleDictionaries = {
    [ELocales.enUS]: enUS,
    [ELocales.zhTW]: zhTW,
    [ELocales.jaJP]: jaJP,
};
```

create src/locales/en-US.ts (Default Locales)

```ts
/*-------------------------
*      Default Locales
---------------------------*/
const translations = {
    page: {
        'page.home.field.title': 'Title',
        'page.home.desc': `This is a carousel developed directly using React + Flexbox (non-js secondary development package into React),
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`,
        'page.home.feature.title': 'Feature',
    },
    formatError:{
        'formatError.email': 'Email format error',
        'formatError.max': 'The maximum value is {max}',
        'formatError.maxFraction': 'The floating-point number can only have a maximum of {maxFraction} digits',
        'formatError.maxLength': 'Up to {maxLength} characters',
        'formatError.min': 'The minimum value is {min}',
        'formatError.minLength': 'At least {minLength} characters',
        'formatError.pattern': 'Format error',
        'formatError.required': 'Required Column'
    }
};

export default translations;
export type TDefaultTranslations = typeof translations;
```

create src/locales/zh-TW.ts (Options Locales)

```ts
import {TDefaultTranslations} from './en-US'; // Import default locales

const translations: TDefaultTranslations = {
    page:{
        'page.home.field.title': '標題',
        'page.home.desc': `Bear Carousel 是一個直接使用React + Flexbox開發的輪播套件 (非js二次開發包成React)，
     並且只包含你需要的功能，沒有太多很酷的效果，因為那些可能會讓你變得不容易使用並且產生其他奇怪的問題`,
        'page.home.feature.title': '特性',
    },
    formatError: {
        'formatError.email': '電子郵件格式錯誤',
        'formatError.max': '最大值為 {max}',
        'formatError.maxFraction': '浮點數最多僅能為 {maxFraction} 位數',
        'formatError.maxLength': '最多 {maxLength} 個字元',
        'formatError.min': '最小值為 {min}',
        'formatError.minLength': '至少 {minLength} 個字元',
        'formatError.pattern': '格式錯誤',
        'formatError.required': '必填欄位'
    }
};

export default translations;
```


create src/library/react-locale/index.tsx

```tsx
import {BlockWrapper} from '@acrool/react-block';
import {LocaleProvider} from '@acrool/react-locale';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

import {DEFAULT_LOCALE, serverDictionaries} from '@/config/locale';
import {persistKey} from '@/config/app';

interface IProps {
    children: JSX.Element
}


/**
 * Custom Locale Provider
 * @param children
 */
const ReactLocaleProvider = ({
     children
 }: IProps) => {
    const handleChangeLocale = (newLocale: string) => {
        dayjs.locale(newLocale);
    };

    return <LocaleProvider
        localeDictionaries={serverDictionaries}
        defaultLocale={DEFAULT_LOCALE}
        onChangeLocale={handleChangeLocale}
        renderLoading={() => <Loader/>}
        persistKey={`${persistKey}-locale`}
        ignoreMissingLocaleMessage={false}
    >
        {children}
    </LocaleProvider>;
};

export default ReactLocaleProvider;
```


then in your src/app.tsx

```tsx

const App = () => {
    return (
        <Provider store={setup.store}>
            <ReactLocaleProvider>
                <AppRoute/>
            </ReactLocaleProvider>
        </Provider>
    );
};
```


### If you need async load dictionaries

in src/config/locale.ts

`${languageCode}-${countryCode}`

languageCode is a two-letter lowercase code as defined by ISO-639.
https://zh.wikipedia.org/zh-tw/ISO_639-1

countryCode is a two-letter uppercase code as defined by ISO-3166.
https://zh.wikipedia.org/zh-tw/ISO_3166-1

For example, en-US is the language value for United States English.

```tsx
import {TLocaleDictionariesAsync} from '@acrool/react-locale';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

export const localeDictionaries: TLocaleDictionariesAsync = {
    [ELocales.enUS]: () => import('@/locales/en-US'),
    [ELocales.zhTW]: () => import('@/locales/zh-TW'),
    [ELocales.jaJP]: () => import('@/locales/ja-JP'),
};
```

in src/library/react-locale/index.tsx

```tsx
import {LocaleAsyncProvider} from '@acrool/react-locale';
// ...ignore same

const ReactLocaleProvider = ({
     children
 }: IProps) => {
    const handleChangeLocale = (newLocale: string) => {
        dayjs.locale(newLocale);
    };

    return <LocaleAsyncProvider
        //...ignore same
    >
        {children}
    </LocaleAsyncProvider>;
};

export default ReactLocaleProvider;
```


### How to use

function component hook

```tsx
import {useLocale} from '@acrool/react-locale';


const Example = () => {
    const {t} = useLocale();
    return <div>{t('page.promotion.title', {def: 'promotions', params: {country: 'Taiwan'}})}</div>
}
```

global function (in not function component) `only in provider children component`

```ts
import {translateI18n} from '@acrool/react-locale';
translateI18n('page.promotion.title', {def: 'promotions', params: {country: 'taiwan'}})
```


## Option

if you use redux(global state) link locale, your can create custom Provider in your project

```tsx
import React, {Children} from 'react';
import {OriginLocaleProvider} from '@acrool/react-locale';
import {useDispatch, useSelector} from 'react-redux';
import {localeDictionaries, DEFAULT_LOCALE, ELocales} from './config/locale';

// Stores
import {selector, actions} from './store/main/language';

interface IProps {
    children: JSX.Element
}

const ReactLocaleProvider = ({
    children
}: IProps) => {
    const dispatch = useDispatch();
    const locale = useSelector(selector.selectLanguage);

    const handleChangeLocale = (locale: ELocales) => {
        dispatch(actions.setLocale({locale}));
    };

    return <OriginLocaleProvider
        localeDictionaries={localeDictionaries}
        defaultLocale={DEFAULT_LOCALE}
        locale={locale}
        setLocale={(locale: string ) => handleChangeLocale(locale as ELocales)}
        ignoreMissingLocaleMessage={false}
    >
        {Children.only(children)}
    </OriginLocaleProvider>;
};

export default ReactLocaleProvider;
```

## Storybook use (Not async load locale dictionaries)

```tsx
import {PartialStoryFn, Renderer} from '@storybook/types';
import {DEFAULT_LOCALE, ELocales} from "@/config/locale";
import {persistKey} from "@/config/app";
import LocaleProvider, {TLocaleDictionaries} from "@acrool/react-locale";
import localeEnUS from "@/locales/en-US";


const localeDictionaries: TLocaleDictionaries = {
    [ELocales.enUS]: localeEnUS,
};
const withI18next = (StoryFn: PartialStoryFn<Renderer>) => {

    return (
        <LocaleProvider
            localeDictionaries={localeDictionaries}
            defaultLocale={DEFAULT_LOCALE}
            persistKey={`${persistKey}-locale`}
            ignoreMissingLocaleMessage={false}
        >
            <StoryFn/>
        </LocaleProvider>
    );
};



// storybook preview.tsx
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        withI18next,
        (Story) => (
            <GridThemeProvider>
                <Story/>
            </GridThemeProvider>
        ),
    ],
};
```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-locale/main/play-in-example-button.svg)](https://acrool-react-locale.pages.dev)


## IDE Webstorm Tools 

[Acrool React Utils With Webstorm](https://plugins.jetbrains.com/plugin/27268-acrool-react-utils)

<img src="https://raw.githubusercontent.com/acrool/acrool-react-locale/main/example/public/ide-helper/1.png" alt="Webstorm Panel"/>
<img src="https://raw.githubusercontent.com/acrool/acrool-react-locale/main/example/public/ide-helper/2.png" alt="Convert t()"/>
<img src="https://raw.githubusercontent.com/acrool/acrool-react-locale/main/example/public/ide-helper/3.png" alt="Create to locales"/>


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
