// Home.tsx
import React, { type FC } from "react";
import clsx from "clsx";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

gsap.registerPlugin(Draggable);

// Match the types you already use in Finder
type Location = (typeof locations)[keyof typeof locations];
type LocationItem = Location["children"][number] & { windowPosition: string };

// All projects shown on the desktop (from `locations.work.children`)
const projects: LocationItem[] = locations.work?.children ?? [];

const Home: FC = () => {
	const { setActiveLocation } = useLocationStore();
	const { openWindow } = useWindowStore();

	const handleOpenProjectFinder = (project: LocationItem) => {
		// project is a child; cast to Location so it can become the activeLocation
		setActiveLocation(project as unknown as Location);
		openWindow("finder");
	};

	useGSAP(() => {
		Draggable.create(".folder");
	}, []);

	return (
		<section id="home">
			<ul>
				{projects.map((project) => (
					<li
						key={project.id}
						className={clsx("group folder", project.windowPosition)}
						onClick={() => handleOpenProjectFinder(project)}
					>
						<img src="/images/folder.png" alt={project.name} />
						<p>{project.name}</p>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Home;
