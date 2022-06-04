// material
import { Box, Card } from "@mui/material";
import { ModalUnstyled } from "@mui/base";

import { styled } from "@mui/material";
// icons
import { Icon } from "@iconify/react";
import { MIconButton } from "../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
`;

const Backdrop = styled("div")`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const ModalBasic = ({ children, open, onClose }) => {
	return (
		<StyledModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			BackdropComponent={Backdrop}
			closeAfterTransition={true}
		>
			<Card
				sx={{
					py: { xs: 2, md: 4 },
					position: "relative",
					minWidth: "300px",
					maxHeight: "100%",
					overflowY: "initial",
				}}
			>
				<MIconButton
					size="small"
					onClick={onClose}
					sx={{
						position: "absolute",
						top: 5,
						right: 5,
					}}
				>
					<Icon icon={closeFill} width={30} height={30} />
				</MIconButton>
				<Box
					sx={{
						width: "100%",
						maxHeight: "100%",
						overflowY: "auto",
						padding: 1,
					}}
				>
					{children}
				</Box>
			</Card>
		</StyledModal>
	);
};

export default ModalBasic;
