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

const MessageList = () => {
	const [message, setMessage] = useState({});

	const { users, isLoading, isError } = useUserList();
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
										<TableCell>Загрузка...</TableCell>
									</TableRow>
								))}
							{data &&
								messages.map((row) => (
									<MessagesRow
										key={row._id}
										userMessage={row}
										users={users}
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
