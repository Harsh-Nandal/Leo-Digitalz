"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Preloader({ onFinish }) {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    // Strong visible curve animation
    tl.to("#preloaderPath", {
      duration: 1.4,
      attr: {
        d: "M0,0 C250,400 750,400 1000,0 L1000,0 L0,0 Z",
      },
      ease: "power4.inOut",
    })
      // Slide up smoothly
      .to(".preloader", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
      });
  }, [onFinish]);

  return (
    <div className="preloader fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none overflow-hidden">
      
      {/* ONLY SVG — NO background */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
      >
        <path
          id="preloaderPath"
          d="M0,1000 C250,600 750,600 1000,1000 L1000,0 L0,0 Z"
          fill="#000"
        />
      </svg>
    </div>
  );
}