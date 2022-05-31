import PropTypes from "prop-types";
//import { Quill } from "react-quill";
import { Icon } from "@iconify/react";
import roundUndo from "@iconify/icons-ic/round-undo";
import roundRedo from "@iconify/icons-ic/round-redo";

import { styled } from "@mui/material";
// //
// import QuillEditorToolbarStyle from './QuillEditorToolbarStyle';
const QuillEditorToolbarStyle = styled("div")(({ theme }) => {
	//const isRTL = theme.direction === "rtl";

	return {
		"& .ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill":
			{
				fill: theme.palette.primary.main,
			},
		"& .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected":
			{
				color: theme.palette.primary.main,
			},
		"& .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter":
			{
				stroke: theme.palette.primary.main,
			},
		"& .ql-stroke": {
			stroke: theme.palette.text.primary,
		},
		"& .ql-fill, .ql-stroke.ql-fill": {
			fill: theme.palette.text.primary,
		},
		"& .ql-picker, .ql-picker-options, .ql-picker-item, .ql-picker-label, button":
			{
				"&:focus": { outline: "none" },
			},
		"& .ql-toolbar.ql-snow": {
			border: "none",
			borderBottom: `solid 1px ${theme.palette.grey[500_32]}`,
			"& .ql-formats": {
				"&:not(:last-of-type)": {
					marginRight: theme.spacing(2),
				},
			},

			// Button
			"& button": {
				padding: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 4,
				color: theme.palette.text.primary,
			},

			// Icon svg
			"& button svg, span svg": {
				width: 20,
				height: 20,
			},

			// Select
			"& .ql-picker-label": {
				...theme.typography.subtitle2,
				color: theme.palette.text.primary,
				"& .ql-stroke": {
					stroke: theme.palette.text.primary,
				},
			},
			"& .ql-picker-label svg": {
				right: "0 !important",
				left: "auto !important",
			},
			"& .ql-color,& .ql-background,& .ql-align ": {
				"& .ql-picker-label": {
					padding: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},
			},
			"& .ql-expanded": {
				"& .ql-picker-label": {
					borderRadius: 4,
					color: theme.palette.text.disabled,
					borderColor: "transparent !important",
					backgroundColor: theme.palette.action.focus,
					"& .ql-stroke": { stroke: theme.palette.text.disabled },
				},
				"& .ql-picker-options": {
					padding: 0,
					marginTop: 4,
					border: "none",
					maxHeight: 200,
					overflow: "auto",
					boxShadow: theme.customShadows.z20,
					borderRadius: theme.shape.borderRadius,
					backgroundColor: theme.palette.background.paper,
				},
				"& .ql-picker-item": {
					color: theme.palette.text.primary,
				},

				// Align
				"&.ql-align": {
					"& .ql-picker-options": { padding: 0, display: "flex" },
					"& .ql-picker-item": {
						width: 32,
						height: 32,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					},
				},
				// Color & Background
				"&.ql-color, &.ql-background": {
					"& .ql-picker-options": { padding: 8 },
					"& .ql-picker-item": {
						margin: 3,
						borderRadius: 4,
						"&.ql-selected": { border: "solid 1px black" },
					},
				},
				// Font, Size, Header
				"&.ql-font, &.ql-size, &.ql-header": {
					"& .ql-picker-options": {
						padding: theme.spacing(1, 0),
					},
					"& .ql-picker-item": {
						padding: theme.spacing(0.5, 1.5),
					},
				},
			},
		},
	};
});
// ----------------------------------------------------------------------

const FONT_FAMILY = ["Arial", "Tahoma", "Georgia", "Impact", "Verdana"];

const FONT_SIZE = [
	"8px",
	"9px",
	"10px",
	"12px",
	"14px",
	"16px",
	"20px",
	"24px",
	"32px",
	"42px",
	"54px",
	"68px",
	"84px",
	"98px",
];
const HEADINGS = [
	"Heading 1",
	"Heading 2",
	"Heading 3",
	"Heading 4",
	"Heading 5",
	"Heading 6",
];

export function undoChange() {
	this.quill.history.undo();
}
export function redoChange() {
	this.quill.history.redo();
}

//// const Size = Quill.import('formats/size');
//const Size = Quill.import("attributors/style/size");
//Size.whitelist = FONT_SIZE;
//Quill.register(Size, true);

//// const Font = Quill.import('formats/font');
//const Font = Quill.import("attributors/style/font");
//Font.whitelist = FONT_FAMILY;
//Quill.register(Font, true);

export const formats = [
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

export default function QuillEditorToolbar({ id, isSimple, ...other }) {
	return (
		<QuillEditorToolbarStyle {...other}>
			<div id={id}>
				<div className="ql-formats">
					{!isSimple && (
						<select className="ql-font" defaultValue="">
							<option value="">Font</option>
							{FONT_FAMILY.map((font) => (
								<option key={font} value={font}>
									{font}
								</option>
							))}
						</select>
					)}

					{!isSimple && (
						<select className="ql-size" defaultValue="16px">
							{FONT_SIZE.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
					)}

					<select className="ql-header" defaultValue="">
						{HEADINGS.map((heading, index) => (
							<option key={heading} value={index + 1}>
								{heading}
							</option>
						))}
						<option value="">Normal</option>
					</select>
				</div>

				<div className="ql-formats">
					<button type="button" className="ql-bold" />
					<button type="button" className="ql-italic" />
					<button type="button" className="ql-underline" />
					<button type="button" className="ql-strike" />
				</div>

				{!isSimple && (
					<div className="ql-formats">
						<select className="ql-color" />
						<select className="ql-background" />
					</div>
				)}

				<div className="ql-formats">
					<button type="button" className="ql-list" value="ordered" />
					<button type="button" className="ql-list" value="bullet" />
					{!isSimple && (
						<button type="button" className="ql-indent" value="-1" />
					)}
					{!isSimple && (
						<button type="button" className="ql-indent" value="+1" />
					)}
				</div>

				{!isSimple && (
					<div className="ql-formats">
						<button type="button" className="ql-script" value="super" />
						<button type="button" className="ql-script" value="sub" />
					</div>
				)}

				{!isSimple && (
					<div className="ql-formats">
						<button type="button" className="ql-code-block" />
						<button type="button" className="ql-blockquote" />
					</div>
				)}

				<div className="ql-formats">
					<button type="button" className="ql-direction" value="rtl" />
					<select className="ql-align" />
				</div>

				<div className="ql-formats">
					<button type="button" className="ql-link" />
					<button type="button" className="ql-image" />
					<button type="button" className="ql-video" />
				</div>

				<div className="ql-formats">
					{!isSimple && <button type="button" className="ql-formula" />}
					<button type="button" className="ql-clean" />
				</div>

				{!isSimple && (
					<div className="ql-formats">
						<button type="button" className="ql-undo">
							<Icon icon={roundUndo} width={18} height={18} />
						</button>
						<button type="button" className="ql-redo">
							<Icon icon={roundRedo} width={18} height={18} />
						</button>
					</div>
				)}
			</div>
		</QuillEditorToolbarStyle>
	);
}
