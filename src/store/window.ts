import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

// -----------------------------------------
// TYPES
// -----------------------------------------

export type WindowKey = keyof typeof WINDOW_CONFIG;

export interface WindowState {
	isOpen: boolean;
	zIndex: number;
	data: unknown | null;
}

export type WindowStoreState = {
	windows: Record<WindowKey, WindowState>;
	nextZIndex: number;

	openWindow: (key: WindowKey, data?: unknown) => void;
	closeWindow: (key: WindowKey) => void;
	focusWindow: (key: WindowKey) => void;
};

export const useWindowStore = create<WindowStoreState>()(
	immer((set) => ({
		windows: WINDOW_CONFIG,
		nextZIndex: INITIAL_Z_INDEX + 1,

		openWindow: (windowKey, data = null) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;

				win.isOpen = true;
				win.zIndex = state.nextZIndex;
				win.data = data ?? win.data;

				state.nextZIndex++;
			}),

		closeWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;

				win.isOpen = false;
				win.zIndex = INITIAL_Z_INDEX;
				win.data = null;
			}),

		focusWindow: (windowKey) =>
			set((state) => {
				const win = state.windows[windowKey];
				if (!win) return;

				win.zIndex = state.nextZIndex++;
			}),
	}))
);

export default useWindowStore;
