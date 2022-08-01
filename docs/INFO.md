# Проект

- loader перехода страниц в layout

## Настройка темы

[Основной цвет] в (./src/styles/palette) PRIMARY {main:}

# Информация Zoom

## Возможные настройки ZoomMtg.init

ZoomMtg.init({
debug: true, //optional
leaveUrl: ‘http://www.zoom.us’, //required
webEndpoint: ‘PSO web domain’, // PSO option
showMeetingHeader: false, //option
disableInvite: false, //optional
disableCallOut: false, //optional
disableRecord: false, //optional
disableJoinAudio: false, //optional
audioPanelAlwaysOpen: true, //optional
showPureSharingContent: false, //optional
isSupportAV: true, //optional,
isSupportChat: true, //optional,
isSupportQA: true, //optional,
isSupportPolling: true, //optional
isSupportBreakout: true, //optional
isSupportCC: true, //optional,
screenShare: true, //optional,
rwcBackup: ‘’, //optional,
videoDrag: true, //optional,
sharingMode: ‘both’, //optional,
videoHeader: true, //optional,
isLockBottom: true, // optional,
isSupportNonverbal: true, // optional,
isShowJoiningErrorDialog: true, // optional,
disablePreview: false, // optional
disableCORP: true, // optional
inviteUrlFormat: ‘’, // optional
loginWindow: { // optional,
width: 400,
height: 380
},
meetingInfo: [ // optional
‘topic’,
‘host’,
‘mn’,
‘pwd’,
‘telPwd’,
‘invite’,
‘participant’,
‘dc’,
‘enctype’,
‘report’
],
disableVoIP: false, // optional
disableReport: false, // optional
});

- [ZOOM Documentation](https://marketplace.zoom.us/docs/sdk/native-sdks/web/advanced/web-isolation)

# NODE JS

## ERRORS

##############################################################################################################

**Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching memory limit: JS heap out of memory**

## добавить в package.json

"build": "NODE_OPTIONS=\"--max_old_space_size=4096\" next build"
##############################################################################################################

**Error [Only absolute URLs are supported]:**

##

##############################################################################################################

# Material UI

## Переписать стили

- В стилях которые уже есть при перезаписи указывать !important
  [https://pretagteam.com/question/how-to-change-the-border-color-of-materialui-textfield]

const useOutlinedInputStyles = makeStyles((theme) =>
createStyles({
root: {
"& $notchedOutline": {
				borderColor: "red",
			},
				"&:hover $notchedOutline": {
				borderColor: "blue",
			},
			"&$focused $notchedOutline": {
borderColor: "#000000de !important",
},

    		"&.Mui-focused $notchedOutline": {
    			borderColor: `${theme.palette.border.light} !important`,
    		},
    	},
    	focused: {},
    	notchedOutline: {},
    })

);

## Изменение шрифта в блоке sx={{}}

<Typography
sx={{
	fontFamily: "fontFamilySecondary"
	}} >

# Для некоторых модулей нужно импортировать стили

## slick-carousel

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

## scroll bar

import 'simplebar/src/simplebar.css';
#####################################################################################
