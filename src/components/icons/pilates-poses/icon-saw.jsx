// material
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function TeaserIcon({ ...other }) {
	const theme = useTheme();
	const DEFAULT = "#46514D";
	const PRIMARY_MAIN = theme.palette.primary.main;

	return (
		<Box {...other}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 1101.63 635.21"
			>
				<g>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M403.09,171.69c-9.58-3.06-19-6.26-28.58-9.43-27.3-9-54.71-18.2-80.78-30.25-20.33-9.81-38-21.26-58.82-30.59-27.53-12.16-56.24-21.62-83-35.2-11.82-6-23.39-12.87-33.34-21.86a153.49,153.49,0,0,0-27.38-19.7C79,18.28,8.13-9,0,3,1.39,34.92,42.38,56.18,66.59,68.94A389.63,389.63,0,0,0,102.16,85c12.5,4.71,24.55,8.73,37.3,12.5,29.43,7.68,59.16,13.35,88.47,21.52C249.42,126,268,135,288.88,143c27.41,9.66,55.61,17.57,83.62,25.62,9.1,2.58,18.2,5.19,27.16,7.91,17.6,5.08,35.2,10.15,52.55,15.93A407.15,407.15,0,0,1,498.39,213a332.31,332.31,0,0,0-45.22-23c-16.55-6.75-33.19-12.53-50.08-18.32Z"
					/>
					<path
						fill={PRIMARY_MAIN}
						fillRule="evenodd"
						d="M235.5,90.79c-18.2-19.36-52.33-32.25-77.16-41.1C141.25,43.54,124,37.16,106.53,32a43.31,43.31,0,0,0-18.68-1.31c-3.77.94-21.6,7-15.82,13.47,1.9,1.53,4.7,1.89,7.09,2.23,13.12,2.36,26,1.65,39.34,1.65,13.8.14,24.92,2.61,38.13,6.26,26.93,7.57,54,18.91,76.19,36.26a66.21,66.21,0,0,1,4.59,4.85c7.57,7.56,13,15.13,13.69,26.1.37-11.68-5.18-19.73-13.09-27.86a16.64,16.64,0,0,0-2.5-2.84Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M235.5,90.79c.23,0,.46-.11.68-.11-16.64-17.6-46.88-30-69.3-38.27-2.73-1.07-5.56-2-8.4-3.09-17.23-6.12-34.49-12.5-52.1-17.83A47.51,47.51,0,0,0,88.21,30a33.44,33.44,0,0,0-4.84,1.31c-3.91,1.3-10.52,4.36-12.53,8.25A3.52,3.52,0,0,0,70.27,42a3.77,3.77,0,0,0,1.42,2.35,4.05,4.05,0,0,0,1,.71,14,14,0,0,0,3.65,1.3,19,19,0,0,0,2.5.49c2.35.45,4.7.82,7.2,1,11,1.07,21.74.59,32.71.48,13.69.11,24.58,2.61,37.67,6.26,5.67,1.53,11.11,3.18,16.67,5.19,19.7,7,43,17.49,59.16,30.84.11-.14.37-.14.48-.14h-.59c1.78,1.78,3.28,3.43,5,5.33,7.31,7.31,12.5,14.77,13.21,25.4.48.11,1,.34,1.33.45.57-11.91-5.33-20.41-13.49-28.57-.71-.83-1.28-1.65-2-2.47-.22,0-.45.11-.71.11h-.56a41.93,41.93,0,0,1,3,3.29c7.42,7.94,12.86,15.85,12.5,27.19a1.6,1.6,0,0,1,.7.22c.26.12.49.12.71.23-.56-11.34-6.38-19.13-14.28-26.79a34.89,34.89,0,0,0-4.26-4.5c-16.15-13.58-39.91-24.21-59.86-31.19-5.56-2-11-3.65-16.67-5.18-12.62-3.55-25.51-6.61-38.61-6.61-8.28,0-16.41.34-24.57,0a121.41,121.41,0,0,1-12.87-1.19A6,6,0,0,1,79.23,46c-.94-.14-2.13-.25-3.06-.48a13.4,13.4,0,0,1-3.09-1,1.29,1.29,0,0,1-.57-.48,1.59,1.59,0,0,1-.82-1.53,3,3,0,0,1,.45-2.27c2-3.77,8.39-6.71,12.28-8.13,1.07-.23,2-.6,3.09-.82a43.64,43.64,0,0,1,19.13,1c17.49,5.45,34.47,11.46,51.62,17.72,2.8,1,5.67,2,8.36,3,22.22,8.25,51.85,20.41,68.29,37.78h.59Z"
					/>
					<path
						fill={PRIMARY_MAIN}
						fillRule="evenodd"
						d="M322.78,169.91A153.37,153.37,0,0,1,280,163.3c-22.43-7.91-37.9-17.49-58.68-27.75-9.92-5.18-20-10.15-29.91-15.36-7.9-4.85-31.74-29.28-17.71-29.06,9.35,1.53,29.65,22.09,37.78,28.83,4,3.43,8,6.49,12.19,9.7,20.92,13.57,33.42,22.19,57.4,31.06a202,202,0,0,0,39.09,7.55c10.18.48,24.69-.46,33.31-6.61-7.57,6.61-21.15,8.14-30.7,8.25Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M322.78,169.91a1.35,1.35,0,0,0-.37-.45,154.91,154.91,0,0,1-42.26-6.5,232.29,232.29,0,0,1-31.44-13.6c-9.07-4.71-18.06-9.67-27.15-14.18-9.93-5.18-20-10.14-29.77-15.33a42.12,42.12,0,0,1-8.5-6A52.26,52.26,0,0,1,173.48,102c-1.3-2.13-3.43-6.63-2.58-9.1.23-.6.45-1.08,1-1.3a4,4,0,0,1,2-.12c.46.12.82.23,1.16.34A30.16,30.16,0,0,1,183,96.35a174.64,174.64,0,0,1,14.88,12.05c4.29,3.88,8.54,8,13,11.68,4.13,3.43,8.39,6.74,12.64,9.92,11.45,7.45,22.08,14.65,34.24,21A174.06,174.06,0,0,0,281,161a193.91,193.91,0,0,0,39.43,7.8h.11c10.41.34,24.95-.6,33.79-6.75a6.2,6.2,0,0,1-.82-.34c-.23-.11-.6-.26-.82-.37-7.46,6.61-20.92,8.05-30.36,8.05a1.73,1.73,0,0,0,.48.57c.11.14.23.25.34.37,9.7,0,23.61-1.53,31.18-8.28a12.89,12.89,0,0,1-1.53-.71c-8.73,6-22.79,7-33.08,6.52a1,1,0,0,0,.48.46,3.15,3.15,0,0,0-.37-.35,192.25,192.25,0,0,1-38.49-7.56,200.74,200.74,0,0,1-23.13-9.93c-12.19-6.49-22.82-13.57-34.39-21.14-4-3.06-7.9-6.15-11.82-9.33-6-5.19-11.67-10.74-17.71-16-3.18-2.69-6.49-5.41-9.92-7.91a42.66,42.66,0,0,0-9-5,10.66,10.66,0,0,0-1.79-.45,6.3,6.3,0,0,0-3.06.11,2.74,2.74,0,0,0-1.3,1.53c-.6,1.76.11,4.14.82,5.67,1.65,4.26,5,8.62,7.91,11.82a48.71,48.71,0,0,0,13,10.49c10,5.22,20.18,10.29,30.22,15.59,9.21,4.51,18.08,9.47,27.18,14.06a218.35,218.35,0,0,0,31.41,13.72,158.45,158.45,0,0,0,43.34,6.61c-.11-.12-.23-.23-.34-.37Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M102,92c29.17,13.46,48,23.86,75.34,41,28.6,17.83,43.26,24.81,75,36,43.59,15.37,78,46.89,116.93,70.5,15,9,30.13,17.6,45.24,26.25-15.82-7.23-31.75-14.32-47.48-22-35.89-17.38-66.25-39.57-103.35-53.15-35.66-13-60.95-28.23-90.94-51.16C147.26,120,129.66,108,102,92Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M789.08,356.66c4.82,2.23,9.78,4.36,14.63,6.6a440.52,440.52,0,0,1,50.57,28.6c21,14.06,41.18,29,62.59,42.86,22.3,13.95,45.09,25,67.06,38.64,1,.68,1.9,1.27,2.84,2,20.58,13.84,84.22,28,93.43,11.11-2.84-36.62-53.26-47.36-81.84-52.92h-.25c-25-5-46.63-9.07-70.73-18.17-23.64-9.44-44.78-21.15-67.43-32.85a575.16,575.16,0,0,0-53.64-24.92c-4.61-1.87-9.21-3.77-13.83-5.56-11.31-4.36-22.31-8.5-33.31-13.69-13.32-6.6-24.09-13.69-36.48-22.08,11.79,9.33,22,17.12,35.07,24.8,10.29,5.79,20.69,10.63,31.32,15.6Z"
					/>
					<path
						fill={PRIMARY_MAIN}
						fillRule="evenodd"
						d="M899.26,435a71,71,0,0,0,10,13.72c20.78,21,42.74,28.68,71.34,34.13,5.31.71,10.38,1.05,15.82,1.3,11.57-.59,31.66-13.35,25.51-20.1-5.18-3.29-28.82,6-35.2,7.94a20.53,20.53,0,0,1-2.58.82c-29.54,3.06-52.1-6.86-73.48-26.81a112.93,112.93,0,0,1-9.21-10.52c-5.3-8.5-8.84-19-7.2-29.06-2.35,9.7.23,20,5,28.58Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M899.26,435h-.59A79.63,79.63,0,0,0,909.07,449c11.23,11.59,21.71,18.08,36.48,24.35a178.18,178.18,0,0,0,35,9.78c5.42.71,10.6,1.07,16.05,1.3,6,.23,12.16-2.24,17.12-5.53,3.43-2.49,8.27-6.74,9.69-10.77a5.61,5.61,0,0,0,.26-2.46,3.11,3.11,0,0,0-1.42-2c-.26-.11-.6-.22-1-.37a9.15,9.15,0,0,0-3.06-.45,39.82,39.82,0,0,0-7.35,1.05c-8.36,2-16.15,5.19-24.32,7.79-.71.26-1.42.37-2.24.6-15.82,2.13-28.23,0-43.11-6a96.94,96.94,0,0,1-30.36-20.69A107.28,107.28,0,0,1,902,435.32c-.11,0-.36.11-.48.11H902c-5.18-8.39-8.76-18.79-7.08-28.83-.37-.11-.71-.34-1.08-.45-2.58,9.69.11,20.07,4.85,28.8h1.07c-4.62-8.51-7.34-18.77-4.84-28.35a1.36,1.36,0,0,0-.6-.23.94.94,0,0,0-.48-.22c-1.76,10.15,1.9,20.78,7.23,29.28a103,103,0,0,0,9.44,10.86A97.57,97.57,0,0,0,941,466.84a81.64,81.64,0,0,0,43.12,6.38c.93-.23,2-.57,3.06-.94,6.15-1.9,12.16-4.14,18.31-6a83.9,83.9,0,0,1,9.33-2.27c1.3-.22,2.49-.34,3.76-.45a10.11,10.11,0,0,1,2.61.34c.12.11.34.11.48.23a1.89,1.89,0,0,1,.83,1.3,3.74,3.74,0,0,1-.23,2.24c-1.3,4-6,8.28-9.47,10.52-4.59,3.2-10.63,5.78-16.41,5.55-5.33-.22-10.4-.59-15.59-1.3-12.53-2.35-23-5-35-9.67-14.77-6.26-25.29-12.87-36.4-24.46A76.89,76.89,0,0,1,899.74,435Z"
					/>
					<path
						fill={PRIMARY_MAIN}
						fillRule="evenodd"
						d="M845.89,358.41a88,88,0,0,1,25,6.15c23.86,8.73,43.45,23.28,62.7,39.35,2.27,1.87,4.36,3.77,6.63,5.64,5.19,5.44,14.63,26.59,5.67,26.93-6.86-2.35-13.95-16.75-17.49-22.91-.93-1.53-1.87-2.94-2.83-4.36-12.39-18.54-35.18-34.84-56-42.29a121.68,121.68,0,0,0-22.08-6.83c-8.73-1.08-18.79-.26-26,5.3,6.37-5.9,15.84-7.43,24.35-7Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M845.89,358.41c0,.26.11.37.11.48a89.29,89.29,0,0,1,24.8,6C882,368.82,891,373.78,901.05,380a342.33,342.33,0,0,1,32.46,24.21c2.12,1.9,4.25,3.66,6.37,5.55a20.19,20.19,0,0,1,4.25,5.56,39.36,39.36,0,0,1,4.14,10.86c.49,2.35,1,6.15,0,8.39a1.92,1.92,0,0,1-1,1.3,2.86,2.86,0,0,1-1.41.23c-.26-.12-.48-.23-.85-.37-1.65-.68-3.4-2.58-4.59-4a82.28,82.28,0,0,1-7.57-11.34c-1.42-2.49-2.72-4.84-4.14-7.31-.82-1.3-1.65-2.72-2.58-4-8.28-12.17-20.07-22.68-32.49-30.59a117.21,117.21,0,0,0-23.86-11.93,131.87,131.87,0,0,0-22.31-7v.12c-.12,0-.12,0-.12-.12-8.87-1.05-19-.11-26.22,5.45a1.88,1.88,0,0,0,.46.34,4,4,0,0,0,.48.36c6.38-5.92,15.7-7.45,24.09-6.86a.59.59,0,0,1-.22-.48c-.15-.11-.15-.23-.23-.34-8.65-.59-18.09.94-24.58,7,.23.22.6.45.83.7,7.31-5.44,17.12-6.37,25.85-5.21a.81.81,0,0,1-.23-.45c0,.11.11.22.11.45a118.19,118.19,0,0,1,21.74,6.63,123.83,123.83,0,0,1,23.84,11.93c12.19,7.8,23.87,18.06,32,30.11.93,1.53,2,3.2,3,4.85,2,3.54,4,7.08,6.12,10.51a47.84,47.84,0,0,0,5.21,7.32,17.66,17.66,0,0,0,5.19,4.59c.37.14.82.25,1.19.37a3.77,3.77,0,0,0,2.24-.23,5.33,5.33,0,0,0,1.16-1.53,9.7,9.7,0,0,0,.48-5.33,38.63,38.63,0,0,0-2.94-10.86,28.72,28.72,0,0,0-6.27-9.58c-2.24-1.87-4.48-3.77-6.72-5.67a344.66,344.66,0,0,0-32.48-24.2c-9.21-5.9-19.73-11.68-30.25-15.11a86.44,86.44,0,0,0-25.48-6.27c.08.11.08.23.23.34Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M920.75,463.66c-37.67-13-66.47-21.85-105.71-30.58-64.82-14.29-55.72-18.31-106.07-51.85-32.68-21.74-46.17-27-75.8-55.16l7.8,6.12c29.17,22.23,55.5,30.84,86.2,48.9,34.5,20.32,51.85,29.05,90.71,41.7,38.41,12.53,66.39,24.21,102.87,40.87Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M559.81,498.73c1.65.22,3.32.59,5,.85C599,505.13,633,510.89,666.45,520.1c23.87,7.09,42,16.07,64.52,25.17,31.18,12.39,59.53,19.73,92.35,26.34,41.7,8.16,81.72,13.12,123.54,19.13,5.92.48,11.93,1,17.83,1.3,26.33,1.31,41-3.79,63.07-17.71,9.58-6.86,80.56-68.15,73.36-80.45-31-9.07-75.83,20.44-100.63,35.57C982.77,540.2,976,544.22,955,547.4c-2.83.34-5.56.71-8.39.93-38.52,4.51-80.79,2.95-119.54,0-32-3.28-60.09-7.79-91.05-16.64-23.16-7.31-43-15.25-67-21.14-33.87-7.43-68.85-12.05-103.32-16.78l-2.5-.34c-30.47-4.14-61.65-8.28-92.35-9.92a225.73,225.73,0,0,0-49,1.87,267.74,267.74,0,0,1,48.87.14c29.76,3.17,59.53,8.25,89.06,13.21Z"
					/>
					<path
						fill={PRIMARY_MAIN}
						fillRule="evenodd"
						d="M784.69,573.51c11.93,6.83,22.93,11.08,35.91,15.22A311.42,311.42,0,0,0,947,602.9c16.78-1.42,29.65-3.54,45.13-10.37,13-6.75,25.74-20.33,24.69-36.15a6.21,6.21,0,0,0-2.24-3.79,4.71,4.71,0,0,0-3.8.36c-16.64,9.22-19.36,23.28-48.9,35.92a86,86,0,0,1-15,4.36c-39.09,11.8-87.4,3.89-125.78-7.79a239.2,239.2,0,0,1-32.14-11.71c-11.79-6.26-26.82-16.78-30.59-30.47,2.27,13.24,15.48,23.87,26.34,30.25Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M784.69,573.51a2.38,2.38,0,0,1-.94.11c12.16,7,23.39,11.34,36.74,15.48,24.91,8.39,48.19,12.27,74.29,14.51,17.83,1.3,34.25,1.67,52.19-.34,17-1.42,30.13-3.54,45.72-10.52a45.71,45.71,0,0,0,21.86-21.85c1.75-4.14,3.17-8.14,3.43-12.64a10.63,10.63,0,0,0-1.31-4.6,4.38,4.38,0,0,0-2-1.78,1.6,1.6,0,0,0-.71-.23,10.5,10.5,0,0,0-3.09.82c-.57.23-1.16.6-1.75.82a48.09,48.09,0,0,0-4.63,3.43c-2.94,2.5-5.66,5.33-8.36,8-10.74,10.77-20.92,18.42-35.32,24a88.63,88.63,0,0,1-13.94,4.14c-20.78,6.86-42.52,6.37-64.26,4.62a285.29,285.29,0,0,1-61.4-12.42,221.85,221.85,0,0,1-31.41-11.56,8.47,8.47,0,0,0-.85.22,2.87,2.87,0,0,1,1-.11c-11.7-6.15-26.81-16.67-30.58-30.13-.6-.12-1.2-.34-1.79-.46,2,13.35,15.48,24.1,26.22,30.59a2.38,2.38,0,0,0,.94-.11h1c-10.74-6.27-24.24-16.9-26.33-30a3.61,3.61,0,0,0-1-.23,2.4,2.4,0,0,0-.82-.11c3.54,13.69,18.91,24.46,30.7,30.58a233.75,233.75,0,0,0,32.85,12.16,292.47,292.47,0,0,0,61.52,12.3c21.62,1.76,43.36,2.24,64.26-4.36a109,109,0,0,0,16-4.73,93.56,93.56,0,0,0,27.86-17.72c3.77-3.32,7.09-7,10.63-10.52,1.42-1.41,3-2.72,4.37-4.14a31.22,31.22,0,0,1,3.77-2.72,6.66,6.66,0,0,1,1.07-.59,3.11,3.11,0,0,1,2.47-.23,2.64,2.64,0,0,1,2,1.42c2.5,4.14-.71,13.12-2.46,17.12a43.65,43.65,0,0,1-21,20.69c-15.22,6.72-28.09,8.73-44.53,10.15-17.83,1.9-34.24,1.64-52.07.34-26.11-2.24-49.5-6.12-74.3-14.65a177.22,177.22,0,0,1-35-14.74Z"
					/>
					<path
						fill={PRIMARY_MAIN}
						fillRule="evenodd"
						d="M660.08,492.6a110.05,110.05,0,0,1,13.94-.25c27.41,3.2,44.42,9,70.05,17.6,28.71,9.47,55.5,18.2,85,25.88,3.54,1,7.19,2.13,10.85,3.06,6.49,2.24,49.86,24.1,30.84,26.82-13.24-.71-32.11-11.11-43.71-17.38-5.18-2.35-10.26-4.84-15.47-7.08-22.54-10-45.58-19.59-68.74-28.09-25.26-9.1-42.38-14.77-69.45-18.8-3.43-.22-6.72-.34-10.15-.48-11.57.48-29.06,2.61-38.38,9.92,7.91-7.79,24.57-10.49,35.18-11.2Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M660.08,492.6a1.7,1.7,0,0,1,.48.34c4.5-.22,8.87-.34,13.35-.22,27.41,3.17,44.3,9,69.93,17.6,3.66,1.16,7.2,2.35,10.74,3.54,25,8.25,48.9,15.71,74.41,22.31,3.55,1.08,7.09,2.13,10.63,3.09a74.41,74.41,0,0,1,12.16,5,72.21,72.21,0,0,1,15.93,10.38c1.9,1.64,6.41,5.92,6.16,8.73a1.88,1.88,0,0,1-1,1.56,6.14,6.14,0,0,1-2.5.45,8.23,8.23,0,0,1-1.64-.11,42.83,42.83,0,0,1-11.6-3.18,180.42,180.42,0,0,1-22.19-10c-2.58-1.42-5.19-2.86-7.8-4.28-4.84-2.1-9.66-4.48-14.51-6.61-22.08-9.8-44.9-19.36-67.69-27.63-.6-.23-1.31-.46-1.87-.71-25.29-9.1-42.41-14.77-69.45-18.77-3.57-.25-7.12-.37-10.63-.48h-.14c-11.8.34-29.4,2.72-39.09,9.92l1.19.34a3.18,3.18,0,0,1,1.05.26c7.82-7.69,24.35-10.29,34.75-11a1.32,1.32,0,0,0-.62-.46c-.09-.25-.35-.36-.46-.48-10.74.82-27.75,3.55-35.91,11.34.71.23,1.41.34,2,.6,9.69-7.09,26.59-9.33,38.15-9.7a4.59,4.59,0,0,1-.59-.48c.23.26.37.37.48.48,3.18.12,6.38.23,9.55.48,27.05,3.89,44.17,9.56,69.45,18.66.6.25,1.31.48,1.9.7,22.2,8,44.65,17.38,66.25,27.16,5.33,2.49,10.63,5,16.07,7.46,4.48,2.46,9.1,4.84,13.69,7.2,4.85,2.35,9.81,4.59,14.88,6.49a61.91,61.91,0,0,0,13,3.54c.84,0,1.67.11,2.49.11a10.69,10.69,0,0,0,3.91-.82,2,2,0,0,0,1.16-1.76c.26-2-1.64-4.36-2.83-5.66-3.54-4-9.07-7.8-13.58-10.64a87.57,87.57,0,0,0-19.25-8.61c-3.77-1.08-7.56-2.13-11.33-3.21-25.4-6.6-49.24-14-74.3-22.3-3.54-1.19-7.09-2.39-10.63-3.55-25.63-8.64-42.63-14.4-70-17.71-5-.15-9.66,0-14.51.22.11.12.37.23.46.48Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M1045.36,584.84c-4.37,43-11,57.75-55,47-62.28-15.11-96.63-8.5-159.7-2-60.35,6.15-87.76,7.34-147.29-2.13-53.61-8.5-81-3.88-134.17-.34-53.74,3.55-182-.11-224.75-34.72C271.62,550,292.54,437.19,312.49,381.46c16-44.42,40.05-89.18,62.36-131-22,45.84-46.17,95.19-59.86,143.86-13.36,47-25.77,143.37,12.16,180.93,37.44,37.34,170.07,31.18,221.1,29.91,54.68-1.33,83.14-4.74,138,6.35,57.88,11.71,84.1,11.48,143.4,7.93,64.12-3.91,99.21-9.09,161.58,8.85,42,12.16,48-1.76,54.08-43.46Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M452.47,476.76c6.12-48.05,9.21-63.3,46.63-87.62,14.06-9.1,17-10.63,27.52-25.29,11.34-16,17.38-28.94,23.87-48.78-4.48,26.11-12.39,50.68-26.22,71.35-11.57,17.23-17.24,19.36-32.83,26.81-26.59,12.76-30.13,32.12-39,63.53Z"
					/>
					<path
						fill={DEFAULT}
						fillRule="evenodd"
						d="M572.68,212.91c32.26-22.45,64.38-38.38,105.14-34.95,40,3.43,68.48,33.42,69.56,73.81,2.24,87.17-174.92,81.84-192.53,42.86-2.24-5-2.6-10.26-3.17-15.59,2.35,13,4.25,20.44,17.35,26.48,40.16,18.42,146.46,10.26,160.49-39.09,11-38.27-12.72-74.3-52.66-80.56-39-6-71.58,7.68-104.18,27Z"
					/>
				</g>
			</svg>
		</Box>
	);
}
