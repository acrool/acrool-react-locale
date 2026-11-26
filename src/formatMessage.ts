import {TI18nTexts, TLocale} from './types';

/**
 * 翻譯的格式化（v5 起取代 react-intl）
 *
 * 支援的語法與 react-intl（ICU MessageFormat）的子集相同，輸出也一致：
 * - `{name}`：代換參數；數字原樣輸出（不加千分位），null、undefined 輸出空字串
 * - `''`：一個單引號；`'{…}'`：字面的大括號；其他單引號照原樣
 *
 * 不支援 plural、select、number、date 等 ICU 語法與 rich text 標籤：遇到時回傳原始字串並回報 FORMAT_ERROR。
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
            if (next === '{' || next === '}') {
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
            const close = pattern.indexOf('}', index);
            if (close === -1) {
                return {error: 'unclosed `{`'};
            }
            const name = pattern.slice(index + 1, close).trim();
            if (name === '' || /[\s,{]/.test(name)) {
                return {error: `unsupported argument \`{${pattern.slice(index + 1, close)}}\` (only {name} is supported)`};
            }
            if (!(name in args)) {
                return {error: `missing value for argument \`${name}\``};
            }
            const value = args[name];
            text += value === null || typeof value === 'undefined' ? '' : String(value);
            index = close + 1;
            continue;
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
