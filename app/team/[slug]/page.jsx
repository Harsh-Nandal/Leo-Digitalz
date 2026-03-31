import Team from "@/models/Team";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import Footer from "@/public/components/layout/Footer";

export default async function Page({ params }) {
  await connectDB();

  const { slug } = await params;

  // ✅ SAFE SLUG (IMPORTANT FIX)
  const member = await Team.findOne({
    slug: slug.toLowerCase(),
  }).lean();

  if (!member) return notFound();

  // ✅ SAFE DATA (CRITICAL FIX)
  const description =
    member.description && member.description.length > 0
      ? member.description
      : ["No description available"];

  return (
    <>
    <Header />
    <Breadcrumbs items={[
        { label: "Our Team", link: "/team" },
        { label: member.name, link: `/team/${member.slug}` }
      ]} />
      <section
        className="team-details-area py-140"
        style={{ backgroundColor: "black" }}
      >
        <div className="container">
          <div className="row">
            {/* LEFT IMAGE */}
            <div className="col-xl-6">
              <div className="team-details-thumb">
                <img
                  className="tw-rounded-xl"
                  src={member.image || "/fallback.jpg"}
                  alt={member.name || "team"}
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-xl-6">
              <div className="team-details-wrapper tw-mt-8 tw-ms-10">
                {/* TITLE */}
                <div className="tw-mb-15">
                  <h6 className="font-body tw-text-xl fw-bold text-main-600 tw-mb-2">
                    {member.designation || "TEAM MEMBER"}
                  </h6>

                  <h2 className="tw-text-29 text-white">
                    {member.name || "No Name"}
                  </h2>

                  {/* BIO */}
                  <p className="tw-text-lg fw-medium text-white tw-mb-7">
                    {member.shortBio || "No bio available"}
                  </p>

                  {/* DESCRIPTION */}
                  {description.map((d, i) => (
                    <p key={i} className="tw-text-lg fw-medium text-white">
                      {d}
                    </p>
                  ))}
                </div>

                {/* INFO */}
                <div className="footer-address tw-mb-20">
                  <div className="contact-left">
                    {/* EXPERIENCE */}
                    <div className="contact-left-item d-flex tw-gap-6 tw-mb-6">
                      <div>
                        <span className="tw-w-15 tw-h-15 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading rounded-circle">
                          ⭐
                        </span>
                      </div>
                      <div>
                        <span className="fw-medium d-block text-white">
                          Experience
                        </span>
                        <p className="text-white">
                          {member.experience ?? 0} Years
                        </p>
                      </div>
                    </div>

                    {/* PROJECTS */}
                    <div className="contact-left-item d-flex tw-gap-6 tw-mb-6">
                      <div>
                        <span className="tw-w-15 tw-h-15 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading rounded-circle">
                          📁
                        </span>
                      </div>
                      <div>
                        <span className="fw-medium d-block text-white">
                          Projects
                        </span>
                        <p className="text-white">{member.projects ?? 0}</p>
                      </div>
                    </div>

                    {/* CLIENTS */}
                    <div className="contact-left-item d-flex tw-gap-6 tw-mb-6">
                      <div>
                        <span className="tw-w-15 tw-h-15 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading rounded-circle">
                          👥
                        </span>
                      </div>
                      <div>
                        <span className="fw-medium d-block text-white">
                          Clients
                        </span>
                        <p className="text-white">{member.clients ?? 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <div className="team-details-form">
                  <form>
                    <h2 className="tw-text-13 tw-mb-6 text-white">
                      Leave Your Message
                    </h2>

                    <div className="row">
                      <div className="col-xl-12">
                        <input
                          type="text"
                          className="w-100 mb-3 p-3 text-white"
                          placeholder="Name"
                        />
                      </div>

                      <div className="col-xl-12">
                        <input
                          type="email"
                          className="w-100 mb-3 p-3 text-white"
                          placeholder="Email"
                        />
                      </div>

                      <div className="col-xl-12">
                        <textarea
                          className="w-100 mb-3 p-3 text-white"
                          placeholder="Enter Your Message here"
                        ></textarea>
                      </div>

                      <div className="col-xl-12">
                        <button type="submit" className="btn btn-warning">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
