import {TI18nTexts, TLocale} from './types';

/**
 * 翻譯的格式化（v5 起取代 react-intl）
 *
 * 支援的語法與 react-intl（ICU MessageFormat）的子集相同，輸出也一致：
 * - `{name}`：代換參數；數字原樣輸出（不加千分位），null、undefined 輸出空字串。
 *   名稱是空白與 ICU 語法字元（`#`、`-`、`.` 等）以外的字，前後可以有空白
 * - `''`：一個單引號；`'{…}'`、`'<…'`：單引號後面接 `{`、`}`、`<`、`>` 時，到下一個單引號之間都是字面文字；其他單引號照原樣
 * - 自閉合的標籤（`<br/>`、`<br />`）照常輸出成 `<br/>`
 *
 * 不支援 plural、select、number、date 等 ICU 語法與 rich text 標籤（`<b>…</b>`、`</b>` 等）：
 * 有傳 args 時遇到這些語法，回傳原始字串並回報 FORMAT_ERROR，與 react-intl 沒有提供對應參數時相同。
 */

export type TFormatErrorCode = 'MISSING_TRANSLATION' | 'FORMAT_ERROR';

export interface IFormatError {
    code: TFormatErrorCode
    message: string
}

export interface IFormatMessageOptions {
    def?: string
    args?: Record<string, any>
}

export interface IFormatContext {
    locale: TLocale
    defaultLocale: TLocale
    messages: TI18nTexts
    onError?: (error: IFormatError) => void
}

type TParseResult = {text: string, error?: undefined} | {text?: undefined, error: string};

const QUOTE = '\'';

/** 單引號後面接這些字元時，開始一段字面文字 */
const QUOTABLE = ['{', '}', '<', '>'];

/** 標籤名稱可用的字元（與 @formatjs/icu-messageformat-parser 相同） */
const TAG_NAME = /[-.0-9_a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]*/uy;

/** 參數名稱：空白與 ICU 語法字元以外的字（與 @formatjs/icu-messageformat-parser 相同） */
const ARGUMENT_NAME = /[^\p{White_Space}\p{Pattern_Syntax}]*/uy;

/** 空白（與 @formatjs/icu-messageformat-parser 相同；不含不換行空白 U+00A0） */
const SPACES = /[\t-\r \u0085\u200E\u200F\u2028\u2029]*/y;

/**
 * 從 pattern[start] 開始讀符合 regex 的一段，回傳結束的位置
 * @param regex 有 y 旗標的 regex
 * @param pattern
 * @param start
 */
const readSticky = (regex: RegExp, pattern: string, start: number): number => {
    regex.lastIndex = start;
    regex.exec(pattern);
    return regex.lastIndex;
};

/**
 * 讀取 '{…}' 這種引號包住的字面文字，回傳內容與結束的位置（引號裡的 '' 是一個單引號）
 * @param pattern
 * @param start 開頭引號的位置
 */
const readQuoted = (pattern: string, start: number): {text: string, end: number} => {
    let text = '';
    let index = start + 1;
    while (index < pattern.length) {
        if (pattern[index] === QUOTE) {
            if (pattern[index + 1] === QUOTE) {
                text += QUOTE;
                index += 2;
                continue;
            }
            return {text, end: index + 1};
        }
        text += pattern[index];
        index += 1;
    }
    // 沒有結束的引號：剩下的都是字面文字
    return {text, end: pattern.length};
};

/**
 * 依參數代換訊息
 * @param pattern 訊息
 * @param args 參數
 */
const parse = (pattern: string, args: Record<string, any>): TParseResult => {
    let text = '';
    let index = 0;
    while (index < pattern.length) {
        const char = pattern[index];

        if (char === QUOTE) {
            const next = pattern[index + 1];
            if (next === QUOTE) {
                text += QUOTE;
                index += 2;
                continue;
            }
            if (QUOTABLE.includes(next)) {
                const quoted = readQuoted(pattern, index);
                text += quoted.text;
                index = quoted.end;
                continue;
            }
            text += char;
            index += 1;
            continue;
        }

        if (char === '{') {
            const nameStart = readSticky(SPACES, pattern, index + 1);
            const nameEnd = readSticky(ARGUMENT_NAME, pattern, nameStart);
            const close = readSticky(SPACES, pattern, nameEnd);
            if (nameStart === nameEnd || pattern[close] !== '}') {
                return {error: `unsupported argument at position ${index} (only {name} is supported)`};
            }
            const name = pattern.slice(nameStart, nameEnd);
            if (!(name in args)) {
                return {error: `missing value for argument \`${name}\``};
            }
            const value = args[name];
            text += value === null || typeof value === 'undefined' ? '' : String(value);
            index = close + 1;
            continue;
        }

        if (char === '<') {
            const next = pattern[index + 1];
            if (next === '/') {
                return {error: 'unmatched closing tag'};
            }
            if (/[a-zA-Z]/.test(next ?? '')) {
                const nameEnd = readSticky(TAG_NAME, pattern, index + 1);
                const name = pattern.slice(index + 1, nameEnd);
                const end = readSticky(SPACES, pattern, nameEnd);
                if (pattern.startsWith('/>', end)) {
                    // 自閉合的標籤當成文字
                    text += `<${name}/>`;
                    index = end + 2;
                    continue;
                }
                return {error: `rich text tag \`<${name}>\` is not supported`};
            }
        }

        text += char;
        index += 1;
    }
    return {text};
};

/**
 * 格式化一段訊息；沒有傳 args 時不代換，只把 '{x}' 還原成 {x}（與 react-intl 相同）
 * @param id 翻譯 key（用在錯誤訊息）
 * @param pattern 訊息
 * @param args 參數
 * @param onError
 */
const formatPattern = (id: string, pattern: string, args: Record<string, any> | undefined, onError?: IFormatContext['onError']): string => {
    if (typeof args === 'undefined') {
        return pattern.replace(/'\{(.*?)\}'/g, '{$1}');
    }
    const result = parse(pattern, args);
    if (typeof result.error !== 'undefined') {
        onError?.({code: 'FORMAT_ERROR', message: `Error formatting message: "${id}", ${result.error}`});
        return pattern;
    }
    return result.text;
};

/**
 * 取得翻譯並格式化
 * - 找不到翻譯（或是空字串）：有 def 用 def，沒有回傳 id 並回報 MISSING_TRANSLATION
 * - 有 def 但語系不是預設語系時，同樣回報 MISSING_TRANSLATION
 * @param context 語系與翻譯
 * @param id 翻譯 key
 * @param options def 預設文字、args 參數
 */
export const formatMessage = (context: IFormatContext, id: string, options?: IFormatMessageOptions): string => {
    const message = context.messages[id];
    const def = options?.def;

    if (!message) {
        if (!def || context.locale.toLowerCase() !== context.defaultLocale.toLowerCase()) {
            context.onError?.({code: 'MISSING_TRANSLATION', message: `Missing message: "${id}" for locale: "${context.locale}"`});
        }
        if (!def) {
            return id;
        }
        return formatPattern(id, def, options?.args, context.onError);
    }

    return formatPattern(id, message, options?.args, context.onError);
};
