import MAvatar from "../../components/@material-extend/MAvatar";
import createAvatar from "../../utils/createAvatar";
import createAvatarsImageUrl from "../../utils/createAvatarsImageUrl";

export default function MyAvatar({ name, image, ...other }) {
	return (
		<MAvatar src={image} alt={name} {...other}>
			{createAvatar(name).name}
		</MAvatar>
	);
}
