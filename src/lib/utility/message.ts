import { message } from "antd";

const DEFAULT_DURATION = 3;

type MessageType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

interface IMessageOptions {
  content: string;
  duration?: number;
  key?: string;
}

const showMessage = (
  type: MessageType,
  options: IMessageOptions
) => {
  const {
    content,
    duration = DEFAULT_DURATION,
    key,
  } = options;

  return message[type]({
    content,
    duration,
    key,
  });
};

export const appMessage = {
  success: (
    content: string,
    duration?: number,
    key?: string
  ) =>
    showMessage("success", {
      content,
      duration,
      key,
    }),

  error: (
    content: string,
    duration?: number,
    key?: string
  ) =>
    showMessage("error", {
      content,
      duration,
      key,
    }),

  warning: (
    content: string,
    duration?: number,
    key?: string
  ) =>
    showMessage("warning", {
      content,
      duration,
      key,
    }),

  info: (
    content: string,
    duration?: number,
    key?: string
  ) =>
    showMessage("info", {
      content,
      duration,
      key,
    }),

  loading: (
    content: string,
    duration = 0,
    key?: string
  ) =>
    showMessage("loading", {
      content,
      duration,
      key,
    }),

  destroy: (key?: string) => {
    if (key) {
      message.destroy(key);
      return;
    }

    message.destroy();
  },
};