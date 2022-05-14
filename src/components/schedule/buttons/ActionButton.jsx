import { LoadingButton } from "@mui/lab";

const ActionButton = ({ sx, loading, onClick, label, variant }) => {
	return (
		<LoadingButton
			type="submit"
			variant={variant}
			loading={loading}
			sx={{ ...sx }}
			onClick={onClick}
		>
			{label}
		</LoadingButton>
	);
};

export default ActionButton;
