export function useAI() {
  return {
    messages: [],
    sendMessage: async (_message: string) => {},
    isLoading: false,
    error: null,
    chat: {
      messages: [],
      addMessage: async (_msg: any) => {},
      clearMessages: () => {},
    },
  };
}
