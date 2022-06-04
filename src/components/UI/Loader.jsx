import React from "react";

import classes from "./loader.module.scss";

const Loader = ({ externalStyles, backDrop, message }) => (
	<p className={classes.message}>{message}...</p>
);
export default Loader;
