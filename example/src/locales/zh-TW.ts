import {TKeyTranslations} from './en-US';

const translations: TKeyTranslations = {

    page:{
        'page.home.field.title': '標題',
        'page.home.field.name': '名稱',
        'page.home.field.inComponent': '在元件內',
        'page.home.field.inArgs': '使用參數',
        'page.home.field.notInComponent': '不在元件內',

        'page.home.title': '關於',
        'page.home.desc': `Bear Carousel 是一個直接使用React + Flexbox開發的輪播套件 (非js二次開發包成React)，
     並且只包含你需要的功能，沒有太多很酷的效果，因為那些可能會讓你變得不容易使用並且產生其他奇怪的問題`,
        'page.home.feature.title': '特性',   
    },
    common:{
        'common.button.ok': '確定',
        'common.button.cancel': '取消',
    },
    formatError: {
        'formatError.email': '電子郵件格式錯誤',
        'formatError.max': '最大值為 {max}',
        'formatError.maxFraction': '浮點數最多僅能為 {maxFraction} 位數',
        'formatError.maxLength': '最多 {maxLength} 個字元',
        'formatError.min': '最小值為 {min}',
        'formatError.minLength': '至少 {minLength} 個字元',
        'formatError.pattern': '格式錯誤',
        'formatError.required': '必填欄位'
    }
    
};

export default translations;