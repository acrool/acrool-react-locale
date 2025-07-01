import {act, renderHook, waitFor} from '@testing-library/react';

import type {TLocaleDictionariesAsync} from '../types';
import useMessagesAsync from './useMessagesAsync';

const localeDictionaries: TLocaleDictionariesAsync = {
    'zh-TW': async () => ({
        common: {
            hello: '你好',
            bye: '再見',
        },
        page: {
            title: '標題',
        },
    }),
    'en-US': async () => ({
        common: {
            hello: 'Hello',
            bye: 'Bye',
        },
        page: {
            title: 'Title',
        },
    }),
};

describe('useMessagesAsync', () => {
    it('初始化時能正確取得 messages', async () => {
        const {result} = renderHook(() =>
            useMessagesAsync({
                locale: 'zh-TW',
                defaultLocale: 'en-US',
                localeDictionaries,
            })
        );
        await waitFor(() => {
            expect(result.current.messages).toBeDefined();
        });
        expect(result.current.messages!.hello).toBe('你好');
        expect(result.current.messages!.bye).toBe('再見');
        expect(result.current.messages!.title).toBe('標題');
    });

    it('切換語系後 messages 會更新', async () => {
        const {result} = renderHook(() =>
            useMessagesAsync({
                locale: 'zh-TW',
                defaultLocale: 'en-US',
                localeDictionaries,
            })
        );
        await waitFor(() => {
            expect(result.current.messages).toBeDefined();
        });
        await act(async () => {
            await result.current.setMessages('en-US');
        });
        await waitFor(() => {
            expect(result.current.messages).toBeDefined();
            expect(result.current.messages!.hello).toBe('Hello');
        });
        expect(result.current.messages!.bye).toBe('Bye');
        expect(result.current.messages!.title).toBe('Title');
    });

    it('找不到 locale 時 fallback 到 defaultLocale', async () => {
        const {result} = renderHook(() =>
            useMessagesAsync({
                locale: 'fr-FR',
                defaultLocale: 'en-US',
                localeDictionaries,
            })
        );
        await waitFor(() => {
            expect(result.current.messages).toBeDefined();
        });
        expect(result.current.messages!.hello).toBe('Hello');
        expect(result.current.messages!.bye).toBe('Bye');
        expect(result.current.messages!.title).toBe('Title');
    });

    it('找不到 locale 及 defaultLocale 時 messages 為空', async () => {
        const {result} = renderHook(() =>
            useMessagesAsync({
                locale: 'fr-FR',
                defaultLocale: 'ja-JP',
                localeDictionaries,
            })
        );
        await waitFor(() => {
            expect(result.current.messages).toBeDefined();
        });
        expect(result.current.messages).toEqual({});
    });
}); 
