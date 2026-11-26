import {formatMessage, IFormatError} from './formatMessage';

/*
 * 以 react-intl 7.1.11 的實際輸出為準（v5 拿掉 react-intl 前逐項比對過）
 */

const messages = {
    str: 'Hello, {name}!',
    num: 'Total {count}',
    apos: 'don\'t {x}',
    esc: '\'{literal}\' {x}',
    dbl: 'It\'\'s {x}',
    tag: 'Click <b>here</b>',
    empty: '',
    twice: '{a} and {a}',
    spaced: '{ name }',
    nested: 'a {b} c',
    brace: 'a } b',
    quoteEnd: 'a \'\' b \'{c}',
    plural: '{n, plural, one {# game} other {# games}}',
};

/**
 * 以 en-US 格式化，收集錯誤
 * @param id
 * @param options
 * @param locale
 */
const run = (id: string, options?: {def?: string, args?: Record<string, unknown>}, locale = 'en-US') => {
    const errors: IFormatError[] = [];
    const output = formatMessage({locale, defaultLocale: 'en-US', messages, onError: (error) => errors.push(error)}, id, options);
    return {output, codes: errors.map((error) => error.code)};
};

describe('formatMessage', () => {
    it('代換 {name} 參數；同一個參數可以出現多次，括號內的空白忽略', () => {
        expect(run('str', {args: {name: 'Amy'}})).toEqual({output: 'Hello, Amy!', codes: []});
        expect(run('twice', {args: {a: 'X'}}).output).toBe('X and X');
        expect(run('spaced', {args: {name: 'Q'}}).output).toBe('Q');
    });

    it('數字原樣輸出，不加千分位（與 react-intl 相同）', () => {
        expect(run('num', {args: {count: 1234567.5}}).output).toBe('Total 1234567.5');
        expect(run('num', {args: {count: 1234567.5}}, 'de-DE').output).toBe('Total 1234567.5');
        expect(run('nested', {args: {b: 0}}).output).toBe('a 0 c');
    });

    it('null、undefined 輸出空字串；其他值轉成字串', () => {
        expect(run('nested', {args: {b: null}}).output).toBe('a  c');
        expect(run('nested', {args: {b: undefined}}).output).toBe('a  c');
        expect(run('nested', {args: {b: true}}).output).toBe('a true c');
    });

    it('參數名稱與括號內空白的規則與 react-intl 相同', () => {
        const format = (pattern: string, args: Record<string, unknown>) => {
            const errors: IFormatError[] = [];
            const output = formatMessage({locale: 'en-US', defaultLocale: 'en-US', messages: {k: pattern}, onError: (error) => errors.push(error)}, 'k', {args});
            return {output, codes: errors.map((error) => error.code)};
        };
        // 空白：tab、換行、U+200E 等算空白；不換行空白（U+00A0）不算
        expect(format('{\ta\n}', {a: 'A'})).toEqual({output: 'A', codes: []});
        expect(format('{\u200Ea}', {a: 'A'})).toEqual({output: 'A', codes: []});
        expect(format('{\u00A0a}', {a: 'A'})).toEqual({output: '{\u00A0a}', codes: ['FORMAT_ERROR']});
        // 名稱不能含 ICU 的語法字元（#、-、. 等），即使 args 有同名的參數
        expect(format('{a#}', {'a#': 'A'})).toEqual({output: '{a#}', codes: ['FORMAT_ERROR']});
        expect(format('{a.b}', {'a.b': 'A'})).toEqual({output: '{a.b}', codes: ['FORMAT_ERROR']});
        // 其他文字（數字、中文、重音字母）可以當名稱
        expect(format('{1}{名稱}{é}', {1: 'x', 名稱: 'y', é: 'z'})).toEqual({output: 'xyz', codes: []});
    });

    it('缺參數時回傳原始字串並回報 FORMAT_ERROR', () => {
        expect(run('str', {args: {}})).toEqual({output: 'Hello, {name}!', codes: ['FORMAT_ERROR']});
    });

    it('沒有傳 args 時不代換，只把 \'{x}\' 還原成 {x}', () => {
        expect(run('str')).toEqual({output: 'Hello, {name}!', codes: []});
        expect(run('dbl').output).toBe('It\'\'s {x}');
        expect(run('quoteEnd').output).toBe('a \'\' b \'{c}');
    });

    it('單引號的跳脫規則：\'\' 是一個單引號，\'{…}\' 是字面的大括號，其他單引號照原樣', () => {
        expect(run('apos', {args: {x: 1}}).output).toBe('don\'t 1');
        expect(run('esc', {args: {x: 1}}).output).toBe('{literal} 1');
        expect(run('dbl', {args: {x: 1}}).output).toBe('It\'s 1');
        expect(run('quoteEnd', {args: {}}).output).toBe('a \' b {c}');
    });

    it('多餘的右大括號照原樣輸出', () => {
        expect(run('brace', {args: {}}).output).toBe('a } b');
    });

    it('單引號後面接 < 或 > 也是跳脫', () => {
        const format = (message: string) => formatMessage({locale: 'en-US', defaultLocale: 'en-US', messages: {k: message}}, 'k', {args: {a: 'A'}});
        expect(format('\'<b>\' {a}')).toBe('<b> A');
        expect(format('a \'> b')).toBe('a > b');
        expect(format('\'<\'')).toBe('<');
    });

    it('有傳 args 時，HTML 標籤（自閉合的除外）回傳原始字串並回報 FORMAT_ERROR，與 react-intl 相同', () => {
        expect(run('tag', {args: {}})).toEqual({output: 'Click <b>here</b>', codes: ['FORMAT_ERROR']});
        const format = (message: string) => {
            const errors: IFormatError[] = [];
            const output = formatMessage({locale: 'en-US', defaultLocale: 'en-US', messages: {k: message}, onError: (error) => errors.push(error)}, 'k', {args: {a: 'A'}});
            return {output, codes: errors.map((error) => error.code)};
        };
        expect(format('<b>{a}</b>')).toEqual({output: '<b>{a}</b>', codes: ['FORMAT_ERROR']});
        expect(format('<br>')).toEqual({output: '<br>', codes: ['FORMAT_ERROR']});
        expect(format('a</b>')).toEqual({output: 'a</b>', codes: ['FORMAT_ERROR']});
        expect(format('<a href="x">y</a>')).toEqual({output: '<a href="x">y</a>', codes: ['FORMAT_ERROR']});
        // 自閉合的標籤照常輸出，<br /> 會變成 <br/>
        expect(format('<br/> {a}')).toEqual({output: '<br/> A', codes: []});
        expect(format('<br /> {a}')).toEqual({output: '<br/> A', codes: []});
        // < 後面不是英文字母就不是標籤
        expect(format('x<1 {a}')).toEqual({output: 'x<1 A', codes: []});
        expect(format('a < b')).toEqual({output: 'a < b', codes: []});
        expect(format('<中> {a}')).toEqual({output: '<中> A', codes: []});
    });

    it('沒有傳 args 時，HTML 標籤照原樣輸出', () => {
        expect(run('tag')).toEqual({output: 'Click <b>here</b>', codes: []});
    });

    it('不支援 plural、select 等 ICU 語法：回傳原始字串並回報 FORMAT_ERROR', () => {
        expect(run('plural', {args: {n: 1}})).toEqual({output: messages.plural, codes: ['FORMAT_ERROR']});
    });

    it('找不到翻譯：回傳 id 並回報 MISSING_TRANSLATION；空字串也算找不到', () => {
        expect(run('nope', {args: {}})).toEqual({output: 'nope', codes: ['MISSING_TRANSLATION']});
        expect(run('empty', {args: {}})).toEqual({output: 'empty', codes: ['MISSING_TRANSLATION']});
    });

    it('找不到翻譯但有 def：用 def 格式化；語系不是預設語系時另外回報 MISSING_TRANSLATION', () => {
        expect(run('nope', {def: 'Def {name}', args: {name: 'Z'}})).toEqual({output: 'Def Z', codes: []});
        expect(run('empty', {def: 'DEF', args: {}})).toEqual({output: 'DEF', codes: []});
        expect(run('nope', {def: 'Def', args: {}}, 'zh-TW')).toEqual({output: 'Def', codes: ['MISSING_TRANSLATION']});
    });

    it('def 缺參數時回傳 def 的原始字串並回報 FORMAT_ERROR', () => {
        expect(run('nope', {def: 'Def {name}', args: {}})).toEqual({output: 'Def {name}', codes: ['FORMAT_ERROR']});
    });
});
