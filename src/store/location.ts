// location.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

// reuse this from Finder
export type Location = (typeof locations)[keyof typeof locations];

const DEFAULT_LOCATION: Location = locations.work;

type LocationStoreState = {
	activeLocation: Location;
	setActiveLocation: (location: Location) => void;
	resetActiveLocation: () => void;
};

const useLocationStore = create<LocationStoreState>()(
	immer((set) => ({
		activeLocation: DEFAULT_LOCATION,
		setActiveLocation: (location) =>
			set((state) => {
				state.activeLocation = location;
			}),
		resetActiveLocation: () =>
			set((state) => {
				state.activeLocation = DEFAULT_LOCATION;
			}),
	}))
);

export default useLocationStore;
