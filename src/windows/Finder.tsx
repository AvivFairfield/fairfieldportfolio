import React from "react";
import WindowControls from "../components/WindowControls";
import { Search } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";

const Finder = () => {
	const { activeLocation, setActiveLocation } = useLocationStore() as {
		activeLocation: {
			id: number;
			name: string;
			icon: string;
			kind: string;
			children?: Array<{
				id: number;
				name: string;
				icon: string;
				kind: string;
				position?: string;
			}>;
		};
		setActiveLocation: (location: {
			id: number;
			name: string;
			icon: string;
			kind: string;
			children?: Array<{
				id: number;
				name: string;
				icon: string;
				kind: string;
				position?: string;
			}>;
		}) => void;
	};

	const openItem = (item) => {};

	const renderList = (
		items: Array<{ id: number; name: string; icon: string; kind: string }>
	) =>
		items.map((item) => (
			<li
				key={item.id}
				onClick={() => setActiveLocation(item)}
				className={clsx(
					item.id === activeLocation.id ? "active" : "non-active"
				)}
			>
				<img src={item.icon} className="w-4" alt={item.name} />
				<p className="text-sm font-medium truncate">{item.name}</p>
			</li>
		));

	return (
		<>
			<div id="window-header">
				<WindowControls target="finder" />
				<Search className="icon" />
			</div>

			<div className="bg-white flex h-full">
				<div className="sidebar">
					<div>
						<h3>Favorites</h3>
						<ul>{renderList(Object.values(locations))}</ul>
					</div>
					<div>
						<h3>Work</h3>
						<ul>
							{renderList(
								locations.work.children.map((child) => ({
									id: child.id,
									name: child.name,
									icon: child.icon,
									kind: child.kind,
								}))
							)}
						</ul>
					</div>
				</div>
				<ul className="content">
					{activeLocation?.children?.map((item) => (
						<li
							key={item.id}
							className={item.position}
							onClick={() => openItem(item)}
						>
							<img src={item.icon} alt={item.name} />
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
