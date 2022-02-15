# bear-locale

> Internationalize Elegant intl library based for Reactjs


[![NPM](https://img.shields.io/npm/v/bear-locale.svg)](https://www.npmjs.com/package/bear-locale)
[![npm](https://img.shields.io/npm/dm/bear-locale.svg)](https://www.npmjs.com/package/bear-locale)


## Install

```bash
yarn add bear-locale
```

## Usage

create src/config/locale.ts  

```tsx
import {TLocaleDictionaries} from 'bear-locale';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

export const localeConfig: TLocaleDictionaries = {
    [ELocales.enUS]: require('locales/en-US').default,
    [ELocales.zhTW]: require('locales/zh-TW').default,
    [ELocales.jaJP]: require('locales/ja-JP').default,
};
```


in your src/index.tsx add  

```tsx
import {LocaleControlProvider} from 'bear-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';

<LocaleControlProvider 
   localeDictionaries={localeDictionaries}
    defaultLocale={DEFAULT_LOCALE}
    persistKey="bear-example"
>
    <App/>
</GridThemeProvider>
```





There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-locale-ejk43)

[Component and setup docs](./docs/component.md)


## License

MIT © [imagine10255](https://github.com/imagine10255)
