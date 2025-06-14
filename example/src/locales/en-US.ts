/*-------------------------
*      Default Locales
---------------------------*/
const translations = {
    page: {
        'page.home.field.title': 'Title',
        'page.home.field.name': 'Name',
        'page.home.field.inComponent': 'in component',
        'page.home.field.inArgs': 'use args',
        'page.home.field.notInComponent': 'not in component',
        'page.home.title': 'Home',
        'page.home.desc': `This is a carousel developed directly using React + Flexbox (non-js secondary development package into React),
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`,
        'page.home.feature.title': 'Feature',
    },
    common: {
        'common.button.ok': 'OK',
        'common.button.cancel': 'Cancel',
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



// 測試
// const text: TI18nTexts = "common.action"; // 正確
// const text2: TI18nTexts = "common.aa"; // 錯誤：key 不存在
// const text3: TI18nTexts = "wrong.key"; // 錯誤：前綴錯誤
