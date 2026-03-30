import { useState, useEffect, useCallback } from 'react';
import { AIConfig } from './types/storage';
import type { AIMessage, AIStreamChunk } from './types/ai';
import { toast } from 'sonner';

const STORAGE_KEY = 'yyc3_ai_config';
const CURRENT_VERSION = 1;

const DEFAULT_CONFIG: AIConfig = {
  provider: 'ollama',
  apiKey: 'ollama',
  baseUrl: 'http://localhost:11434/v1',
  model: 'llama3',
  temperature: 0.7,
  version: CURRENT_VERSION,
};

// Simulation responses for preview environment
const _SIMULATION_RESPONSES = [
  'ANALYZING SYSTEM ARCHITECTURE... [OK]',
  'OPTIMIZING DATABASE QUERIES... [COMPLETED]',
  'DETECTING NETWORK ANOMALIES... [NONE FOUND]',
  'EXECUTING NEURAL HANDSHAKE WITH CLOUD NODE...',
  'LOCAL MODEL UNREACHABLE. ENTERING SIMULATION MODE.\n\nI am the fallback system. Your local Ollama instance appears to be offline or unreachable from this environment. Ensure `ollama serve` is running and CORS is configured.',
];

export const useAI = () => {
  const [config, setConfig] = useState<AIConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);

  // Load Config
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Migration
        if (parsed.version !== CURRENT_VERSION) {
          const migrated = { ...DEFAULT_CONFIG, ...parsed, version: CURRENT_VERSION };
          setConfig(migrated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        } else {
          setConfig(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load AI config:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save Config Helper
  const saveConfig = useCallback((newConfig: AIConfig) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setConfig(newConfig);
    } catch (e) {
      console.error('Failed to save AI config', e);
    }
  }, []);

  // Chat Function
  const chat = async (messages: AIMessage[], onChunk: (chunk: string) => void) => {
    setIsStreaming(true);

    const currentConfig = config;

    try {
      // Create an AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for local check

      try {
        const response = await fetch(`${currentConfig.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentConfig.apiKey}`,
          },
          body: JSON.stringify({
            model: currentConfig.model,
            messages: messages,
            temperature: currentConfig.temperature,
            stream: true,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`AI API Error: ${response.statusText}`);
        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = (buffer + chunk).split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data: ')) {
              const dataStr = trimmed.slice(6);
              if (dataStr === '[DONE]') continue;

              try {
                const data = JSON.parse(dataStr);
                const content = data.choices?.[0]?.delta?.content || '';
                if (content) onChunk(content);
              } catch (e) {
                console.error('Error parsing stream chunk', e);
              }
            }
          }
        }
      } catch (networkError: any) {
        // Fallback to simulation if network fails (likely due to preview env not reaching localhost)
        console.warn('Network error or timeout, switching to simulation:', networkError);

        let simText = '';
        const fallbackMessage =
          'Local inference node unreachable. Simulating intelligent response based on protocols...\n\n' +
          `Executing command: ${messages[messages.length - 1].content.slice(0, 20)}...\n` +
          'Analysis: Request valid.\nOutput: This is a simulated response because the local LLM is not accessible from this cloud preview environment. In your local deployment, this would be the Llama3 output.';

        const chunks = fallbackMessage.split(' ');
        for (const chunk of chunks) {
          await new Promise((r) => setTimeout(r, 50)); // Simulate typing
          simText += chunk + ' ';
          onChunk(chunk + ' ');
        }
      }
    } catch (error: any) {
      toast.error(`AI_CORE_FAILURE: ${error.message}`);
      onChunk(`\n[SYSTEM_ERROR]: ${error.message}\n`);
    } finally {
      setIsStreaming(false);
    }
  };

  return { chat, isStreaming, config, saveConfig, loading };
};
