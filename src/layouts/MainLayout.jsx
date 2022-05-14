//next
import { useRouter } from "next/router";
//components
import MainNavbar from "../components/MainNavbar";
// store
import MainFooter from "../components/MainFooter";

export default function MainLayout({ children }) {
	const { pathname } = useRouter();

	const isAuth = pathname === "/auth";

	return (
		<div
			id="move_top"
			style={{
				minHeight: "100vh",
				display: "grid",
				gridTemplateColumns: "1fr",
				gridTemplateRows: "auto 1fr auto",
				gridTemplateAreas: `"header" "body" "footer"`,
			}}
		>
			<MainNavbar />
			<div style={{ gridArea: "body" }}>{children}</div>
			{!isAuth && <MainFooter />}
		</div>
	);
}
