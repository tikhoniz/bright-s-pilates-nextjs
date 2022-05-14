import React, { useState } from "react";
//material
import {
	Tab,
	Box,
	Card,
	Tabs,
	Stack,
	Container,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material";
//components
import Contact from "./Contact";
import UserProfile from "./UserProfile";
import UserHistory from "./UserHistory";
import ProfileCover from "./ProfileCover";
//icons
import { Icon } from "@iconify/react";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
import outlineHistoryEdu from "@iconify/icons-ic/outline-history-edu";
import sharpMailOutline from "@iconify/icons-ic/sharp-mail-outline";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
	zIndex: 9,
	bottom: 0,
	width: "100%",
	display: "flex",
	position: "absolute",
	backgroundColor: theme.palette.background.paper,

	[theme.breakpoints.up("sm")]: {
		justifyContent: "center",
	},
	[theme.breakpoints.up("md")]: {
		justifyContent: "flex-end",
		paddingRight: theme.spacing(3),
	},
}));

// ----------------------------------------------------------------------
const PROFILE_TABS = [
	{
		id: "profile",
		value: "Профиль",
		icon: <Icon icon={roundAccountBox} width={20} height={20} />,
		component: <UserProfile />,
	},
	{
		id: "history",
		value: "История",
		icon: <Icon icon={outlineHistoryEdu} width={20} height={20} />,
		component: <UserHistory />,
	},
	{
		id: "contact-us",
		value: "Задать вопрос",
		icon: <Icon icon={sharpMailOutline} width={20} height={20} />,
		component: <Contact />,
	},
];

const Profile = () => {
	const [currentTab, setCurrentTab] = useState("profile");

	const handleChangeTab = (event, newValue) => {
		setCurrentTab(newValue);
	};

	return (
		<Container maxWidth={"xl"}>
			<Card
				sx={{
					mb: 3,
					height: 280,
					position: "relative",
				}}
			>
				<ProfileCover />

				<TabsWrapperStyle>
					<Tabs
						value={currentTab}
						scrollButtons="auto"
						variant="scrollable"
						allowScrollButtonsMobile
						onChange={handleChangeTab}
					>
						{PROFILE_TABS.map((tab) => (
							<Tab
								disableRipple
								value={tab.id}
								key={tab.value}
								label={
									<Stack direction="row" alignItems="center" spacing={1}>
										{tab.icon}
										<Typography variant="subtitle1">{tab.value}</Typography>
									</Stack>
								}
								aria-label={tab.id}
							/>
						))}
					</Tabs>
				</TabsWrapperStyle>
			</Card>
			{PROFILE_TABS.map((tab) => {
				const isMatched = tab.id === currentTab;
				return isMatched && <Box key={tab.value}>{tab.component}</Box>;
			})}
		</Container>
	);
};

export default Profile;
