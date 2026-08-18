import { useRef } from "react";
import { Tooltip } from 'react-tooltip';
import { useGSAP } from '@gsap/react';
import { dockApps } from "#constants";
import gsap from "gsap";

import useWindowStore from "#store/windows.js";

const Doc = () => {
   const { openWindow, closeWindow, windows} = useWindowStore();
    const dockref = useRef(null);
    
    useGSAP(() => {
        const dock = dockref.current;
        if (!dock) return;

        const icons = dock.querySelectorAll('.dock-icon');
        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();
            icons.forEach(icon => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const iconCenter = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - iconCenter);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);
                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };
        const handleMouseMove = (event) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(event.clientX - left);
        };
        const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
            scale: 1, y: 0, duration: 0.3, ease: "power1.out"
        }));
        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };


    }, []);

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const appWindow = windows[app.id];
        if (appWindow && appWindow.isOpen) {
        closeWindow(app.id);
        } else {
        openWindow(app.id);
        }
        console.log(windows);
    };
    return (
        <section id="dock">
            <div ref={dockref} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button type="button"
                            className="dock-button"
                            aria-label={name} data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}>
                            <img src={'/images/' + icon} alt={name}
                                loading='lazy'
                                className={`dock-icon ${canOpen ? '' : 'opacity-60'}`} />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
}

export default Doc;