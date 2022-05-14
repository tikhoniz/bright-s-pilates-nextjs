import React, { useRef, useState } from "react";
// material
import {
	Card,
	Stack,
	Avatar,
	Button,
	Divider,
	Typography,
	ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material";
// utils
import {
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../../utils/humanReadableDate";
// component
import MenuPopover from "../../../MenuPopover";
import Scrollbar from "../../../Scrollbar";

const CardMediaStyle = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	justifyContent: "center",
	paddingTop: "calc(100% * 9 / 16)",
	"&:before": {
		top: 0,
		zIndex: 9,
		content: "''",
		width: "100%",
		height: "100%",
		position: "absolute",
		backdropFilter: "blur(3px)",
		WebkitBackdropFilter: "blur(3px)", // Fix on Mobile
		borderTopLeftRadius: theme.shape.borderRadiusMd,
		borderTopRightRadius: theme.shape.borderRadiusMd,
		backgroundColor: alpha(theme.palette.primary.darker, 0.72),
	},
}));

const CoverImgStyle = styled("img")({
	top: 0,
	zIndex: 8,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	position: "absolute",
});

const ITEM_HEIGHT = 30;

const ClassCard = ({ cls }) => {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	return (
		<Card sx={{ pb: 4, maxWidth: 300, margin: " 0 auto" }}>
			<CardMediaStyle>
				<Stack
					alignItems="center"
					sx={{
						top: 20,
						zIndex: 11,
						position: "absolute",
					}}
				>
					<Typography variant="h3" sx={{ color: "#ffffff" }}>
						<time dateTime={cls.startTime}>
							{humanReadableWeekday(cls.startTime, "ru-RU")}
						</time>
					</Typography>
					<Stack direction="row">
						<Typography variant="h4" sx={{ color: "#ffffff" }}>
							<time dateTime={cls.startTime}>
								{humanReadableDate(cls.startTime, "ru-RU")}
							</time>
						</Typography>
						<Typography variant="h4" sx={{ color: "#ffffff", ml: 1 }}>
							<time dateTime={cls.startTime}>
								в {humanReadableTime(cls.startTime, "ru-RU")}
							</time>
						</Typography>
					</Stack>
				</Stack>
				<Avatar
					alt={cls.coach}
					src={cls.avatar}
					sx={{
						width: 64,
						height: 64,
						zIndex: 11,
						position: "absolute",
						transform: "translateY(-50%)",
					}}
				/>
				<CoverImgStyle alt="cover" src={"/covers/sunset-cover.png"} />
			</CardMediaStyle>

			<Stack alignItems="center">
				<Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
					{cls.title}
				</Typography>

				{cls.participants.length > 0 ? (
					<Button
						type="button"
						ref={anchorRef}
						size="large"
						color="inherit"
						onClick={() => setOpen(true)}
					>
						участников: {cls.participants.length}
					</Button>
				) : (
					<Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
						участников: {cls.participants.length}
					</Typography>
				)}

				<Typography
					variant="subtitle1"
					align="center"
					sx={{ mt: "11px", mb: "13px" }}
				>
					уровень:{" "}
					{(cls.level === "beginer" && "начальный") ||
						(cls.level === "intermediate" && "средний") ||
						(cls.level === "advance" && "продвинутый")}
				</Typography>
			</Stack>
			<Divider />

			{/*----------- Popover List Participants ---------------- */}
			<MenuPopover
				open={open}
				onClose={() => setOpen(false)}
				anchorEl={anchorRef.current}
			>
				<Scrollbar sx={{ maxHeight: ITEM_HEIGHT * 10 }}>
					{cls.participants.map((participant, i) => (
						<ListItemText
							key={participant}
							primaryTypographyProps={{
								typography: "subtitle2",
								m: 2,
							}}
							secondaryTypographyProps={{ typography: "caption" }}
							primary={participant}
						/>
					))}
				</Scrollbar>
			</MenuPopover>
			{/* ------------------------------------------------------*/}
		</Card>
	);
};

export default ClassCard;
