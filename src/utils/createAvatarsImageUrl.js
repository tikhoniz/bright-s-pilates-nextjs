const createAvatarsImageUrl = (url) => {
	if (!url) {
		return "/avatar_default.png";
	} else if (url.startsWith("blob:")) {
		return url;
	} else {
		return process.env.publitio_avatars_folder + url;
	}
};

export default createAvatarsImageUrl;
