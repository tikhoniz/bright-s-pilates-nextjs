import { forwardRef } from "react";
import PropTypes from "prop-types";
// next
import Head from "next/head";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const Page = forwardRef(
	({ children, title = "", description = "", ...other }, ref) => (
		<Box ref={ref} {...other}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			{children}
		</Box>
	)
);

Page.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
};

export default Page;
