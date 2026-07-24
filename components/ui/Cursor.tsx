"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /* Check for touch device */
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    const xTo = gsap.quickTo(cursor, "left", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "top", {
      duration: 0.35,
      ease: "power3.out",
    });

    function handleMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function handleMouseEnter() {
      cursor?.classList.add("hover");
    }

    function handleMouseLeave() {
      cursor?.classList.remove("hover");
    }

    window.addEventListener("mousemove", handleMouseMove);

    /* Add hover effect to all interactive elements */
    const interactives = document.querySelectorAll(
      "a, button, [data-cursor-hover], input, textarea, select"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    /* Observe DOM changes to attach to new interactive elements */
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select"
      );
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
