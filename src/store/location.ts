import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,
		setActiveLocation: (location = null) =>
			set((state: { activeLocation: null }) => {
				state.activeLocation = location;
			}),
		resetActiveLocation: () =>
			set(
				(state: {
					activeLocation: {
						id: number;
						type: string;
						name: string;
						icon: string;
						kind: string;
						children: {
							id: number;
							name: string;
							icon: string;
							kind: string;
							position: string;
							windowPosition: string;
							children: (
								| {
										id: number;
										name: string;
										icon: string;
										kind: string;
										fileType: string;
										position: string;
										description: string[];
										href?: undefined;
										imageUrl?: undefined;
								  }
								| {
										id: number;
										name: string;
										icon: string;
										kind: string;
										fileType: string;
										href: string;
										position: string;
										description?: undefined;
										imageUrl?: undefined;
								  }
								| {
										id: number;
										name: string;
										icon: string;
										kind: string;
										fileType: string;
										position: string;
										imageUrl: string;
										description?: undefined;
										href?: undefined;
								  }
							)[];
						}[];
					};
				}) => {
					state.activeLocation = DEFAULT_LOCATION;
				}
			),
	}))
);

export default useLocationStore;
