import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

const Zoom = ({ user, onlineClass }) => {
	const { data, error } = useSWR(
		`/api/zoom/signature/${onlineClass?.conferenceId}/${user?.email}`,
		fetcher
	);

	const { signature } = data || {};

	useEffect(() => {
		if (signature) {
			const { ZoomMtg } = require("@zoomus/websdk");
			ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");
			ZoomMtg.preLoadWasm();
			ZoomMtg.prepareJssdk();
			initiateMeeting(ZoomMtg);
			document.getElementById("zmmtg-root").style.display = "block";
			document.getElementById("header").style.zIndex = "0";
		}
	}, [data]);

	//const lang = locale === "en" ? "en-EN" : "ru-RU";
	const lang = "ru-RU";
	const apiKey = process.env.zoom_api_key;
	const meetingNumber = onlineClass?.conferenceId;
	const leaveUrl = "/profile";
	const passWord = onlineClass?.accessCode;
	const userEmail = user?.email;

	function initiateMeeting(ZoomMtg) {
		ZoomMtg.init({
			leaveUrl: leaveUrl,
			isSupportAV: true,
			debug: true,
			//zoomAppRoot: zoomRef.current,
			// выключает предварительный экран входа
			disablePreview: true,
			disableInvite: true,
			success: (success) => {
				//добавляет интернализацию
				ZoomMtg.i18n.load(lang);
				ZoomMtg.i18n.reload(lang);
				ZoomMtg.join({
					signature: data?.signature,
					meetingNumber: meetingNumber,
					userName: user?.name,
					apiKey: apiKey,
					userEmail: userEmail,
					passWord: passWord,
					success: (success) => {
						console.log("joined", success);
					},
					error: (error) => {
						console.log("initiateMeeting ERROR: ", error);
					},
				});
			},
			error: (error) => {
				console.log("initiateMeeting ERROR 2: ", error);
			},
		});
	}

	return <div />;
};

export default Zoom;
