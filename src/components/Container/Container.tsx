import React from 'react';
import styled, {css} from 'styled-components/macro';
import media from 'media';
import {mediaSizes, themeName} from 'config';

import {FCChildrenProps, TStyledProps} from 'typings';



interface IProps extends FCChildrenProps{
    fluid?: boolean;
}


/**
 * 產生 Debug 資訊
 * @param props
 */
const generateDebugData = (props: TStyledProps<IProps>) => {
    if(process.env.NODE_ENV === 'production'){
        return undefined;
    }
    return [
        props.fluid ? 'container-fluid' : 'container',
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
            max-width: ${props.theme[themeName]?.containerMaxWidths[sizeName]}px;
        `;
        });
};








/**
 * 元件 Container
 */
const Container = styled.div.attrs((props: TStyledProps<IProps>) => ({
    'data-grid': 'container',
    'data-debug': generateDebugData(props),
}))`
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  ${(props: TStyledProps<IProps>) => css`
     box-sizing: border-box;
     padding-right: ${props.theme[themeName]?.gridGutterWidth}px;
     padding-left: ${props.theme[themeName]?.gridGutterWidth}px;

     ${!props.fluid && css`
        ${generateRWDStyled(props)};
    `}
 `}
`;

export default Container;
