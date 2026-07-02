// _app.tsx

import { App as AntdApp, ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { antdTheme } from "@/lib/utility/theme";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import "react-quill-new/dist/quill.snow.css";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        <AntdApp>
          <Component {...pageProps} />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
}