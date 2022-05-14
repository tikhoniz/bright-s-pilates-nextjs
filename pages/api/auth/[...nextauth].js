// next
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// helpers
import { connectDatabase } from "../../../src/helpers/db";
import { verifyPassword } from "../../../src/helpers/auth";
import { saveLastUserLogin } from "../../../src/helpers/api/api-users";

export default NextAuth({
	session: { jwt: true },
	jwt: {
		encryption: true,
		secret: process.env.NEXTAUTH_SECRET,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// подключаемся к базе
				const client = await connectDatabase();
				// получаем всех юзеров
				const usersCollection = client.db().collection("users");
				// ищем в базе юзера
				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				// если юзер не найден
				if (!user) {
					await client.close();
					throw new Error("Не удалось найти аккаунт!");
				}

				//если найден проверяем пароль введеный и пароль юзера в базе
				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				//если пароли не совпадают
				if (!isValid) {
					await client.close();
					throw new Error("Неверный пароль!");
				}

				await saveLastUserLogin(user._id);

				await client.close();
				//если совпадают
				return {
					name: user.name,
					email: user.email,
					image: user.image,
				};
			},
		}),
		//Providers.Google({
		//clientId: process.env.GOOGLE_CLIENT_ID "245325169600-6idqpc8blr8bftkehf37l3b6grv8hop7.apps.googleusercontent.com",
		//clientId:
		//	"245325169600-6idqpc8blr8bftkehf37l3b6grv8hop7.apps.googleusercontent.com",
		//clientSecret: "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",
		//clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		//}),
	],
	//debug: true,
	//pages: {
	//	signIn: "/auth/signup",
	//},
	//secret: "Nxo8Fuivw2iGFNJZLKpKi/di0nHb05RGWpW7LVlBPQo=",
	database: `mongodb://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOSTNAME}:${process.env.mongodb_port}/${process.env.MONGO_DB_BASE_NAME}?authSource=admin`,
	callbacks: {
		//session: async (session, user) => {
		//	//console.log("session", session);
		//	session.id = user.id;
		//	return Promise.resolve(session);
		//},
	},

	//callback: {
	//	async jwt(token, account) {
	//		if (account?.accessToken) {
	//			token.accessToken = account.accessToken;
	//		}
	//		return token;
	//	},
	//	redirect: async (url, _baseUrl) => {
	//		return Promise.resolve("/");
	//	},
	//	//signIn(user, account, profile) {
	//	//	console.log("user", user);
	//	//	console.log("account", account);
	//	//	console.log("profile", profile);
	//	//	//user.name = slug(user.email.slice(0, user.email.indexOf('@'))) // or whatever else
	//	//	return true;
	//	//},
	//},
});
