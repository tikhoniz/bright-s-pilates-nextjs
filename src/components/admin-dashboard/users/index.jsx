import useSWR from "swr";
// hooks
import useUserList from "../../../hooks/useUserList";
// material
import {
	Card,
	Table,
	TableRow,
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
import SkeletonLoad from "../../UI/skeleton/Skeleton";

export default function UsersList() {
	const { userList, isError } = useUserList();

	const { data, error } = useSWR(`/api/orders`);

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
							{!data && (
								<TableRow>
									<TableCell colSpan={"100%"}>
										<SkeletonLoad num={5} variant="text" height={100} />
									</TableCell>
								</TableRow>
							)}

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
