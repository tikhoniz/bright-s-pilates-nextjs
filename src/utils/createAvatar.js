import { capitalize } from "lodash";

// ----------------------------------------------------------------------

const PRIMARY_NAME = [
	"A",
	"N",
	"H",
	"L",
	"Q",
	"А",
	"Б",
	"В",
	"Г",
	"Д",
	"9",
	"8",
];
const INFO_NAME = [
	"F",
	"G",
	"T",
	"I",
	"J",
	"Е",
	"Ё",
	"Ж",
	"З",
	"И",
	"1",
	"2",
	"3",
];
const SUCCESS_NAME = [
	"K",
	"D",
	"Y",
	"B",
	"O",
	"К",
	"Л",
	"М",
	"Н",
	"О",
	"4",
	"5",
];
const WARNING_NAME = [
	"P",
	"E",
	"R",
	"S",
	"C",
	"U",
	"П",
	"Р",
	"С",
	"Т",
	"У",
	"Ф",
	"6",
	"7",
];
const ERROR_NAME = ["V", "W", "X", "M", "Z", "Х", "Ц", "Ч", "Щ", "Э", "Ю", "Я"];

function getFirstCharacter(name) {
	return capitalize(name && name.charAt(0));
}

function getAvatarColor(name) {
	if (PRIMARY_NAME.includes(getFirstCharacter(name))) return "primary";
	if (INFO_NAME.includes(getFirstCharacter(name))) return "info";
	if (SUCCESS_NAME.includes(getFirstCharacter(name))) return "success";
	if (WARNING_NAME.includes(getFirstCharacter(name))) return "warning";
	if (ERROR_NAME.includes(getFirstCharacter(name))) return "warning";
	return "default";
}

export default function createAvatar(name) {
	return {
		name: getFirstCharacter(name),
		color: getAvatarColor(name),
	};
}
