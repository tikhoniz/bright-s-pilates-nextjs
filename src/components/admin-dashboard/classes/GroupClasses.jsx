import React, { useMemo, useState } from "react";
// material
import {
	Box,
	Grid,
	Table,
	TableBody,
	Accordion,
	Typography,
	TableContainer,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import { createGroupClass } from "../../../helpers/api/api-classes";
import {
	filterComletedClasses,
	filterUpcomingClasses,
} from "../../../utils/filters";
// components
import Heads from "./Heads";
import UpcomingClass from "./UpcomingClass";
import { Block } from "../../Block";
import Scrollbar from "../../Scrollbar";
import CompletedClass from "./CompletedClass";
import NewClassForm from "./ClassUpdateForm";
import HeadsCompleted from "./HeadsCompleted";
import ModalBasic from "../../modal/ModalBasic";
//icons
import { Icon } from "@iconify/react";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import useUser from "../../../hooks/useUser";
import useSWR, { useSWRConfig } from "swr";
import useUserList from "../../../hooks/useUserList";

// ----------------------------------------------------------------------
const style = { marginTop: 5 };
// ----------------------------------------------------------------------

const GroupClasses = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [updatableClass, setUpdatableClass] = useState({});
	const { mutate } = useSWRConfig();

	const { user, isLoading, isError } = useUser();
	const {
		userList,
		isLoading: userIsLoading,
		isError: userIsError,
	} = useUserList({
		refreshInterval: 30000,
		revalidateIfStale: true,
	});

	const { data, error } = useSWR(`/api/admin/groups`, {
		refreshInterval: 30000,
		revalidateIfStale: true,
	});

	const groupClassList = data ?? [];

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const upcomingClasses = useMemo(
		() => filterUpcomingClasses(groupClassList, 60),
		[groupClassList]
	);

	const completedClasses = useMemo(
		() => filterComletedClasses(groupClassList, 60),
		[groupClassList]
	);

	const createClassHandler = async () => {
		setSubmitting(true);

		const response = await createGroupClass(user.email);

		if (!response.ok) {
			console.log(
				"Ошибка создания группового урока Причина: ",
				response.message
			);
			setSubmitting(false);
			return;
		}

		setSubmitting(false);

		setUpdatableClass(response.ops[0]);

		mutate(`/api/admin/groups`);
	};

	return (
		<>
			<Block sx={{ px: { xs: 1, sm: 3 }, mt: 2 }}>
				<Box sx={{ pb: 2, px: 1 }}>
					<LoadingButton
						variant="contained"
						size="large"
						onClick={createClassHandler}
						loading={isSubmitting}
					>
						Создать тренировку
					</LoadingButton>
				</Box>
				<TableContainer>
					<Table>
						<Heads isMobile={isMobile} />
						<TableBody>
							{upcomingClasses.map((row) => {
								return (
									<UpcomingClass
										key={row._id}
										cls={row}
										users={userList}
										onUpdateClass={setUpdatableClass}
									/>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Block>

			<Block sx={style}>
				<Grid container marginTop={3} marginBottom={5}>
					<Grid item xs={12} md={6}>
						<Accordion
							sx={{
								"&:before": {
									opacity: 0,
									backgroundColor: "none",
									borderRadius: 4,
								},
							}}
							disableGutters
							elevation={0}
						>
							<AccordionSummary
								sx={{
									borderTopLeftRadius: 4,
									borderTopRightRadius: 4,
								}}
								expandIcon={
									<Icon icon={arrowIosDownwardFill} width={30} height={30} />
								}
							>
								<Typography variant="subtitle1">
									Завершенные тренировки
								</Typography>
							</AccordionSummary>

							<AccordionDetails sx={{ padding: 0 }}>
								<TableContainer sx={{ maxHeight: 600 }}>
									<Scrollbar>
										<Table>
											<HeadsCompleted />
											<TableBody>
												{completedClasses.map((row) => {
													return (
														<CompletedClass
															key={row._id}
															cls={row}
															users={userList}
														/>
													);
												})}
											</TableBody>
										</Table>
									</Scrollbar>
								</TableContainer>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			</Block>

			<ModalBasic
				open={!!Object.keys(updatableClass).length}
				onClose={() => setUpdatableClass({})}
			>
				<NewClassForm
					cls={updatableClass}
					onClose={() => setUpdatableClass({})}
				/>
			</ModalBasic>
		</>
	);
};

export default GroupClasses;
