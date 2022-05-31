import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-ant-design/home-fill";
import loginOutlined from "@iconify/icons-ant-design/login-outlined";
import baselineCalendarToday from "@iconify/icons-ic/baseline-calendar-today";
import dollarCircleFilled from "@iconify/icons-ant-design/dollar-circle-filled";
import roundOndemandVideo from "@iconify/icons-ic/round-ondemand-video";
import roundEditNote from "@iconify/icons-ic/round-edit-note";

import baselineAdminPanelSettings from "@iconify/icons-ic/baseline-admin-panel-settings";

const ICON_SIZE = {
	width: 24,
	height: 24,
};

const menuConfig = {
	menuList: [
		{
			title: "Главная",
			path: "/",
			icon: <Icon icon={homeFill} {...ICON_SIZE} />,
		},
		{
			title: "Расписание",
			path: "/schedule",
			icon: <Icon icon={baselineCalendarToday} {...ICON_SIZE} />,
		},
		//{
		//	title: "Стоимость",
		//	path: "/pricing",
		//	icon: <Icon icon={dollarCircleFilled} {...ICON_SIZE} />,
		//},
		{
			title: "Видео",
			path: "/video",
			icon: <Icon icon={roundOndemandVideo} {...ICON_SIZE} />,
		},
		{
			title: "Блог",
			path: "/blog",
			icon: <Icon icon={roundEditNote} {...ICON_SIZE} />,
		},
	],
	linkLogin: {
		title: "Войти",
		path: "/auth",
		icon: <Icon icon={loginOutlined} {...ICON_SIZE} />,
	},
	linkAdmin: {
		title: "Admin",
		path: "/admin-dashboard",
		icon: <Icon icon={baselineAdminPanelSettings} {...ICON_SIZE} />,
	},
};

export default menuConfig;
