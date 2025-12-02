import React from "react";
import WindowControls from "../components/WindowControls";
import useWindowStore from "../store/window";
import WindowWrapper from "../hoc/WindowWrapper";

type ImageFileData = {
	name: string;
	imageUrl: string;
	subtitle?: string | null;
	description?: string[] | null;
};

const Image: React.FC = () => {
	// Select only the imgfile window from Zustand
	const imgWindow = useWindowStore((state) => state.windows.imgfile);

	if (!imgWindow || !imgWindow.isOpen || !imgWindow.data) return null;

	const data = imgWindow.data as ImageFileData;
	const { name, imageUrl, subtitle, description } = data;

	return (
		<>
			<div id="window-header">
				<WindowControls target="imgfile" />
				<h2>{name}</h2>
			</div>

			<div className="p-5 space-y-6 bg-white">
				{/* Display Image */}
				<div className="w-full">
					<img
						src={imageUrl}
						alt={name}
						className="w-full h-auto rounded shadow-md"
					/>
				</div>

				{/* Optional subtitle */}
				{subtitle && (
					<h3 className="text-lg font-semibold text-gray-800">
						{subtitle}
					</h3>
				)}

				{/* Optional description */}
				{Array.isArray(description) && description.length > 0 && (
					<div className="space-y-3 leading-relaxed text-base text-gray-700">
						{description.map((para, idx) => (
							<p key={idx}>{para}</p>
						))}
					</div>
				)}
			</div>
		</>
	);
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
