'use client';

import { App } from 'antd';

let messageApi: ReturnType<typeof App.useApp>['message'];

export const getMessageApi = () => messageApi;

export default function AppMessageProvider() {
  const { message } = App.useApp();

  messageApi = message;

  return null;
}