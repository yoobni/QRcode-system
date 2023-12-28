/* eslint-disable react/no-invalid-html-attribute */
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
    const title = "Urbanstay";

    return (
        <Html lang="ko">
            <Head>
                <meta name="description" content="어반스테이" />
                <meta name="apple-mobile-web-app-title" content={title} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="application-name" content={title} />
                <meta name="msapplication-starturl" content="/" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="browsermode" content="application" />
                <meta name="nightmode" content="disable" />
                <meta name="layoutmode" content="fitscreen/standard" />
                <meta name="imagemode" content="force" />
                <meta name="screen-orientation" content="portrait" />
                <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
                <link
                    rel="preload"
                    as="style"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
                />

                <link rel="stylesheet" type="text/css" href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css' />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
};

export default Document;
