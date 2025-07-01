# use in NextJS

- Support `Nextjs 15+`
- This example uses routing to specify the language.

## Structure

src/
├── app/
│   ├── [locale]/                   # 動態路由 - 語系參數
│   │   ├── layout.tsx              # 語系層級的布局文件
│   │   ├── page.tsx                # 首頁 (例如: /en-US, /zh-TW, /ja-JP)
│   │   └── about/
│   │       └── page.tsx            # 關於頁面 (例如: /en-US/about)
│   └── layout.tsx                  # 根布局文件
├── config/
│   ├── locale.ts                   # 語系配置
│   └── app.ts                      # 應用配置
├── locales/                        # 翻譯文件路徑
│   ├── en-US.ts                    # 英文翻譯文件
│   ├── zh-TW.ts                    # 繁體中文翻譯文件
├── library/
│   └── react-locale/
│       ├── config.ts               # 設定
│       ├── hooks.ts                # 多語系翻譯方法
│       ├── index.ts                
│       ├── LocaleProvider.tsx      # 多語系提供者
│       └── LocaleProvider.tsx      # 多語系提供者
└── middleware.ts                   # 中介層


## Usage

src/library/react-locale/config.ts

```tsx
import {objectKeys} from '@acrool/js-utils/object';
import {TI18nGroupTexts, TLocale} from '@acrool/react-locale';

import {TDefaultTranslations} from '@/locales/zh-TW';

export enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
}

export type TLocaleDictionariesAsync = {
    [localeCode in TLocale]: () => Promise<TI18nGroupTexts>;
};

export const localeDictionaries: TLocaleDictionariesAsync = {
    [ELocales.zhTW]: () => import('@/locales/zh-TW').then((module) => module.default),
    [ELocales.enUS]: () => import('@/locales/en-US').then((module) => module.default),
};

export const DEFAULT_LOCALE = ELocales.zhTW;

export const locales = objectKeys(localeDictionaries);

/**
 * Server 取得多語系字典檔方法
 * @param locale
 */
export const getDictionary = async (locale: ELocales) => {
    return localeDictionaries[locale]() as Promise<TDefaultTranslations>;
};

```


src/app/[locale]/layout.tsx

```tsx
import {Metadata} from 'next';
import {ReactNode} from 'react';

import {siteUrls} from '@/config/site';
import LocaleProvider from '@/library/react-locale';
import {ELocales, getDictionary, locales} from '@/library/react-locale/config';
import {getAppLocale} from '@/library/react-locale/server';

import {zMaruGothic} from '../../../styles/fonts';

interface IProps {
    children: ReactNode
    params: {
        locale: ELocales,
    }
}

/**
 * 生成靜態路由參數
 */
export function generateStaticParams() {
    return locales.map((locale) => ({
        locale,
    }));
}


export async function generateMetadata({params}: IProps): Promise<Metadata> {
    const {locale} = await params;

    const localeDictionary = await getDictionary(locale);
    const {t} = getAppLocale(locale, localeDictionary);

    return {
        title: t('meta.title'),
        description: t('meta.metaDescription'),
        metadataBase: new URL(siteUrls.official),
        alternates: {
            canonical: '/',
        },
        openGraph: {
            type: 'website',
            url: siteUrls.official,
            title: t('meta.title'),
            description: t('meta.metaDescription'),
            siteName: t('meta.siteName'),
            images: [{
                url: '/og.png',
            }],
        },
    };
}

/**
 * 語系路由 Layout
 * @param children
 * @param params 路由參數
 */
export default async function LocaleLayout({
   children,
   params,
}: IProps) {
    const {locale} = await params;
    const localeDictionary = await getDictionary(locale);

    return (
        <html
            lang={locale}
            className={zMaruGothic.className}
        >
        <body>
            <LocaleProvider
                localeDictionary={localeDictionary}
                currentLocale={locale}
            >
                {children}
            </LocaleProvider>
        </body>
        </html>
    );
}
```


src/middleware.ts

```tsx

import {isEmpty} from '@acrool/js-utils/equal';
import {jsonDecode} from '@acrool/js-utils/string';
import {IAuthTokens} from '@acrool/react-fetcher';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

import {persistKeyMap, routerPath} from '@/config/app';
import {DEFAULT_LOCALE, ELocales} from '@/library/react-locale/config';


const persistAuthKey = persistKeyMap.auth;

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // 處理語系路由重導向
    // 檢查是否為語系路由格式 /[locale]/...
    const localeMatch = path.match(/^\/([a-z]{2}-[A-Z]{2})(\/.*)?$/);

    let locale = DEFAULT_LOCALE;
    if (!localeMatch) {
        // 如果不是語系路由，且不是根路徑，重導向到預設語系
        if (path !== '/') {
            return NextResponse.redirect(new URL(`/${locale}${path}`, req.nextUrl));
        }
        return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl));
        // 如果是語系路由，檢查是否為預設語系
    }

    locale = localeMatch[1] as ELocales;
    const pathWithOutLocale = localeMatch[2] || '';
    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|static|robots.txt|sitemap.xml).*)',
    ],
};

```
