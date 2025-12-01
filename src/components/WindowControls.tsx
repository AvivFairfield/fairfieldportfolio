import React, { type FC } from "react";
import useWindowStore, { type WindowKey } from "../store/window";

type WindowControlsProps = {
	target: WindowKey;
};

const WindowControls: FC<WindowControlsProps> = ({ target }) => {
	const { closeWindow } = useWindowStore();

	return (
		<div id="window-controls">
			<button
				type="button"
				className="close"
				onClick={() => closeWindow(target)}
			/>
			<button type="button" className="minimize" />
			<button type="button" className="maximize" />
		</div>
	);
};

export default WindowControls;
