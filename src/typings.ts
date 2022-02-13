import {MouseEvent, ReactNode} from 'react';
import CSS from 'csstype';
import {ThemeProps} from 'styled-components/macro';
import {themeName} from './config';


export interface FCChildrenProps {
    style?: CSS.Properties,
    className?: string,
    forwardAs?: 'div'|'section'|'ul'|'li'|'a'|'p';
    forwardRef?: any;
    id?: string| number;
    key?: string| number;
    children?: ReactNode,
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export enum EMediaSize {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
    xxl = 'xxl'
}

export interface IBreakpoints {
    [EMediaSize.xs]: number
    [EMediaSize.sm]: number
    [EMediaSize.md]: number
    [EMediaSize.lg]: number
    [EMediaSize.xl]: number
    [EMediaSize.xxl]: number
}
export type NoXsMediaSize = Exclude<EMediaSize, EMediaSize.xs>
export type TContainerMaxWidths = Omit<IBreakpoints, EMediaSize.xs>
export type TGridGutterWidthMedia = Omit<IBreakpoints, EMediaSize.xs>

export type TThemeProps = ThemeProps<{[themeName]: IGridSetting}>;
export type TStyledProps<P> = TThemeProps & P;


export interface IGridSetting {
    gridGutterWidth: number
    gridColumns: number
    gridBreakpoints: IBreakpoints
    containerMaxWidths: TContainerMaxWidths
    gridGutterWidthMedia: Partial<TGridGutterWidthMedia>
}
