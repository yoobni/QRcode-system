import React, { useMemo } from "react";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import GlobalStyles from "@lib/style/GlobalStyles";

const App = ({ Component, router, pageProps }: AppProps<{ user?: { id: number } | null; os?: string }>) => {
    const user = useMemo(() => pageProps.user, []);

    console.log("App", pageProps);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
                <title>test</title>
            </Head>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const { req, res } = ctx;

    // Only backend level
    if (!req || !res) {
        return {
            pageProps: {
                ...pageProps,
            },
        };
    }

    const os = req?.headers.os; // TODO: cookie에서 한번 더 가져와야함

    try {
    } catch (error) {
        // pass
        console.error(error); // FIXME: 디버깅용 로그 삭제필요
    }

    return {
        pageProps,
    };
};

export default App;
