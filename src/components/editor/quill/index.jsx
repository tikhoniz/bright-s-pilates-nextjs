// material
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	borderRadius: theme.shape.borderRadius,
	border: `solid 1px ${theme.palette.grey[500_32]}`,
	"& .ql-container.ql-snow": {
		borderColor: "transparent",
		...theme.typography.body1,
		fontFamily: theme.typography.fontFamily,
	},
	"& .ql-editor": {
		minHeight: 200,
		"&.ql-blank::before": {
			fontStyle: "normal",
			color: theme.palette.text.disabled,
		},
		"& pre.ql-syntax": {
			...theme.typography.body2,
			padding: theme.spacing(2),
			borderRadius: theme.shape.borderRadius,
			backgroundColor: theme.palette.grey[900],
		},
	},
}));

// ----------------------------------------------------------------------

export default function QuillEditor({
	id,
	error,
	value,
	onChange,
	simple = false,
	sx,
	...other
}) {
	function undoChange() {
		this.quill.history.undo();
	}
	function redoChange() {
		this.quill.history.redo();
	}

	const formats = [
		"align",
		"background",
		"blockquote",
		"bold",
		"bullet",
		"code",
		"code-block",
		"color",
		"direction",
		"font",
		"formula",
		"header",
		"image",
		"indent",
		"italic",
		"link",
		"list",
		"script",
		"size",
		"strike",
		"table",
		"underline",
		"video",
	];

	//const modules = {
	//	toolbar: {
	//		container: `#${id}`,
	//		handlers: {
	//			undo: undoChange,
	//			redo: redoChange,
	//		},
	//	},
	//	history: {
	//		delay: 500,
	//		maxStack: 100,
	//		userOnly: true,
	//	},
	//	syntax: true,
	//	clipboard: {
	//		matchVisual: false,
	//	},
	//};

	const editorRef = useRef(null);
	const modules = useMemo(() => ({
		toolbar: {
			container: [
				[{ header: "1" }, { header: "2" }, { font: [] }],
				[{ size: [] }],
				["bold", "italic", "underline", "strike", "blockquote"],
				["link", "image", "video"],

				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				["clean"],
			],
			history: {
				delay: 500,
				maxStack: 100,
				userOnly: true,
			},
			//handlers: {
			//	image: imageHandler,
			//},
		},
	}));

	return (
		<RootStyle
			sx={{
				...(error && {
					border: (theme) => `solid 1px ${theme.palette.error.main}`,
				}),
				...sx,
			}}
		>
			<ReactQuill
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder="Write something awesome..."
				{...other}
			/>
		</RootStyle>
	);
}
