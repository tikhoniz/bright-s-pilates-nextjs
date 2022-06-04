import { useState } from "react";
import useSWR from "swr";
// hooks
import useUserList from "../../../hooks/useUserList";
// material
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
//components

import { Block } from "../../Block";
import MessageForm from "./MessageForm";
import MessagesRow from "./MessagesRow";
import MessagesHeads from "./MessagesHeads";
import ModalBasic from "../../modal/ModalBasic";
import SkeletonLoad from "../../UI/skeleton/Skeleton";

const MessageList = () => {
	const [message, setMessage] = useState({});

	const { userList, isLoading, isError } = useUserList();
	const { data, error } = useSWR(`/api/admin/messages`);

	const messages = data ?? [];

	const replyToMessage = (id) => {
		const currentMessage = messages.find((item) => item._id === id);
		setMessage(currentMessage);
	};

	return (
		<>
			<Block>
				<TableContainer>
					<Table>
						<MessagesHeads />
						<TableBody>
							{isLoading ||
								(!data && (
									<TableRow>
										<TableCell colSpan={"100%"}>
											<SkeletonLoad num={5} variant="text" height={100} />
										</TableCell>
									</TableRow>
								))}
							{data &&
								messages.map((row) => (
									<MessagesRow
										key={row._id}
										userMessage={row}
										users={userList}
										onReplyMessage={replyToMessage}
									/>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Block>

			<ModalBasic
				open={!!Object.keys(message).length}
				onClose={() => setMessage({})}
			>
				<Box>
					<MessageForm message={message} onClose={() => setMessage({})} />
				</Box>
			</ModalBasic>
		</>
	);
};

export default MessageList;
