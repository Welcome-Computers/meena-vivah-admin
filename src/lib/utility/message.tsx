import { getMessageApi } from './AppMessageProvider';

const DEFAULT_DURATION = 3;

export type MessageType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading';

interface MessageOptions {
  content: string;
  duration?: number;
  key?: string;
}

const showMessage = (
  type: MessageType,
  { content, duration = DEFAULT_DURATION, key }: MessageOptions
) => {
  const message = getMessageApi();

  if (!message) {
    console.warn('Message API is not initialized.');
    return;
  }

  return message[type]({
    content,
    duration,
    key,
  });
};

export const appMessage = {
  success: (content: string, duration?: number, key?: string) =>
    showMessage('success', { content, duration, key }),

  error: (content: string, duration?: number, key?: string) =>
    showMessage('error', { content, duration, key }),

  warning: (content: string, duration?: number, key?: string) =>
    showMessage('warning', { content, duration, key }),

  info: (content: string, duration?: number, key?: string) =>
    showMessage('info', { content, duration, key }),

  loading: (content: string, duration = 0, key?: string) =>
    showMessage('loading', { content, duration, key }),

  destroy: (key?: string) => {
    const message = getMessageApi();

    if (!message) return;

    key ? message.destroy(key) : message.destroy();
  },
};