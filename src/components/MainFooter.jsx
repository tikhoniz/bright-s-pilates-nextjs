import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
// next
import NextLink from "next/link";
// material
import { styled, Link } from "@mui/material";
import {
	Grid,
	Stack,
	Divider,
	Container,
	Typography,
	IconButton,
} from "@mui/material";
//components
import ModalBasic from "./modal/ModalBasic";
import GeneralContactForm from "./forms/GeneralContactForm";
// icons
import { Icon } from "@iconify/react";
import facebookFill from "@iconify/icons-ant-design/facebook-outlined";
import linkedinFill from "@iconify/icons-ant-design/linkedin-outlined";
import arrowheadUpFill from "@iconify/icons-eva/arrowhead-up-fill";
import baselineWhatsapp from "@iconify/icons-ant-design/whats-app-outlined";
import instagramOutlined from "@iconify/icons-ant-design/instagram-outlined";

// ----------------------------------------------------------------------
const RootStyle = styled("div")(({ theme }) => ({
	gridArea: "footer",
	position: "relative",
	backgroundColor: theme.palette.background.default,
}));

const LinkStyle = styled(Link)(({ theme }) => ({
	opacity: 0.7,
	color: theme.palette.text.primary,
	"&:hover": {
		opacity: 0.9,
		textDecoration: "none",
	},
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
	const [isOpen, setOpen] = useState(false);

	const LINKS = [
		{
			headline: "Студия",
			children: [
				{ name: "О нас", href: "/under-construction" },
				{ name: "FAQs", href: "/under-construction" },
				{ name: "Карта сайта", href: "/under-construction" },
				{ name: "Работа у нас", href: "/under-construction" },
			],
		},
		{
			headline: "Правовая информация",
			children: [
				{ name: "Условия использования", href: "/terms-of-service" },
				{
					name: "Политика конфиденциальности",
					href: "/privacy-policy",
				},
				{
					name: "Политика возврата и возмещения",
					href: "/return-policy",
				},
			],
		},
		{
			headline: "Kонтакты",
			children: [
				{
					name: "Связаться с нами",
					href: "#0",
					foo: () => setOpen(true),
				},
			],
		},
	];

	const SOCIALS = [
		{
			name: "WhatsApp",
			icon: baselineWhatsapp,
			href: `https://api.whatsapp.com/send/?phone=${process.env.whats_app_phone}`,
		},
		{
			name: "FaceBook",
			icon: facebookFill,
			href: `https://www.facebook.com/${process.env.facebook}`,
		},
		{
			name: "Instagram",
			icon: instagramOutlined,
			href: `https://www.instagram.com/${process.env.instagram}`,
		},
		//{
		//	name: "Linkedin",
		//	icon: linkedinFill,
		//	href: `https://www.linkedin.com/company/${process.env.linkedin}`,
		//},
	];

	const resetContactForm = () => {
		setOpen(false);
	};
	return (
		<>
			<RootStyle>
				<Divider />
				<Container maxWidth="xl" sx={{ p: 4 }} disableGutters>
					<Grid
						container
						justifyContent={{ xs: "center", md: "space-between" }}
						sx={{ textAlign: { xs: "center", md: "left" }, pb: 1 }}
					>
						<Grid item xs={12} md={7}>
							<Stack
								spacing={5}
								direction={{ xs: "column", md: "row" }}
								justifyContent="space-between"
							>
								{LINKS.map((list) => {
									const { headline, children } = list;
									return (
										<Stack key={headline} spacing={1}>
											<Typography component="p" variant="overline">
												{headline}
											</Typography>
											{children.map((link) => (
												<NextLink key={link.name} href={link.href} passHref>
													<LinkStyle onClick={link?.foo}>{link.name}</LinkStyle>
												</NextLink>
											))}
										</Stack>
									);
								})}
							</Stack>
						</Grid>

						<Grid item xs={8} md={3} sx={{ pt: { xs: 4, md: 0 } }}>
							<Stack
								justifyContent="space-between"
								height="100%"
								alignItems={{ xs: "center", md: "flex-end" }}
								spacing={2}
							>
								<ScrollLink to="move_top" spy smooth href="/">
									<Icon
										icon={arrowheadUpFill}
										width={50}
										height={50}
										cursor="pointer"
										color="#212B36"
									/>
									<span className="visually-hidden">move top</span>
								</ScrollLink>

								<Stack
									direction="row"
									justifyContent={{ xs: "center", md: "flex-end" }}
								>
									{SOCIALS.map((social) => (
										<IconButton
											key={social.name}
											color="primary"
											sx={{ p: 1 }}
											href={social.href}
											target="_blank"
										>
											<Icon icon={social.icon} width={35} height={35} />
											<span className="visually-hidden">{social.name}</span>
										</IconButton>
									))}
								</Stack>
							</Stack>
						</Grid>
					</Grid>

					<Stack
						direction={{ xs: "column", md: "row" }}
						justifyContent={{ xs: "center", md: "space-between" }}
						sx={{
							width: "100%",
							alignItems: "center",
							mt: 2,
							pb: 2,
							textAlign: { xs: "center", md: "right" },
						}}
					>
						<Typography
							component="p"
							variant="body2"
							sx={{
								fontSize: 13,
							}}
						>
							© 2021. Все права защищены
						</Typography>
					</Stack>
				</Container>
			</RootStyle>

			<ModalBasic open={isOpen} onClose={resetContactForm}>
				<GeneralContactForm onCloseModalHandler={resetContactForm} />
			</ModalBasic>
		</>
	);
}
