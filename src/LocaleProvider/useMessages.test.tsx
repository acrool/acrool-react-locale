import {act,renderHook} from '@testing-library/react';

import type {TLocaleDictionaries} from '../types';
import useMessages from './useMessages';

const localeDictionaries: TLocaleDictionaries = {
    'zh-TW': {
        common: {
            hello: '你好',
            bye: '再見',
        },
        page: {
            title: '標題',
        },
    },
    'en-US': {
        common: {
            hello: 'Hello',
            bye: 'Bye',
        },
        page: {
            title: 'Title',
        },
    },
};

describe('useMessages', () => {
    it('初始化時能正確取得 messages', () => {
        const {result} = renderHook(() =>
            useMessages({
                locale: 'zh-TW',
                defaultLocale: 'en-US',
                localeDictionaries,
            })
        );
        expect(result.current.messages.hello).toBe('你好');
        expect(result.current.messages.bye).toBe('再見');
        expect(result.current.messages.title).toBe('標題');
    });

    it('切換語系後 messages 會更新', () => {
        const {result} = renderHook(() =>
            useMessages({
                locale: 'zh-TW',
                defaultLocale: 'en-US',
                localeDictionaries,
            })
        );
        act(() => {
            result.current.setMessages('en-US');
        });
        expect(result.current.messages.hello).toBe('Hello');
        expect(result.current.messages.bye).toBe('Bye');
        expect(result.current.messages.title).toBe('Title');
    });

    it('找不到 locale 時 fallback 到 defaultLocale', () => {
        const {result} = renderHook(() =>
            useMessages({
                locale: 'fr-FR',
                defaultLocale: 'en-US',
                localeDictionaries,
            })
        );
        expect(result.current.messages.hello).toBe('Hello');
        expect(result.current.messages.bye).toBe('Bye');
        expect(result.current.messages.title).toBe('Title');
    });

    it('找不到 locale 及 defaultLocale 時 messages 為空', () => {
        const {result} = renderHook(() =>
            useMessages({
                locale: 'fr-FR',
                defaultLocale: 'ja-JP',
                localeDictionaries,
            })
        );
        expect(result.current.messages).toEqual({});
    });
}); 
