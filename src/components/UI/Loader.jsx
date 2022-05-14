import React from "react";

import classes from "./loader.module.scss";

const Loader = ({ externalStyles, backDrop, message }) => {
	return (
		<>
			{/*{backDrop && (
				<div className={classes.backDrop}>*/}
			<p className={classes.message}>{message}...</p>
			{/*</div>
			)}*/}
			{/*<div className="ldBar">{message}</div>*/}
			{/*<div className={`${classes.ldsSpinner} ${externalStyles}`}>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*	<div></div>*/}
			{/*</div>*/}
		</>
	);
};

export default Loader;
