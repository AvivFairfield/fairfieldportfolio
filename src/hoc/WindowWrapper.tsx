// src/hoc/WindowWrapper.tsx
import { type ComponentType, type FC, useLayoutEffect, useRef } from "react";
import useWindowStore, { type WindowKey } from "../store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function WindowWrapper<P extends object>(
	Component: ComponentType<P>,
	windowKey: WindowKey
): FC<P> {
	const Wrapped: FC<P> = (props) => {
		const { focusWindow, windows } = useWindowStore();
		const { isOpen, zIndex } = windows[windowKey];
		const ref = useRef<HTMLElement | null>(null);

		// Open animation when isOpen changes to true
		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			el.style.display = "block";

			gsap.fromTo(
				el,
				{ scale: 0.8, opacity: 0, y: 40 },
				{
					scale: 1,
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: "power3.out",
				}
			);
		}, [isOpen]);

		// Draggable instance (once, then cleanup)
		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			const [instance] = Draggable.create(el, {
				onPress: () => focusWindow(windowKey),
			});

			return () => {
				instance.kill();
			};
		}, [focusWindow, windowKey]);

		// Show / hide based on isOpen
		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			el.style.display = isOpen ? "block" : "none";
		}, [isOpen]);

		return (
			<section
				id={String(windowKey)}
				ref={ref}
				style={{ zIndex }}
				className="absolute"
			>
				<Component {...(props as P)} />
			</section>
		);
	};

	Wrapped.displayName = `WindowWrapper(${
		Component.displayName || Component.name || "Component"
	})`;

	return Wrapped;
}

export default WindowWrapper;
