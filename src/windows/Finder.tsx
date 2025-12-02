// Finder.tsx
import React from "react";
import WindowControls from "../components/WindowControls";
import { Search } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";
import useWindowStore from "../store/window";

// A single top-level location (e.g. locations.work, locations.home, etc.)
type Location = (typeof locations)[keyof typeof locations];

// A single item inside activeLocation.children (things shown in the main grid)
type LocationItem = Location["children"][number];

const Finder: React.FC = () => {
	const { openWindow } = useWindowStore();
	const { activeLocation, setActiveLocation } = useLocationStore() as {
		activeLocation: Location;
		setActiveLocation: (location: Location) => void;
	};

	const renderList = (items: Location[]) =>
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

	const openItem = (item: LocationItem) => {
		console.log("Opening item:", item);

		if ("fileType" in item && item.fileType === "pdf") {
			return openWindow("resume");
		}

		if (item.kind === "folder") {
			return setActiveLocation(item as unknown as Location);
		}

		if (
			"fileType" in item &&
			["fig", "url"].includes(item.fileType) &&
			"href" in item &&
			typeof item.href === "string"
		) {
			return window.open(item.href, "_blank");
		}

		if ("fileType" in item) {
			if (item.fileType === "txt" || item.fileType === "txtfile") {
				return openWindow("txtfile", item);
			}

			if (item.fileType === "img" || item.fileType === "imgfile") {
				return openWindow("imgfile", item);
			}
		}
	};

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
						<h3>My Projects</h3>
						<ul>
							{locations.work.children.map((item) => (
								<li
									key={item.id}
									onClick={() =>
										setActiveLocation(
											item as unknown as Location
										)
									}
									className={clsx(
										item.id === activeLocation.id
											? "active"
											: "non-active"
									)}
								>
									<img
										src={item.icon}
										className="w-4"
										alt={item.name}
									/>
									<p className="text-sm font-medium truncate">
										{item.name}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				<ul className="content">
					{activeLocation?.children?.map((item) => (
						<li
							key={item.id}
							className={"position" in item ? item.position : ""}
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
