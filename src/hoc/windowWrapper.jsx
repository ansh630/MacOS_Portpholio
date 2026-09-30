import React, { useLayoutEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import useWindowStore from '#store/windows.js';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

const WindowWrapper = (Component, windowKey) => {
	const Wrapped = (props) => {
		const { focusWindow, windows } = useWindowStore();
		const { isOpen, zIndex } = windows[windowKey] || {};
		const ref = useRef(null);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return;

			el.style.display = 'block';

			gsap.fromTo(
				el,
				{ scale: 0.8, opacity: 0, y: 40 },
				{ scale: 1, opacity: 1, y: 0, duration: 0.4, ease:
				"power3.out" },
		);
		}, [isOpen]);

       useGSAP(() => {
		const el = ref.current;
		if (!el || !isOpen) return;

		const [draggable] = Draggable.create(el, {
			type: "x,y",
			cursor: "grab",
			activeCursor: "grabbing",
			onPress: () => focusWindow(windowKey),
		});

 			 return () => draggable.kill();
		}, [isOpen, windowKey]);


		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;
			el.style.display = isOpen ? 'block' : 'none';
		}, [isOpen]);

		if (!isOpen) return null;

		return (
			<section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
				<Component {...props} />
			</section>
		);
	};

	Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

	return Wrapped;
};

export default WindowWrapper;