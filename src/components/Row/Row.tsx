import React from 'react';
import styled, {css} from 'styled-components/macro';
import {ERowAlign} from './types';
import media from 'media';

import {FCChildrenProps, TStyledProps} from 'typings';
import {mediaSizes, themeName} from 'config';



export interface IProps extends FCChildrenProps{
    noGutters?: boolean;
    vertical?: ERowAlign;
    horizontal?: ERowAlign;
}


/**
 * Get Row Margin
 * @param props
 * @returns {*}
 */
const getRowMargin = (props: TStyledProps<IProps>) => {
    if(props.noGutters){
        return 0;
    }
    return `-${props.theme[themeName]?.gridGutterWidth}px`;
};



/**
 * 產生 Debug 資訊
 * @param props
 */
const generateDebugData = (props: TStyledProps<IProps>) => {
    if(process.env.NODE_ENV === 'production'){
        return undefined;
    }
    return  [
        'row',
        props.noGutters ? 'no-gutter' : '',
    ]
        .filter(Boolean)
        .join(' ');

};


/**
 * 產生 RWD 樣式
 * @param props
 */
const generateRWDStyled = (props: TStyledProps<IProps>) => {
    return mediaSizes
        .map(sizeName => {
            return media[sizeName]`
            margin-left: -${props.theme[themeName]?.gridGutterWidthMedia[sizeName]}px;
            margin-right: -${props.theme[themeName]?.gridGutterWidthMedia[sizeName]}px;
        `;
        });
};






/**
 * Row Component
 * align-items 預設加上 flex-start, 會讓鄰居Col高度不會一致
 */
const Row = styled.div.attrs((props: TStyledProps<IProps>) => ({
    'data-grid': 'row',
    'data-debug': generateDebugData(props),
}))`
  box-sizing: border-box;
  padding-inline-start: 0; // 避免 ul 預設樣式位移
  
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  
  

  ${(props: TStyledProps<IProps>) => css`
     margin-right: ${getRowMargin(props)};
     margin-left: ${getRowMargin(props)};
     
     justify-content: ${props.horizontal ? props.horizontal : undefined};
     align-items: ${props.vertical ? props.vertical : undefined};

     // ps: 設定會 width 100% 會產生 margin 抵銷失敗


     ${!props.noGutters && css`
        ${generateRWDStyled(props)}
     `}

     ${props.noGutters && css`
        >[data-grid=col]{
            padding-right: 0;
            padding-left: 0;
        }
     `}
 `}
`;

export default Row;

