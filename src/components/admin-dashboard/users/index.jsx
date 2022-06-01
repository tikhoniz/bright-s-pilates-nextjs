import useSWR from "swr";
// hooks
import useUserList from "../../../hooks/useUserList";
// material
import {
	Card,
	Box,
	Table,
	TableRow,
	Skeleton,
	TableCell,
	TableBody,
	CardHeader,
	TableContainer,
} from "@mui/material";
//components
import Heads from "./Heads";
import UserRow from "./UserRow";
import Scrollbar from "../../Scrollbar";
//icons
import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";

const SkeletonLoad = () => {
	return (
		<TableRow>
			<TableCell colSpan={"100%"}>
				<Box sx={{ mx: 1 }}>
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={100} />
					<Skeleton variant="text" height={100} />
				</Box>
			</TableCell>
		</TableRow>
	);
};

export default function UsersList() {
	const { userList, isLoading, isError } = useUserList();

	const { data, error } = useSWR(`/api/admin/orders`);

	if (isError || error) return "Ошибка!";

	return (
		<Card>
			<CardHeader
				title="Пользователи"
				sx={{ mb: 3 }}
				avatar={<Icon icon={BaselineGroups} width={26} height={26} />}
			/>
			<Scrollbar>
				<TableContainer>
					<Table>
						<Heads />
						<TableBody>
							{isLoading && <SkeletonLoad />}
							{data &&
								userList.map((user) => (
									<UserRow key={user._id} user={user} orders={data} />
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Scrollbar>
		</Card>
	);
}
