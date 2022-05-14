import MAvatar from "../../components/@material-extend/MAvatar";
import createAvatar from "../../utils/createAvatar";
import createAvatarsImageUrl from "../../utils/createAvatarsImageUrl";

export default function MyAvatar({ name, image, ...other }) {
	const url = createAvatarsImageUrl(image?.url);

	return (
		<MAvatar src={url} alt={name} {...other}>
			{createAvatar(name).name}
		</MAvatar>
	);
}
