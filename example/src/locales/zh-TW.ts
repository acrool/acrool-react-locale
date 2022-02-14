/* eslint-disable no-template-curly-in-string */

export default {

    /** -----------------------------------------
     |                    共用                   |
     /** ---------------------------------------*/
    'common.loadData': '載入資料',
    'common.howToUse': '如何使用',
    'common.sourceCode': '原始碼',
    'common.howToAdvantageFeature': '如何利用這個特性',
    'common.checkStep': '滑鼠移動到貓咪右鍵->檢查',

    'menu.feature': '特性',
    'menu.example': '客製化實例',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/
    // Page Home
    'page.home.title': '關於',
    'page.home.desc': `Bear Carousel 是一個直接使用React + Flexbox開發的輪播套件 (非js二次開發包成React)，<br/>
     並且只包含你需要的功能，沒有太多很酷的效果，因為那些可能會讓你變得不容易使用並且產生其他奇怪的問題`,
    'page.home.feature.title': '特性',
    'page.home.feature.desc1': '直接由 React+Flexbox, 非JS二次開發在React中註冊',
    'page.home.feature.desc2': '更簡單的使用方式',
    'page.home.feature.desc3': '支援行動裝置與電腦版網頁',
    'page.home.feature.desc4': '依響應式設定參數',
    'page.home.feature.desc5': '導航按鈕 在簡單的使用情境下, 可直接移出輪播區域外, 不受 overflow 影響',
    'page.home.feature.desc6': '使用Flexbox, 而不是在輪播項目中加上 inlineStyle',
    'page.home.feature.desc7': '在輪播項目中透過 key 來避免重新渲染的次數',
    'page.home.feature.desc8': '圖片資料為非同步加載時, 不會因為 Bear Carousel 已經 componentDidMount, 而圖片已加載完成卻不顯示, 需要額外處理',
    'page.home.feature.desc9': '不需要額外設定項目的樣式, Bear Carousel 直接提供給你項目的元件, 只需要設定圖片網址並組成陣列, 放到 data 參數裡即可',
    'page.home.feature.desc10': '輪播的大小, 以外容器高度為主, 項目容器跟隨外容器大小, 可避免非同步載入時 的瞬間有高度而產生的畫面跳動造成不好的視覺體驗',
    'page.home.feature.desc11': '提供項目比例設定+額外固定大小或是固定高度的設定',
    'page.home.feature.desc12': '防止輪播項目的onClick在滑動時觸發',
    // 'page.home.feature.desc12': '懶加載模式會在下一頁之前先載入, 避免讓使用者看到未載入前空白畫面, 造成不好的體驗',

    // Page advices
    'page.advices.title': '建議',
    'page.advices.desc': '使用前請先看完建議事項, 這樣能夠幫助你更容易使用 Bear Carousel',
    'page.advices.item.desc1': '如果你想在使用卡片模式(圖+文), 可使用比例+附加固定高度',
    'page.advices.item.desc2': '如果你想使用自動寬度模式, 你需要設定固定高度, Bear Carousel 的 SlideItem 會使用 img 標籤讓圖片寬度自動, 其他情況你可以根據需要自己選擇使用等比例或是固定高度',
    'page.advices.item.desc3': 'Bear Carousel 沒有提供內容高度 自動撐開內容的模式(ex: 文字公告光箱), 因為並不好用, 你只需要固定高度與捲軸, 光箱鎖背景',

    // Page Installation
    'page.installation.title': '安裝',
    'page.installation.desc': '關於如何在項目中包含/導入 BearCarousel',
    'page.installation.inYourIndex': '在你的專案進入點加入需要的樣式檔',
    'page.installation.fastUse': '快速使用',

    // Page lifeCycle
    'page.lifeCycle.title': '生命週期',

    // Page cssClassName
    'page.cssClassName.title': 'CSS Class Name',
    'page.cssClassName.desc': '客製化樣式時, 會需要使用 css className, 你可以參考這些名稱進行介入客製, 當然如果你跟我一樣不喜歡寫死名稱在上面, 可以用我們提供的變數來使用',
    'page.cssClassName.variable': '變數',

    // Page API
    'page.api.title': 'API',
    'page.api.desc': '可用元件與Props參數說明',
    'page.api.bearCarouselImportantNote': '"aspectRatio" 和 "staticHeight" 為擇一給值即可',
    'page.api.bearSliderImportantNote': '如果你使用 圖片模式, 則需要填寫 "imageUrl"',

    // Page Props Try
    'page.propsTry.title': '可用參數測試',
    'page.propsTry.desc': '讓你調整所有參數, 並進行快速測試與除錯',
    'page.propsTry.importantNote': '若您開啟 Debug 或是 開發者工具檢視網頁元素, 滑動會稍微不順暢',

    // Page Feature / Static Height
    'page.feature.staticHeight.title': '固定高度',
    'page.feature.staticHeight.desc': '使用固定高度模式, 將輪播區塊高度固定, 子層會與父層同高',

    // Page Feature / Aspect Ratio Height
    'page.feature.aspectRatioHeight.title': '等比例高度',
    'page.feature.aspectRatioHeight.desc': '使用等比例的高度模式, 可避免輪播內容被裁截, 並且當寬度變化的時候, 高度會自適應, 子層會與父層同高',

    // Page Feature / slide Card
    'page.feature.slideCard.title': '滑動卡片',
    'page.feature.slideCard.desc': '圖片+文字的卡片顯示方式',

    // Page Feature / Centered
    'page.feature.centered.title': '置中顯示',
    'page.feature.centered.desc': '移動的項目黏在中央',
    'page.feature.centered.importantNote': '需要注意 slidesPerGroup 數必須為單數, 如果介意顯示效果, 可自行將 slideItemData 計算 並 slice 再傳入',

    // Page Feature / Auto Width
    'page.feature.autoWidth.title': '自動寬度',
    'page.feature.autoWidth.desc': '根據圖像本身的寬度顯示',
    'page.feature.autoWidth.importantNote': '自動寬度必須搭配固定高度來使用',

    // Page Feature / Responsive
    'page.feature.responsive.title': '依響應式設定',
    'page.feature.responsive.desc': '根據響應大小顯示設置',
    'page.feature.responsive.importantNote': '不在 breakpoints 中的設定為預設設定, breakpoints 為覆蓋設定, 但 breakpoints 中的大尺寸設定不會包含小尺寸設定',


    // Page Example / Vip level list
    'page.example.vipLevelList.title': 'VIP等級卡片列表',
    'page.example.vipLevelList.desc': '多的卡片顯示方式與外部連動控制位置',

    // Page Example / Auto Play Progress
    'page.example.autoPlayProgress.title': '自動播放進度條',
    'page.example.autoPlayProgress.desc': '客製化自動播放倒數的進度條',

    // Page Example / Text Animation
    'page.example.textAnimations.title': '文字動畫',
    'page.example.textAnimations.desc': '當滑動結束時文字顯示效果',
};
