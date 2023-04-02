import {formatTranslationMessages} from '../src/utils';

enum ELocales {
    enUS = 'en-US',
    zhTW = 'zh-TW',
    jaJP = 'ja-JP',
}

const localeDictionariesData = {
    'page.home.title': 'Home',
    'page.home.desc': `This is a carousel developed directly using React + Flexbox (non-js secondary development package into React),<br/>
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`,
    'page.home.feature.title': 'Feature',
};

const localeDictionaries = {
    [ELocales.enUS]: localeDictionariesData,
    [ELocales.zhTW]: localeDictionariesData,
    [ELocales.jaJP]: localeDictionariesData,

};

test('formatTranslationMessages', () => {
    const testFailKeyButUseDefault = formatTranslationMessages('en-us', ELocales.enUS, localeDictionaries);
    const testTrueKey = formatTranslationMessages('en-US', ELocales.enUS, localeDictionaries);
    const testFailKayAndFailDefaultKey = formatTranslationMessages('en-us', 'zh-cn', localeDictionaries);

    expect(testFailKeyButUseDefault).toEqual(localeDictionariesData);
    expect(testTrueKey).toEqual(localeDictionariesData);
    expect(testFailKayAndFailDefaultKey).toEqual({});
});


export {}
