/* eslint-disable no-template-curly-in-string */


export default {
    /** -----------------------------------------
     |                    共用                   |
     /** ---------------------------------------*/
    'common.loadData': 'データのロード',
    'common.howToUse': '使用方法',
    'common.sourceCode': 'ソースコード',
    'common.howToAdvantageFeature': 'この機能を利用する方法',
    'common.checkStep': 'マウスを猫の右ボタンに移動->チェック',

    'menu.feature': '機能',
    'menu.example': '例',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/

    // Page Home
    'page.home.title': '約',
    'page.home.desc': `これは,React + Flexbox（Reactへの非jsセカンダリ開発パッケージ）を使用して直接開発されたカルーセルです。<br/>
    必要な機能のみを含め,使用法を複雑にしたり,その他の奇妙な問題を引き起こしたりする可能性のあるクールな効果は多すぎないようにします。`,
    'page.home.feature.title': '機能',
    'page.home.feature.desc1': 'Reactへの二次開発ではjavascriptではなく,React + Flexboxを直接使用します',
    'page.home.feature.desc2': '使いやすい',
    'page.home.feature.desc3': 'Web,モバイルの両方をサポート',
    'page.home.feature.desc4': 'レスポンシブ設定パラメーター',
    'page.home.feature.desc5': 'ナビゲーションボタンは,単純な使用状況でオーバーフローの影響を受けることなく,カルーセル領域から直接移動できます',
    'page.home.feature.desc6': 'カルーセルアイテムにinlineStyleを追加する代わりにFlexboxを使用する',
    'page.home.feature.desc7': 'カルーセルアイテムのキーによる再レンダリングを回避する回数',
    'page.home.feature.desc8': '画像データが非同期で読み込まれる場合,BearCarouselにcomponentDidMountがあり,画像は読み込まれているが表示されていないため,表示されません。追加の処理が必要です。 ',
    'page.home.feature.desc9': 'プロジェクトのスタイルを設定する必要はありません。BearCarouselはプロジェクトのコンポーネントを直接提供します。画像のURLを設定して配列を作成し,それを配置するだけです。データパラメータ。 ',
    'page.home.feature.desc10': 'カルーセルのサイズ,外部コンテナーの高さは基準であり,アイテムコンテナーは外部コンテナーのサイズに従います',
    'page.home.feature.desc11': 'プロジェクトスケール設定+追加の固定サイズまたは固定高さ設定を提供します',
    'page.home.feature.desc12': 'カルーセルアイテムのonClickがスワイプでトリガーされないようにする',
    //'page.home.feature.desc12 ':'遅延読み込みモードは次のページの前に読み込まれるため,読み込み前にユーザーに空白の画面が表示されないため,エクスペリエンスが低下します ',

    // Page advices
    'page.advices.title': 'アドバイス',
    'page.advices.desc': '使用する前に推奨事項をお読みください。ベアカルーセルをより簡単に使用できるようになります',
    'page.advices.item.desc1': 'カードモード（画像+テキスト）を使用する場合は、スケール+追加の固定高さを使用できます',
    'page.advices.item.desc2': '自動幅モードを使用する場合は,固定の高さを設定する必要があります。 Bear CarouselのSlideItemは,imgタグを使用して画像の幅を自動化します。その他の場合は,必要に応じて同じ比率または固定の高さを使用することを選択できます。',
    'page.advices.item.desc3': 'ベアカルーセルはコンテンツの高さモード（例:テキストアナウンスライトボックス）を提供しません。使い勝手が悪いため,高さを修正してスクロールするだけで,ライトボックスロックが必要になります。バックグラウンド',

    // Page Installation
    'page.installation.title': 'インストール',
    'page.installation.desc': 'BearCarouselをプロジェクトに含める/インポートする方法にはいくつかのオプションがあります:',
    'page.installation.inYourIndex': '必要なスタイルファイルをプロジェクトのエントリポイントに追加します',
    'page.installation.fastUse': '高速使用',

    // Page lifeCycle
    'page.lifeCycle.title': '生命週期',

    // Page cssClassName
    'page.cssClassName.title': 'CSS Class Name',
    'page.cssClassName.desc': 'スタイルをカスタマイズするときは、css classNameを使用する必要があります。介入のカスタマイズのためにこれらの名前を参照できます。もちろん、私のように名前を書きたくない場合は、提供されている変数を使用できます。',
    'page.cssClassName.variable': '変数',

    // Page Components
    'page.api.title': 'API',
    'page.api.desc': 'コンポーネントと小道具の説明',
    'page.api.bearCarouselImportantNote': '"アスペクト"比と"staticHeight"は、値を与えるために選択できます',
    'page.api.bearSliderImportantNote': '画像モードを使用する場合は、「imageUrl」を入力する必要があります',

    // Page Props Try
    'page.propsTry.title': '小道具の試用',
    'page.propsTry.desc': '使用可能なすべての受信パラメーターを使用すると,結果をテストおよびプレビューできます',
    'page.propsTry.importantNote': 'デバッグツールまたは開発者ツールを開いてWeb要素を表示すると、スクロールが少しスムーズになりません。',

    // Page Feature / Static Height
    'page.feature.staticHeight.title': '静的高さ',
    'page.feature.staticHeight.desc': '固定高さモードを使用してカルーセルブロックの高さを固定すると,子レイヤーは親レイヤーと同じ高さになります',

    // Page Feature / Aspect Ratio Height
    'page.feature.aspectRatioHeight.title': 'アスペクト比の高さ',
    'page.feature.aspectRatioHeight.desc': '比例高さモードを使用して,カルーセルコンテンツがクリップされないようにします。幅が変更されると,高さが調整され,子レイヤーは親レイヤーと同じ高さになります。',

    // Page Feature / slide Card
    'page.feature.slideCard.title': 'スライドカード',
    'page.feature.slideCard.desc': '画像+テキストカードの表示方法',

    // Page Feature / Centered
    'page.feature.centered.title': '中央揃え',
    'page.feature.centered.desc': '中央位置に関する移動アイテム',
    'page.feature.centered.importantNote': 'slidesPerGroupの数は単数でなければならないことに注意してください。表示効果が気になる場合は,slideItemDataを計算してスライスし, ',

    // Page Feature / Auto Width
    'page.feature.autoWidth.title': '自動幅',
    'page.feature.autoWidth.desc': '画像自体の幅に応じて表示',
    'page.feature.autoWidth.importantNote': '自動幅は固定の高さで使用する必要があります',

    // Page Feature / Responsive
    'page.feature.responsive.title': 'レスポンシブ',
    'page.feature.responsive.desc': 'レスポンシブサイズに応じて設定を表示',
    'page.feature.responsive.importantNote': 'ブレークポイントにない設定はデフォルト設定であり,ブレークポイントはオーバーライド設定ですが,ブレークポイントの大きいサイズの設定には小さいサイズの設定は含まれません',

    // Page Example / Vip level list
    'page.example.vipLevelList.title': 'Vipレベルカードリスト',
    'page.example.vipLevelList.desc': 'マルチカードとコントロールページ',

    // Page Example / Auto Play Progress
    'page.example.autoPlayProgress.title': '自動再生の進行状況',
    'page.example.autoPlayProgress.desc': '中央位置に関して移動されたアイテム',

    // Page Example / Text Animation
    'page.example.textAnimations.title': 'テキストアニメーション',
    'page.example.textAnimations.desc': 'スワイプ終了時のテキスト表示効果',
};
