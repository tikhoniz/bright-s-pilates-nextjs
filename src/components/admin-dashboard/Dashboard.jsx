import React, { useState } from "react";
// material
import { Tab, Box, Tabs, Stack, Container, Typography } from "@mui/material";
import { styled, useMediaQuery, useTheme } from "@mui/material";
// components
import UsersList from "./users";
import Summary from "./summary";
import MessageList from "./messages";
import GroupClasses from "./classes/GroupClasses";
import VideoList from "./videos";
import NewPost from "./posts";
// icons
import { Icon } from "@iconify/react";
import roundAccountBox from "@iconify/icons-ic/sharp-insert-chart-outlined";
import outlineHistoryEdu from "@iconify/icons-ic/outline-video-camera-front";
import BaselineSelfImprovement from "@iconify/icons-ic/baseline-self-improvement";
import BaselineForwardToInbox from "@iconify/icons-ic/baseline-forward-to-inbox";

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	backgroundColor: theme.palette.background.paper,
	justifyContent: "center",
	[theme.breakpoints.up("sm")]: {
		justifyContent: "flex-start",
	},
	[theme.breakpoints.up("md")]: {
		padding: theme.spacing(3),
		paddingLeft: theme.spacing(10),
	},
}));

const TabStyle = styled(Tab)(({ theme }) => ({
	"&": {
		marginRight: "1px !important",
		minWidth: "60px",
	},
	[theme.breakpoints.up("sm")]: {
		marginRight: "20px !important",
	},
	[theme.breakpoints.up("md")]: {
		marginRight: "40px !important",
	},
}));
//---------------------------------------------------------------------

const Dashboard = () => {
	const theme = useTheme();
	const [currentTab, setCurrentTab] = useState("summary");

	const handleChangeTab = (event, newValue) => {
		setCurrentTab(newValue);
	};

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const DASHBOARD_TABS = [
		{
			id: "summary",
			value: "Сводка",
			icon: <Icon icon={roundAccountBox} width={20} height={20} />,
			component: <Summary />,
		},
		{
			id: "groups",
			value: "Групповые классы",
			icon: <Icon icon={outlineHistoryEdu} width={20} height={20} />,
			component: <GroupClasses />,
		},
		//{
		//	id: "workouts",
		//	value: "Видео тренировки",
		//	icon: <Icon icon={sharpMailOutline} width={20} height={20} />,
		//	component: <WorkoutsInfo />,
		//},
		{
			id: "users",
			value: "Пользователи",
			icon: <Icon icon={BaselineSelfImprovement} width={20} height={20} />,
			component: <UsersList />,
		},
		{
			id: "messages",
			value: "Сообщения",
			icon: <Icon icon={BaselineForwardToInbox} width={20} height={20} />,
			component: <MessageList />,
		},
		{
			id: "post",
			value: "Добавить пост",
			icon: <Icon icon={BaselineForwardToInbox} width={20} height={20} />,
			component: <NewPost />,
		},
		{
			id: "video",
			value: "Видео",
			icon: <Icon icon={BaselineForwardToInbox} width={20} height={20} />,
			component: <VideoList />,
		},
	];

	return (
		<Container maxWidth="xl">
			<TabsWrapperStyle>
				<Tabs
					value={currentTab}
					scrollButtons="auto"
					variant="scrollable"
					allowScrollButtonsMobile
					onChange={handleChangeTab}
				>
					{DASHBOARD_TABS.map((tab) => (
						<TabStyle
							disableRipple
							key={tab.id}
							value={tab.id}
							label={
								<Stack direction="row" alignItems="center" spacing={1}>
									{tab.icon}
									{!isMobile && (
										<Typography variant="subtitle1">{tab.value}</Typography>
									)}
								</Stack>
							}
							aria-label={tab.id}
						/>
					))}
				</Tabs>
			</TabsWrapperStyle>

			{DASHBOARD_TABS.map((tab) => {
				const isMatched = tab.id === currentTab;
				return isMatched && <Box key={tab.value}>{tab.component}</Box>;
			})}
		</Container>
	);
};

export default Dashboard;
