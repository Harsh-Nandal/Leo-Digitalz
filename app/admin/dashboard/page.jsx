"use client";

import { useEffect, useState } from "react";
import {
  PiNote,
  PiUsers,
  PiAddressBook,
} from "react-icons/pi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    testimonials: 0,
    Contacts: 0, // ✅ fixed
  });

  const [analytics, setAnalytics] = useState({
    visitors: 0,
    conversionRate: 0,
    engagement: 0,
  });

  const [loading, setLoading] = useState(true);

  // 🔥 FAST FETCH
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          cache: "force-cache", // ⚡ faster
        });

        const result = await res.json();

        if (result.success) {
          setStats(result.data.stats);
          setAnalytics(result.data.analytics);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    { title: "Total Blogs", value: stats.blogs, icon: <PiNote /> },
    { title: "Testimonials", value: stats.testimonials, icon: <PiUsers /> },
    { title: "Contacts", value: stats.Contacts, icon: <PiAddressBook /> },
  ];

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      <h1 style={{ marginBottom: "25px" }}>📊 Admin Dashboard</h1>

      {/* ✅ LOADING SKELETON */}
      {loading ? (
        <div>
          {/* Cards Skeleton */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#1a1a1a",
                  padding: "20px",
                  borderRadius: "12px",
                  height: "100px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
          </div>

          {/* Analytics Skeleton */}
          <div
            style={{
              marginTop: "40px",
              background: "#1a1a1a",
              padding: "20px",
              borderRadius: "12px",
              height: "150px",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
      ) : (
        <>
          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: "#1a1a1a",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "0.3s",
                }}
              >
                <div style={{ fontSize: "22px", color: "#ff6a00" }}>
                  {card.icon}
                </div>

                <h2 style={{ margin: "10px 0", fontSize: "26px" }}>
                  {card.value}
                </h2>

                <p style={{ color: "#aaa" }}>{card.title}</p>
              </div>
            ))}
          </div>

          {/* ANALYTICS */}
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ marginBottom: "20px" }}>📈 Website Analytics</h2>

            <div
              style={{
                background: "#1a1a1a",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              {/* Visitors */}
              <div style={{ marginBottom: "20px" }}>
                <p>Total Visitors ({analytics.visitors})</p>
                <div style={{ height: "8px", background: "#333", borderRadius: "10px" }}>
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      background: "#ff6a00",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>

              {/* Conversion */}
              <div style={{ marginBottom: "20px" }}>
                <p>Conversion Rate ({analytics.conversionRate}%)</p>
                <div style={{ height: "8px", background: "#333", borderRadius: "10px" }}>
                  <div
                    style={{
                      width: `${analytics.conversionRate}%`,
                      height: "100%",
                      background: "#ff6a00",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>

              {/* Engagement */}
              <div>
                <p>Engagement ({analytics.engagement}%)</p>
                <div style={{ height: "8px", background: "#333", borderRadius: "10px" }}>
                  <div
                    style={{
                      width: `${analytics.engagement}%`,
                      height: "100%",
                      background: "#ff6a00",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 🔥 Skeleton Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
}