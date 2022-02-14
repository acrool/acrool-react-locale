/* eslint-disable no-template-curly-in-string */


export default {
    /** -----------------------------------------
     |                    共用                   |
     /** ---------------------------------------*/
    'common.loadData': 'Load Data',
    'common.howToUse': 'How to use',
    'common.sourceCode': 'Source Code',
    'common.howToAdvantageFeature': 'How to take advantage of this feature',
    'common.checkStep': 'Move the mouse to the right button of the cat -> check',

    'menu.feature': 'Feature',
    'menu.example': 'Example',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/

    // Page Home
    'page.home.title': 'Home',
    'page.home.desc': `This is a carousel developed directly using React + Flexbox (non-js secondary development package into React),<br/>
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`,
    'page.home.feature.title': 'Feature',
    'page.home.feature.desc1': 'Use React + Flexbox directly, not javascript in secondary development into React',
    'page.home.feature.desc2': 'Easier to use',
    'page.home.feature.desc3': 'Supports both Web, Mobile',
    'page.home.feature.desc4': 'Responsive setting parameters',
    'page.home.feature.desc5': 'Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations',
    'page.home.feature.desc6': 'Use Flexbox instead of adding inlineStyle to carousel items',
    'page.home.feature.desc7': 'Number of times to avoid re-renders by key in carousel items',
    'page.home.feature.desc8': 'When the image data is loaded asynchronously, it will not be displayed because BearCarousel has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.',
    'page.home.feature.desc9': 'There is no need to set the style of the project, Bear Carousel directly provides the components of your project, you only need to set the image URL and form an array, and put it in the data parameter.',
    'page.home.feature.desc10': 'The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container',
    'page.home.feature.desc11': 'Provide project scale setting + additional fixed size or fixed height setting',
    'page.home.feature.desc12': 'Prevent onClick of carousel item from triggering on swipe',
    // 'page.home.feature.desc12': 'The lazy loading mode will load before the next page, so as to prevent users from seeing a blank screen before loading, resulting in a bad experience',

    // Page advices
    'page.advices.title': 'Advices',
    'page.advices.desc': 'Please read the recommendations before use, it will help you to use Bear Carousel more easily',
    'page.advices.item.desc1': 'If you want to use card mode (image + text), you can use scale + additional fixed height',
    'page.advices.item.desc2': 'If you want to use the automatic width mode, you need to set a fixed height. Bear Carousel\'s SlideItem will use the img tag to make the image width automatic. In other cases, you can choose to use equal proportion or fixed height according to your needs.',
    'page.advices.item.desc3': 'Bear Carousel does not provide the content height mode (ex: text announcement light box), because it is not easy to use, you only need to fix the height and scroll, light box lock background',

    // Page Installation
    'page.installation.title': 'Installation',
    'page.installation.desc': 'There are few options on how to include/import BearCarousel into your project:',
    'page.installation.inYourIndex': 'Add the required style files to your project entry point',
    'page.installation.fastUse': 'Fast use',

    // Page lifeCycle
    'page.lifeCycle.title': 'Life Cycle',

    // Page cssClassName
    'page.cssClassName.title': 'CSS Class Name',
    'page.cssClassName.desc': 'When customizing the style, you will need to use the css className. You can refer to these names for intervention customization. Of course, if you don\'t like to write the name on it like me, you can use the variables we provide.',
    'page.cssClassName.variable': 'Variable',

    // Page Api
    'page.api.title': 'API',
    'page.api.desc': 'Component and Props Desc',
    'page.api.bearCarouselImportantNote': '"aspectRatio" and "staticHeight" can be chosen to give a value',
    'page.api.bearSliderImportantNote': 'If you use image mode, you need to fill in "imageUrl"',

    // Page Props Try
    'page.propsTry.title': 'Props Try',
    'page.propsTry.desc': 'All available incoming parameters allow you to test and preview the results', // Page Props Try
    'page.propsTry.importantNote': 'If you open Debug or developer tools to view web elements, the scrolling will be slightly unsmooth',

    // Page Feature / Static Height
    'page.feature.staticHeight.title': 'Static Height',
    'page.feature.staticHeight.desc': 'Use fixed height mode to fix the height of the carousel block, and the child layer will be the same height as the parent layer',

    // Page Feature / Aspect Ratio Height
    'page.feature.aspectRatioHeight.title': 'Aspect Ratio Height',
    'page.feature.aspectRatioHeight.desc': 'Use the proportional height mode to avoid the carousel content from being clipped, and when the width changes, the height will adapt, and the child layer will be the same height as the parent layer',

    // Page Feature / slide Card
    'page.feature.slideCard.title': 'Slide Card',
    'page.feature.slideCard.desc': 'Image + text card display method',

    // Page Feature / Centered
    'page.feature.centered.title': 'Centered',
    'page.feature.centered.desc': 'Moved items as to the central position',
    'page.feature.centered.importantNote': 'It should be noted that the number of slidesPerGroup must be singular. If you care home the display effect, you can calculate slideItemData and slice it and then pass it in',

    // Page Feature / Auto Width
    'page.feature.autoWidth.title': 'Auto Width',
    'page.feature.autoWidth.desc': 'Display according to the width of the image itself',
    'page.feature.autoWidth.importantNote': 'Auto width must be used with fixed height',

    // Page Feature / Responsive
    'page.feature.responsive.title': 'Responsive',
    'page.feature.responsive.desc': 'Display settings according to responsive size',
    'page.feature.responsive.importantNote': 'Settings not in breakpoints are default settings, breakpoints are override settings, but large size settings in breakpoints will not include small size settings',

    // Page Example / Vip level list
    'page.example.vipLevelList.title': 'Vip Level Card List',
    'page.example.vipLevelList.desc': 'Multi card and control page',

    // Page Example / Auto Play Progress
    'page.example.autoPlayProgress.title': 'Auto Play Progress',
    'page.example.autoPlayProgress.desc': 'Moved items as to the central position',

    // Page Example / Text Animation
    'page.example.textAnimations.title': 'Text Animations',
    'page.example.textAnimations.desc': 'Text display effect when swipe ends',
};
