// material
import { styled } from "@mui/material";
// components
import Hero from "../src/components/Hero";
import Page from "../src/components/Page";
import InfoBox from "../src/components/boxes/InfoBox";
import BackgroundImage from "../src/components/BackgroundImage";
import BenefitsBlock from "../src/components/benefits/BenefitsBlock";
import DeviceWidget from "../src/components/boxes/DeviceWidget";
import TutorialWidget from "../src/components/boxes/TutorialWidget";
// images
import mainImage from "../public/images/home-cover-image.jpg";
import headTeacherImage from "../public/images/head-teacher-image.jpg";
import { MotionInView, varFadeIn } from "../src/components/animate";

//-------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	position: "relative",
	minHeight: "100%",
}));

//-------------------------------------------------

const HomePage = () => {
	return (
		<RootStyle
			title="Онлайн Пилатес студия Bright's Pilates | Онлайн тренировки у Вас дома"
			description="Online тренировки по направлению Пилатес в любом комфортном для Вас месте. 'Живые' групповые и персональные классы. Для любого возраста и уровня подготовки."
		>
			<h1 className="visually-hidden">
				"Oнлайн занятия из любой точки мира в студии Bright's Pilates"
			</h1>

			<Hero />

			<BackgroundImage
				image={mainImage}
				alt="Женщина выполняет упражнение в большой светлой комнате"
			/>

			<DeviceWidget />

			<InfoBox
				image={headTeacherImage}
				alt="Красивая девушка с вьющимися волосами сидит на полу  и улыбается"
				head="Ваш тренер"
				text="...не перестаю каждый день удивляться уникальности метода Пилатес, его логичности и простоте с одной стороны, глубине и осознаности с другой..."
				btnTitle="О тренере"
				url="/coaches/diana-head-coach"
				icon="/svg/coach_icon.svg"
			/>
			<MotionInView variants={varFadeIn}>
				<TutorialWidget />
			</MotionInView>

			<BenefitsBlock />
		</RootStyle>
	);
};

export default HomePage;
