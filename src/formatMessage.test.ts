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

    it('多餘的右大括號與 HTML 標籤照原樣輸出', () => {
        expect(run('brace', {args: {}}).output).toBe('a } b');
        expect(run('tag', {args: {}}).output).toBe('Click <b>here</b>');
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
