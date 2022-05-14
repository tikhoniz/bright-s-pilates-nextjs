const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			env: {
				mongodb_port: "27017",
				admin: process.env.ADMIN,
				dev: process.env.DEV,
				localhost: process.env.NEXTAUTH_URL,
				avatars_folder: "https://media.publit.io/file/userAvatars/",
				video_folder: "https://media.publit.io/file/h_480/statics/",
				poster_folder: "https://media.publit.io/file/w_1280/statics/",
				info_email_from: "info@brightspilates.com", //4d + d3
				no_replay_email_from: "info@brightspilates.com",

				paypal_client_id: process.env.PAYPAL_CLIENT_ID,
				delay_signup_online_class: "5",
				delay_cancel_online_class: "60",
				delay_join_online_class: "5",
				delay_to_remove_from_schedule: "5",
				delay_to_remove_from_profile: "15",
				//zoom
				zoom_api_key: process.env.ZOOM_API_KEY,
				zoom_api_secret: process.env.ZOOM_API_SECRET,
				zoom_meeting_number: process.env.ZOOM_MEETING_NUMBER,
				zoom_meeting_password: process.env.ZOOM_MEETING_PASSWORD,
				zoom_invitation_link: process.env.ZOOM_INVITATION_LINK,
				zoom_google_token: process.env.ZOOM_GOOGLE_TOKEN,
				//recaptcha
				recaptcha_secret: process.env.RECAPTCHA_SECRET,
				//publitio
				publitio_api_key: process.env.PUBLITIO_API_KEY,
				publitio_secret_key: process.env.PUBLITIO_SECRET_KEY,
				publitio_avatars_folder:
					"https://media.publit.io/file/w_450/userAvatars/",
				//google
				google_analytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
				//social
				whats_app_phone: "48575045988",
				instagram: "brightspilates",
				facebook: "brightspilates",
				linkedin: "bright-s-pilates-studio",
			},
			webpack: function (config) {
				config.module.rules.push({
					test: /\.svg$/,
					use: ["@svgr/webpack"],
				});
				return config;
			},

			//https://nextjs.org/docs/basic-features/image-optimization#domains
			//Чтобы включить оптимизацию изображений для изображений, размещенных на внешнем веб-сайте, используйте абсолютный URL-адрес для Image src и укажите, какие домены разрешены для оптимизации.
			images: {
				domains: ["media.publit.io"],
			},
			// ставит слеш в конце адреса
			trailingSlash: true,
			//i18n: {
			// These are all the locales you want to support in
			// your application
			//locales: ["ru", "en"],
			// This is the default locale you want to be used when visiting
			// a non-locale prefixed path e.g. `/hello`
			//	defaultLocale: "ru",
			//},

			i18n: {
				defaultLocale: "ru",
				locales: ["ru", "en", "de", "fr"],
			},
			react: { useSuspense: false }, //this line
		};
	}

	return {
		env: {
			mongodb_port: "27017",
			admin: process.env.ADMIN,
			dev: process.env.DEV,
			localhost: process.env.NEXTAUTH_URL,
			video_folder: "https://media.publit.io/file/h_480/statics/",
			poster_folder: "https://media.publit.io/file/w_1280/statics/",
			sendgrid_api_key: process.env.SENDGRID_API_KEY,
			info_email_from: "info@brightspilates.com",
			no_replay_email_from: "brightspilates.noreplay@gmail.com",
			paypal_client_id: process.env.PAYPAL_CLIENT_ID,
			delay_signup_online_class: "5",
			delay_cancel_online_class: "60",
			delay_join_online_class: "5",
			delay_to_remove_from_schedule: "5",
			delay_to_remove_from_profile: "15",
			//zoom
			zoom_api_key: process.env.ZOOM_API_KEY,
			zoom_api_secret: process.env.ZOOM_API_SECRET,
			zoom_meeting_number: process.env.ZOOM_MEETING_NUMBER,
			zoom_meeting_password: process.env.ZOOM_MEETING_PASSWORD,
			zoom_invitation_link: process.env.ZOOM_INVITATION_LINK,
			zoom_google_token: process.env.ZOOM_GOOGLE_TOKEN,
			recaptcha_secret: process.env.RECAPTCHA_SECRET,
			//publitio
			publitio_api_key: process.env.PUBLITIO_API_KEY,
			publitio_secret_key: process.env.PUBLITIO_SECRET_KEY,
			publitio_avatars_folder:
				"https://media.publit.io/file/w_450/userAvatars/",
			//google
			google_analytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
			//social
			whats_app_phone: "+48575045988",
			instagram: "brightspilates",
			facebook: "brightspilates",
			linkedin: "bright-s-pilates-studio",
		},
		webpack: function (config) {
			config.module.rules.push({
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			});
			return config;
		},
		//https://nextjs.org/docs/basic-features/image-optimization#domains
		//Чтобы включить оптимизацию изображений для изображений, размещенных на внешнем веб-сайте, используйте абсолютный URL-адрес для Image src и укажите, какие домены разрешены для оптимизации.
		images: {
			domains: ["media.publit.io"],
		},
		// ставит слеш в конце адреса
		trailingSlash: true,

		//i18n: {
		// These are all the locales you want to support in
		// your application
		//	locales: ["ru", "en"],
		// This is the default locale you want to be used when visiting
		// a non-locale prefixed path e.g. `/hello`
		//	defaultLocale: "ru",
		//},
	};
};
