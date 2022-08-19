import React from "react";
// next
import Document, { Html, Head, Main, NextScript } from "next/document";
// emotion
import createEmotionServer from "@emotion/server/create-instance";
// utils
import createEmotionCache from "../src/utils/createEmotionCache";
// theme
import palette from "../src/theme/palette";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="ru">
				<Head>
					<meta name="theme-color" content={palette.primary.main} />
					<link rel="shortcut icon" href="/favicon/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicon/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon/favicon-16x16.png"
					/>

					<link rel="manifest" href="/manifest.json" />

					<link rel="preconnect" href="https://fonts.googleapis.com" />

					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>

					<link
						href="https://fonts.googleapis.com/css2?family=Jost:wght@100;300;400;500;600;700&family=Syncopate:wght@400;700&display=swap"
						rel="stylesheet"
					/>

					<link
						href="https://fonts.googleapis.com/css2?family=Alegreya:wght@100;300;400;500;600;700&family=Syncopate:wght@400;700&display=swap"
						rel="stylesheet"
					/>

					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>

					{/*<-- Global site tag (gtag.js) - Google Analytics -->*/}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.google_analytics}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.google_analytics}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>

					{/*<-- Yandex.Metrika counter -->*/}
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `
							(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
							m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
							(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
					 
							ym(86384257, "init", {
									 clickmap:true,
									 trackLinks:true,
									 accurateTrackBounce:true
							});
							`,
						}}
					/>
				</Head>
				<body>
					<noscript>
						<div>
							<img
								src="https://mc.yandex.ru/watch/86384257"
								style={{ position: "absolute", left: "-9999px" }}
								alt=""
							/>
						</div>
					</noscript>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const originalRenderPage = ctx.renderPage;

	const cache = createEmotionCache();

	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
		});

	const initialProps = await Document.getInitialProps(ctx);

	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			...emotionStyleTags,
		],
	};
};

export default MyDocument;
