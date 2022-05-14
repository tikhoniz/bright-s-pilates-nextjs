import React, { useEffect } from "react";
import { SWRConfig } from "swr";
// next
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import { NoSsr } from "@mui/base";
// i18n
import "../src/locales/i18n";
//theme
import ThemeConfig from "../src/theme";
import GlobalStyles from "../src/theme/globalStyles";
// scroll bar
import "simplebar/src/simplebar.css";
// utils
import { fetcher } from "../src/utils/fetcher";
import createEmotionCache from "../src/utils/createEmotionCache";
// components
import MainLayout from "../src/layouts/MainLayout";
import NotistackProvider from "../src/components/NotistackProvider";
import ThemeLocalization from "../src/components/ThemeLocalization";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}) {
	//useEffect(() => {
	//	// Remove the server-side injected CSS.
	//	const jssStyles = document.querySelector("#jss-server-side");

	//	if (jssStyles) {
	//		jssStyles.parentElement.removeChild(jssStyles);
	//	}
	//}, []);

	//здесь получаем не только компоненты которые нужно отобразить но и
	// пропсы созданные функциями getStaticProps и getServerSideProps

	//оборачиваем в провайдер и передаем сессию что бы избежать дополнительный запросов
	//от компонентов которые проверяюи залогинен ли пользователь
	// это делается для оптимизации

	//! refetchInterval={5 * 60} разобраться
	return (
		<SessionProvider
			session={pageProps.session}
			// Re-fetch session every 5 minutes
			//refetchInterval={20 * 60}
			// Re-fetches session when window is focused
			//refetchOnWindowFocus={true}
		>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				</Head>
				<SWRConfig
					value={{
						revalidateIfStale: false,
						revalidateOnFocus: false,
						//revalidateOnReconnect: true,
						fetcher: fetcher,
					}}
				>
					{/* В ThemeConfig передается тема приложения, CssBaseline */}
					<ThemeConfig>
						{/* Локализация */}
						<ThemeLocalization>
							<NotistackProvider>
								<NoSsr></NoSsr>
								<GlobalStyles />
								<MainLayout>
									<Component {...pageProps} />
								</MainLayout>
							</NotistackProvider>
						</ThemeLocalization>
					</ThemeConfig>
				</SWRConfig>
			</CacheProvider>
		</SessionProvider>
	);
}

export default MyApp;
