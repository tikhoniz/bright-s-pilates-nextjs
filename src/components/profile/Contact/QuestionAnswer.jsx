import { useSession } from "next-auth/react";
import useSWR from "swr";
// material
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
// components
import QuestionAnswerList from "./QuestionAnswerList";
import SkeletonLoad from "../../UI/skeleton/Skeleton";

export default function QuestionAnswer() {
	const { data: session } = useSession();

	const { user } = session ?? {};
	const userEmail = user?.email;

	// получение списка сообщений пользователя, обновляется при переключении вкладок или через 60 секунд
	const { data, error } = useSWR(`/api/messages/${userEmail}`, {
		refreshInterval: 60000,
		revalidateIfStale: true,
	});

	const isLoading = !error && !data;

	return (
		<Card>
			<CardHeader title="Сообщения:" />
			<CardContent>
				{error && (
					<Typography variant="subtitle1">
						Ошибка получения сообщений.
					</Typography>
				)}

				{isLoading && <SkeletonLoad num={3} variant="text" height={50} />}

				{data && <QuestionAnswerList messages={data} />}
			</CardContent>
		</Card>
	);
}
