import Footer from "@/public/components/layout/Footer";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import Team from "@/models/Team";
import { connectDB } from "@/lib/mongodb";
import Link from "next/link";
import React from "react";

// ✅ REACT ICONS
import {
  PiFacebookLogo,
  PiTwitterLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
} from "react-icons/pi";

export default async function Page() {
  await connectDB();

  const teams = await Team.find({ isActive: true }).sort({ order: 1 });

  return (
    <>
      <Header />

      <Breadcrumbs items={[{ label: "Our Team", link: "/team" }]} />

      <section className="py-140" style={{ backgroundColor: "black" }}>
        <div className="container">
          <div className="row">

            {teams.map((member, index) => (
              <div className="col-xl-4 col-lg-6 col-md-6" key={member._id}>
                <div
                  className="team-five-wrapper tw-hover-btn-wrapper tw-mb-13 tw-rounded-xl overflow-hidden"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={(index + 1) * 100}
                >

                  {/* IMAGE */}
                  <div className="team-five-thumb tw-hover-btn-item tw-rounded-xl overflow-hidden">
                    <Link href={`/team/${member.slug}`}>
                      <img
                        className="tw-rounded-xl"
                        src={member.image || "/fallback.jpg"}
                        alt={member.name}
                      />
                    </Link>
                  </div>

                  {/* SOCIAL ICONS */}
                  <ul className="team-five-social d-flex align-items-center tw-gap-4 tw-mt-8 tw-mb-4 tw-pb-6">

                    {member.socialLinks?.facebook && (
                      <li>
                        <a
                          href={member.socialLinks.facebook}
                          target="_blank"
                          className="tw-w-10 tw-h-10 d-inline-flex align-items-center justify-content-center text-white rounded-circle"
                          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          <PiFacebookLogo />
                        </a>
                      </li>
                    )}

                    {member.socialLinks?.twitter && (
                      <li>
                        <a
                          href={member.socialLinks.twitter}
                          target="_blank"
                          className="tw-w-10 tw-h-10 d-inline-flex align-items-center justify-content-center text-white rounded-circle"
                          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          <PiTwitterLogo />
                        </a>
                      </li>
                    )}

                    {member.socialLinks?.instagram && (
                      <li>
                        <a
                          href={member.socialLinks.instagram}
                          target="_blank"
                          className="tw-w-10 tw-h-10 d-inline-flex align-items-center justify-content-center text-white rounded-circle"
                          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          <PiInstagramLogo />
                        </a>
                      </li>
                    )}

                    {member.socialLinks?.linkedin && (
                      <li>
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          className="tw-w-10 tw-h-10 d-inline-flex align-items-center justify-content-center text-white rounded-circle"
                          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          <PiLinkedinLogo />
                        </a>
                      </li>
                    )}

                  </ul>

                  {/* CONTENT */}
                  <div>
                    <h4 className="tw-text-8 font-inter tw-mb-4 text-white">
                      <Link href={`/team/${member.slug}`} className="text-white " style={{textDecoration:"none"}}>
                        {member.name}
                      </Link>
                    </h4>

                    <p className="text-white fw-medium">
                      {member.designation}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}