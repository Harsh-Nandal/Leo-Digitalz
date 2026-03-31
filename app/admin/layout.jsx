"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import {
  PiHouse,
  PiNote,
  PiUsers,
  PiAddressBook,
  PiSignOut,
  PiBriefcase,
  PiGear,
  PiUserCircle, // ✅ NEW TEAM ICON
} from "react-icons/pi";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin-login");
    }
  }, []);

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <PiHouse /> },
    { name: "Blogs", path: "/admin/blogs", icon: <PiNote /> },

    { name: "Portfolio", path: "/admin/portfolio", icon: <PiBriefcase /> },

    // ✅ SERVICES
    { name: "Services", path: "/admin/services", icon: <PiGear /> },

    // ✅ NEW TEAM SECTION ADDED
    { name: "Team", path: "/admin/team", icon: <PiUserCircle /> },

    { name: "Testimonials", path: "/admin/testimonials", icon: <PiUsers /> },
    { name: "Leads", path: "/admin/leads", icon: <PiAddressBook /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "#0d0d0d",
          color: "#fff",
          padding: "25px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* LOGO */}
        <div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "30px",
              color: "#ff6a00",
              letterSpacing: "1px",
              textAlign: "center",
            }}
          >
            <Image
              src="/assets/images/logo/main_logo_header.png"
              alt="Logo"
              width={200}
              height={50}
            />
          </div>

          {/* NAV */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {menu.map((item, i) => {
              
              const active = pathname.startsWith(item.path);

              return (
                <Link
                  key={i}
                  href={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: active ? "#fff" : "#aaa",
                    background: active
                      ? "linear-gradient(90deg, #ff6a00, #ff8c42)"
                      : "transparent",
                    transition: "0.3s",
                    fontWeight: active ? "600" : "400",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "#1a1a1a";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#aaa";
                    }
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            router.push("/admin-login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "rgba(255,106,0,0.1)",
            color: "#ff6a00",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ff6a00";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,106,0,0.1)";
            e.currentTarget.style.color = "#ff6a00";
          }}
        >
          <PiSignOut /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          padding: "25px",
          background: "#121212",
          color: "#fff",
        }}
      >
        {children}
      </main>
    </div>
  );
}