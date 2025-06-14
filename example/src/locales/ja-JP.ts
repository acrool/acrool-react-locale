import {TDefaultTranslations} from './en-US';

const translations: TDefaultTranslations = {
    page: {
        'page.home.field.title': 'タイトル',
        'page.home.field.name': '名前',
        'page.home.field.inComponent': 'コンポーネント内',
        'page.home.field.inArgs': 'パラメータの使用',
        'page.home.field.notInComponent': 'コンポーネント内ではありません',

        'page.home.title': '約',
        'page.home.desc': `これは,React + Flexbox（Reactへの非jsセカンダリ開発パッケージ）を使用して直接開発されたカルーセルです。
    必要な機能のみを含め,使用法を複雑にしたり,その他の奇妙な問題を引き起こしたりする可能性のあるクールな効果は多すぎないようにします。`,
        'page.home.feature.title': '機能',
    },
    common: {
        'common.button.ok': 'OK',
        'common.button.cancel': 'キャンセル',
    },
    formatError: {
        'formatError.email': 'メールアドレスの形式が正しくありません',
        'formatError.max': '最大値は {max} です',
        'formatError.maxFraction': '小数点以下は最大で {maxFraction} 桁までです',
        'formatError.maxLength': '最大 {maxLength} 文字まで',
        'formatError.min': '最小値は {min} です',
        'formatError.minLength': '少なくとも {minLength} 文字必要です',
        'formatError.pattern': '形式が正しくありません',
        'formatError.required': '必須項目です'
    }
} as const;


export default translations;
