import React from "react";
// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import CoachAbout from "../../src/components/coach/CoachAbout";
import CoachAvatar from "../../src/components/coach/CoachAvatar";
import BackgroundImage from "../../src/components/BackgroundImage";
// data
import { coaches } from "../../src/data/coaches";

import ProfileCoverImage from "../../public/images/coach-cover-image.jpg";
//-------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingBottom: theme.spacing(10),
}));

//-------------------------------------------------------------------

const SingleCoachPage = ({ coach }) => {
	const { name, story, picture, alt, images } = coach;
	return (
		<RootStyle
			title={`Tренер ${coach.name} | Bright's Pilates`}
			description={coach.description}
		>
			<BackgroundImage
				image={ProfileCoverImage}
				sx={{ maxHeight: "460px" }}
				alt="Девушка занимается пилатесом напротив окна"
			/>
			<CoachAvatar name={name} picture={picture} alt={alt} />
			<CoachAbout story={story} name={name} images={images} />
		</RootStyle>
	);
};

export function getStaticProps(context) {
	const coachId = context.params.slug;

	const coach = coaches.find((coach) => coach.id === coachId);

	if (!coach) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			coach: coach,
		},
	};
}

export const getStaticPaths = () => {
	return {
		paths: coaches.map((slug) => ({
			params: {
				slug: slug.id,
			},
		})),
		fallback: false,
	};
};

export default SingleCoachPage;
