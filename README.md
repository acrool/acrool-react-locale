# bear-locale

> bear project locale system


[![NPM](https://img.shields.io/npm/v/bear-locale.svg)](https://www.npmjs.com/package/bear-locale)
[![npm](https://img.shields.io/npm/dm/bear-locale.svg)](https://www.npmjs.com/package/bear-locale)

This project [demo](https://imagine10255.github.io/bear-locale/)


## Install

```bash
yarn add bear-locale
```

## Usage
in your index.ts add  
`see the example/src/index.ts`

```tsx
import {LocaleProvider} from 'bear-locale';

<LocaleProvider >
    <App/>
</GridThemeProvider>
```

create src/config/locale.ts  

```tsx
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




There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-locale-lqsn6)

[Component and setup docs](./docs/component.md)


## License

MIT © [imagine10255](https://github.com/imagine10255)
