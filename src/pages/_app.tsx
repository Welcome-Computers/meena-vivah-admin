import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { antdTheme } from "@/lib/utility/theme";
import { store } from "@/redux/store";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}