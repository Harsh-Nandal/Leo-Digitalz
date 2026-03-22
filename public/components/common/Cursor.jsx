"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const dot = document.querySelector(".dot");

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Magic Cursor */}
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>

      {/* Custom Cursor */}
      <div className="cursor"></div>
      <span className="dot"></span>
    </>
  );
}