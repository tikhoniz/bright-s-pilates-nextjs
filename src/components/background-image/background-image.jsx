import classes from "./background-image.module.scss";

const BackgroundImage = ({ url }) => {
	return (
		<section className={classes.content}>
			<div className={classes.media}>
				<img
					className={classes.image}
					src={url}
					alt="background image"
					width="100%"
					height="auto"
				/>
			</div>
		</section>
	);
};

export default BackgroundImage;
