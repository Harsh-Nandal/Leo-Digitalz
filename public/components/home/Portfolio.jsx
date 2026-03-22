"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const portfolioData = [
  { id: 1, title: "BRANDING STRATEGY FOR MODERN STARTUPS", image: "/assets/images/thumbs/portfolio-thumb1.jpg" },
  { id: 2, title: "Branding Tactics for Emerging Startups", image: "/assets/images/thumbs/portfolio-thumb2.jpg" },
  { id: 3, title: "Building a Strong Brand Identity for Startups", image: "/assets/images/thumbs/portfolio-thumb3.jpg" },
  { id: 4, title: "Branding Playbook for the New-Age Startup", image: "/assets/images/thumbs/portfolio-thumb4.jpg" },
];

export default function Portfolio() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="portfolio-area" ref={containerRef}>
      <div className="sticky-wrapper">
        {portfolioData.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            index={index}
            total={portfolioData.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <style jsx global>{`
        .portfolio-area {
          background: #000;
          /* Tighter height to remove big gaps between slides */
          height: 400vh; 
        }

        .sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center; /* Vertical Center */
          justify-content: center; /* Horizontal Center */
          overflow: hidden;
        }

        .portfolio-card {
          position: absolute;
          /* Reduced size for better 'Card' look */
          width:90%; 
          height: 100vh;
          border-radius: 30px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .overlay {
          width: 100%;
          padding: 10px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          color: white;
        }

        h2 {
          font-size: clamp(22px, 3vw, 36px);
          font-weight: 700;
          margin: 0;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .portfolio-card {
            width: 90%;
            height: 60vh;
          }
        }
      `}</style>
    </section>
  );
}

function Card({ item, index, progress, total }) {
  // Logic: 
  // start: when the card begins its journey
  // end: when the card is fully in place
  const start = index / total;
  const end = (index + 1) / total;

  // 1. SLIDE UP (New card comes over the old one)
  // First card starts at 0, others start at 100% height (off-screen)
  const y = useTransform(
    progress, 
    [start, end], 
    [index === 0 ? 0 : 800, 0]
  );

  // 2. SCALE DOWN (The previous card shrinks only when the NEXT one starts arriving)
  // We look at the 'start' of the NEXT index to trigger shrinking
  const nextCardStart = (index + 1) / total;
  const scale = useTransform(
    progress,
    [nextCardStart, nextCardStart + 0.1],
    [1, index === total - 1 ? 1 : 0.7] // Last card never shrinks
  );

  return (
    <motion.div
      className="portfolio-card"
      style={{
        backgroundImage: `url(${item.image})`,
        y,
        scale,
        // ✅ CRITICAL FIX: Higher index must have higher zIndex to appear ON TOP
        zIndex: index, 
      }}
    >
      <div className="overlay">
        <h2>{item.title}</h2>
      </div>
    </motion.div>
  );
}