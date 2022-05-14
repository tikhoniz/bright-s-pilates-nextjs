// material
import { Stack, TableRow, TableCell, Typography } from "@mui/material";
import MAvatar from "../../@material-extend/MAvatar";
// utils
import { dayMonthYearDate, humanReadableTime } from "../../../utils/time";
import createAvatarsImageUrl from "../../../utils/createAvatarsImageUrl";

export default function UserRow({ user, orders }) {
	const {
		_id: userId,
		name,
		city,
		email,
		image,
		about,
		groups,
		country,
		lastName,
		lastLogin,
		personals,
		createdAt,
		phoneNumber,
	} = user;

	const orderList = orders.filter((order) => userId === order.userId);

	const url = createAvatarsImageUrl(image?.url);

	return (
		<TableRow>
			<TableCell>
				<time dateTime={createdAt}>{dayMonthYearDate(createdAt, "ru-RU")}</time>
			</TableCell>

			<TableCell>
				<Stack>
					<time dateTime={lastLogin}>
						{dayMonthYearDate(lastLogin, "ru-RU")}
					</time>
					<time dateTime={lastLogin}>
						{humanReadableTime(lastLogin, "ru-RU")}
					</time>
				</Stack>
			</TableCell>

			<TableCell align="center">
				<Stack direction="row" spacing={2}>
					<MAvatar alt={name} src={url} />
					<Stack direction="column" spacing={1}>
						<Stack direction="row" spacing={1}>
							<Typography variant="subtitle2">{name}</Typography>
							<Typography variant="subtitle2">{lastName}</Typography>
						</Stack>
						{email}
					</Stack>
				</Stack>
			</TableCell>
			<TableCell>{phoneNumber || "не указан"}</TableCell>
			<TableCell align="center">{groups}</TableCell>
			<TableCell align="center">{personals}</TableCell>
			<TableCell align="center">{orderList.length}</TableCell>
			<TableCell>{country || "не указана"}</TableCell>
			<TableCell>{city || "не указан"}</TableCell>
			<TableCell>{about || "нет информации"}</TableCell>
		</TableRow>
	);
}

//about: ""
//city: ""
//country: ""
//cover: "/covers/starry_sky-cover.png"
//createdAt: "2021-11-01T15:12:19.803Z"
//email: "fisioterapevt@gmail.com"
//groups: 0
//image: {url: '618003d374b5c20424ecba41-avatar.jpg', id: 'T92yzXW9'}
//lastName: ""
//name: "WebDev"
//password: "$2a$12$63V0X9qBSf52rjNtLIdxROlxpd/CVNApYhKRrJsJKUkJ0oDlKgMB6"
//personals: 0
//phoneNumber: ""
//resetToken: "f26e88c540951e73f8169115ce655635e2fcfc33ecf77c11eb22385ca88ae609"
//resetTokenExp: 1636148573250
//updatedAt: "2021-11-03T21:12:09.784Z"
//_id: "618003d374b5c20424ecba41"
