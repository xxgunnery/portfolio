import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    return (
    <Html>
        <Head>
            <meta charSet="utf-8" />
            <link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet'/>
            <meta name="theme-color" content="#000000" />
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>
    )
}
