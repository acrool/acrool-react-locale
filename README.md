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

export const localeDictionaries: TLocaleDictionaries = {
    [ELocales.enUS]: require('locales/en-US').default,
    [ELocales.zhTW]: require('locales/zh-TW').default,
    [ELocales.jaJP]: require('locales/ja-JP').default,
};
```


in your src/app.tsx add  

```tsx
import {LocaleControlProvider} from 'bear-locale';
import {DEFAULT_LOCALE, localeDictionaries} from './config/locale';

<LocaleControlProvider 
   localeDictionaries={localeDictionaries}
    defaultLocale={DEFAULT_LOCALE}
    persistKey="bear-example"
>
    <AppRoute/>
</GridThemeProvider>
```


if you use redux link locale, your can create custom Provider in your project

```tsx
interface IProps {
    children: JSX.Element
}

const LanguageProvider = ({
    children
}: IProps) => {
    const locale = useSelector(selector.selectLanguage);

    return <LocaleProvider
        localeDictionaries={localeDictionaries}
        defaultLocale={DEFAULT_LOCALE}
        locale={locale}
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
import {useLocale} from 'bear-locale';

const {i18n} = useLocale();

return <div>{i18n('page.promotion.title', {defaultMessage: 'promotions', params: {country: 'taiwan'}})}</div>
```

global function in not function component
```
window.translateI18n('page.promotion.title', {defaultMessage: 'promotions', params: {country: 'taiwan'}})
```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-locale-ejk43)

[Component and setup docs](./docs/component.md)


## License

MIT © [imagine10255](https://github.com/imagine10255)
