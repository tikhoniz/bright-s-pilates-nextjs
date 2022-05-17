// next
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
//
import { v4 as uuidv4 } from "uuid";
// helpers
import { verifyPassword } from "../../../src/helpers/auth";
import { createUser } from "../../../src/helpers/api/api-users";

//import { saveLastUserLogin } from "../../../src/helpers/api/api-users";
//
const sendgridMail = require("@sendgrid/mail");

export default NextAuth({
	session: { jwt: true },
	secret: process.env.NEXTAUTH_SECRET, //! разобраться
	jwt: {
		encryption: true,
		secret: process.env.NEXTAUTH_SECRET,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const res = await fetch(
					`${process.env.localhost}/api/users/${credentials.email}`,
					{
						method: "GET",
					}
				);

				const user = await res.json();

				if (res.ok && user) {
					const isValid = await verifyPassword(
						credentials.password,
						user.password
					);

					if (!isValid) {
						throw new Error("Неверный пароль!");
					}

					return user;
				}

				throw new Error("Не удалось найти аккаунт!");
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],

	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === "credentials") return true;
			if (!user?.email) return false;

			const response = await fetch(
				`${process.env.localhost}/api/users/${user?.email}`,
				{
					method: "GET",
				}
			);

			if (!response.ok) {
				const result = await createUser({
					name: user?.name,
					lastName: "",
					email: user?.email,
					image: { url: user?.image, id: null },
					password: uuidv4(),
					regType: account?.provider,
				});
				if (!result.ok) {
					return false;
				}
			}
			return true;
		},
	},

	pages: {
		error: "/auth/error", // Error code passed in query string as ?error=
	},
});

//******************* Signup FACEBOOK */

//user {
//  id: '5750676914962365',
//  name: 'Tikhon Bright',
//  email: 'fisioterapevt@gmail.com',
//  image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5750676914962365&height=50&width=50&ext=1655303638&hash=AeQLG1KJM0Lg7cd9uBQ'
//}
//account {
//  provider: 'facebook',
//  type: 'oauth',
//  providerAccountId: '5750676914962365',
//  access_token: 'EAAGBW75c7QsBAFTN9ftDl3SPhAyoYqz6S8V7YvtqIhrJZA4o6H4GSuKc6J5FPCxAR0jZAYCjGhF0AHyWDVIRPH9JHJzH5OnfztI2HpqX2CXfZBVUnlC6Lh7NWboXKhPSJyp5UzhJfRYZAA9FoMBwtIUmSS3eihrP9ZBWHVzsQQNPLRyneu3FMXbaNAZCtoCPSbnIwbPDhaBoNgZCzAV4hTt3OcZCOOfWYQBy4RRAYZAb38AZDZD',
//  token_type: 'bearer',
//  expires_at: 1657895129
//}
//profile {
//  id: '5750676914962365',
//  name: 'Tikhon Bright',
//  email: 'fisioterapevt@gmail.com',
//  picture: {
//    data: {
//      height: 50,
//      is_silhouette: false,
//      url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5750676914962365&height=50&width=50&ext=1655303638&hash=AeQLG1KJM0Lg7cd9uBQ',
//      width: 50
//    }
//  }
//}

//******************* Signup GOOGLE */
//user {
//  id: '105265248477672589908',
//  name: 'Tikhon Bright',
//  email: 'fisioterapevt@gmail.com',
//  image: 'https://lh3.googleusercontent.com/a-/AOh14Gj_Co42EPa0KV1iqmtDxYV_Yz0M5pIAzHQU-mWBXRQ=s96-c'
//}
//account {
//  provider: 'google',
//  type: 'oauth',
//  providerAccountId: '105265248477672589908',
//  access_token: 'ya29.a0ARrdaM9-bNgDcqMrufRMROiG294y0ZgL92QWs2DzQhVG9AaI3tUCQNSjqECH0qOZ42tiNBdOnKmliJ-CqhgptJkk7tHf3U3gy4nKZCxKkSqZnTHDf2w-RURtM3NaZcoWwcEjfCZ3PPuSXEcvQ0-XxNklyhl1',
//  expires_at: 1652715445,
//  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
//  token_type: 'Bearer',
//  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIxYTgyNTllYjA3NjYwZWYyMzc4MWM4NWI3ODQ5YmZhMGExYzgwNmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNDUzMjUxNjk2MDAtNmlkcXBjOGJscjhiZnRrZWhmMzdsM2I2Z3J2OGhvcDcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNDUzMjUxNjk2MDAtNmlkcXBjOGJscjhiZnRrZWhmMzdsM2I2Z3J2OGhvcDcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUyNjUyNDg0Nzc2NzI1ODk5MDgiLCJlbWFpbCI6ImZpc2lvdGVyYXBldnRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJwRkxZcTNnOWhPQkRJc295Mzh1SDhnIiwibmFtZSI6IlRpa2hvbiBCcmlnaHQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pfQ280MkVQYTBLVjFpcW10RHhZVl9ZejBNNXBJQXpIUVUtbVdCWFJRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlRpa2hvbiIsImZhbWlseV9uYW1lIjoiQnJpZ2h0IiwibG9jYWxlIjoicnUiLCJpYXQiOjE2NTI3MTE4NDYsImV4cCI6MTY1MjcxNTQ0Nn0.TODlPS06FfHgbz3sgU_sZaDdV5XZdc0nVH15LWtVWhFlXSmaK-4TZ0wkpAgYAHZy28OXnVM3JR03hkosyBtXM8OeS8cEAE9BT95PP3UBwdaTAi1zHZlIlQqEANC4MHpulFLCGxuTYmG66kB9QKV8aI2vFp33FmBC3G-qrfAwtQZk9ZA_jxXOaapi_AcNULd9kW-CsXZupE-frkGHWnjXNLgSvPsvM-IAQc-wjCtCyUbNB3RngwObbph9ECGzS_H4DgBhFyDodVcrhA7frRrgrA-GVdcB9anXLVFDmnu8TsYIMVlJBunqVDsjdniSrdM6sHDegVHEw3t0Cbp8nlFonQ'
//}
//profile {
//  iss: 'https://accounts.google.com',
//  azp: '245325169600-6idqpc8blr8bftkehf37l3b6grv8hop7.apps.googleusercontent.com',
//  aud: '245325169600-6idqpc8blr8bftkehf37l3b6grv8hop7.apps.googleusercontent.com',
//  sub: '105265248477672589908',
//  email: 'fisioterapevt@gmail.com',
//  email_verified: true,
//  at_hash: 'pFLYq3g9hOBDIsoy38uH8g',
//  name: 'Tikhon Bright',
//  picture: 'https://lh3.googleusercontent.com/a-/AOh14Gj_Co42EPa0KV1iqmtDxYV_Yz0M5pIAzHQU-mWBXRQ=s96-c',
//  given_name: 'Tikhon',
//  family_name: 'Bright',
//  locale: 'ru',
//  iat: 1652711846,
//  exp: 1652715446
//}
