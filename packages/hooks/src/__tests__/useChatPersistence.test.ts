import { renderHook, act } from '@testing-library/react-hooks';
import { useChatPersistence } from '../useChatPersistence';

describe('useChatPersistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty chats', () => {
    const { result } = renderHook(() => useChatPersistence('test-channel'));

    expect(result.current.chats).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('should initialize with initial chats', () => {
    const initialChats = [
      { id: '1', message: 'Hello', createdAt: new Date(), updatedAt: new Date() },
    ];

    const { result } = renderHook(() =>
      useChatPersistence('test-channel', initialChats)
    );

    expect(result.current.chats).toEqual(initialChats);
  });

  it('should add a new chat', () => {
    const { result } = renderHook(() => useChatPersistence('test-channel'));

    act(() => {
      result.current.addChat({
        id: '1',
        message: 'Test message',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    expect(result.current.chats).toHaveLength(1);
    expect(result.current.chats[0].message).toBe('Test message');
  });

  it('should clear all chats', () => {
    const { result } = renderHook(() => useChatPersistence('test-channel'));

    act(() => {
      result.current.addChat({
        id: '1',
        message: 'Test message',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    expect(result.current.chats).toHaveLength(1);

    act(() => {
      result.current.clearChats();
    });

    expect(result.current.chats).toHaveLength(0);
  });

  it('should persist chats to localStorage', () => {
    const { result } = renderHook(() => useChatPersistence('test-channel'));

    act(() => {
      result.current.addChat({
        id: '1',
        message: 'Test message',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    const stored = localStorage.getItem('yyc3_chat_history_test-channel');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toHaveLength(1);
  });

  it('should load chats from localStorage on mount', () => {
    const existingChats = [
      {
        id: '1',
        message: 'Existing message',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem(
      'yyc3_chat_history_test-channel',
      JSON.stringify(existingChats)
    );

    const { result } = renderHook(() => useChatPersistence('test-channel'));

    expect(result.current.chats).toHaveLength(1);
    expect(result.current.chats[0].message).toBe('Existing message');
  });

  it('should use main storage key for main channel', () => {
    const { result } = renderHook(() => useChatPersistence('main'));

    act(() => {
      result.current.addChat({
        id: '1',
        message: 'Test message',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    const stored = localStorage.getItem('yyc3_chat_history');
    expect(stored).toBeTruthy();
  });
});
