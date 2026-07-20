// _app.tsx

import { antdTheme } from "@/lib/utility/theme";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { App as AntdApp, ConfigProvider } from "antd";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "react-quill-new/dist/quill.snow.css";
import { Provider } from "react-redux";

type AppPropsWithSession = AppProps<{
  session: Session | null;
}>;


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ConfigProvider theme={antdTheme}>
          <AntdApp>
            <Component {...pageProps} />
          </AntdApp>
        </ConfigProvider>
      </Provider>
    </SessionProvider>
  );
}