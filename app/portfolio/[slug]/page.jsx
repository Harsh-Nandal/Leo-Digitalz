import mongoose from "mongoose";
import Portfolio from "@/models/Portfolio";
import { FiPlus } from "react-icons/fi";
import Header from "@/public/components/layout/Header";
import Footer from "@/public/components/layout/Footer";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";

// ✅ DB CONNECT
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// ✅ FETCH DATA
async function getPortfolio(slug) {
  await connectDB();
  const data = await Portfolio.findOne({ slug }).lean();
  return data ? JSON.parse(JSON.stringify(data)) : null;
}

export default async function PortfolioDetails({ params }) {
  const { slug } = await params;

  const portfolio = await getPortfolio(slug);

  if (!portfolio) {
    return (
      <h2 className="text-center mt-5 text-white">
        ❌ Portfolio Not Found
      </h2>
    );
  }

  return (
    <>
    <Header />
    <Breadcrumbs items={[
        { label: "Our Case Study", link: "/portfolio" },
        { label: portfolio.title, link: `/portfolio/${portfolio.slug}` }
      ]} />
      {/* ==================== Service Details Start ==================== */}
      <section className="service-details-area pt-140" style={{backgroundColor:"Black"}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center tw-mb-12">
                <img
                  className="tw-rounded-xl"
                  src={portfolio.coverImage}
                  alt="bg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="row justify-content-between tw-mb-10">

                {/* LEFT DETAILS */}
                <div className="col-xl-4">
                  <div>
                    <div className="section-two-wrapper tw-mb-10">
                      <h2 className="section-two-title text-uppercase tw-text-29 tw-char-animation text-white">
                        Details of project
                      </h2>
                    </div>

                    <div className="tw-mb-8">
                      <ul>
                        <li className="tw-text-lg fw-bold text-white d-flex tw-gap-10 tw-mb-3">
                          <span className="text-main-600 tw-w-22">Category:</span>
                          {portfolio.details?.category}
                        </li>

                        <li className="tw-text-lg fw-bold text-white d-flex tw-gap-10 tw-mb-3">
                          <span className="text-main-600 tw-w-22">Date:</span>
                          {portfolio.details?.date
                            ? new Date(portfolio.details.date).toDateString()
                            : "N/A"}
                        </li>

                        <li className="tw-text-lg fw-bold text-white d-flex tw-gap-10 tw-mb-3">
                          <span className="text-main-600 tw-w-22">Client:</span>
                          {portfolio.details?.client}
                        </li>

                        <li className="tw-text-lg fw-bold text-white d-flex tw-gap-10 tw-mb-3">
                          <span className="text-main-600 tw-w-22">Software:</span>
                          {portfolio.details?.software?.join(", ")}
                        </li>

                        <li className="tw-text-lg fw-bold text-white d-flex tw-gap-10 tw-mb-3">
                          <span className="text-main-600 tw-w-22">Website:</span>
                          <a href={portfolio.details?.website} target="_blank">
                            {portfolio.details?.website}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="col-xl-7">
                  <div className="service-details-wrapper tw-ms-6">

                    {/* DESCRIPTION */}
                    {portfolio.description?.map((para, i) => (
                      <p
                        key={i}
                        className="tw-text-lg fw-medium text-white tw-mb-10"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                      >
                        {para}
                      </p>
                    ))}

                    {/* CHALLENGES TITLE */}
                    <div
                      className="tw-mb-10"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                    >
                      <h4 className="tw-text-13 text-white">Project Challenges</h4>
                    </div>

                    {/* CHALLENGES TEXT */}
                    <p
                      className="tw-text-lg fw-medium text-white tw-mb-10"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                    >
                      {portfolio.challengesDescription}
                    </p>

                    {/* FEATURES */}
                    <div
                      className="service-details-list tw-mb-10"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                    >
                      <ul>
                        {portfolio.features?.map((f, i) => (
                          <li
                            key={i}
                            className="text-white fw-bold d-inline-flex align-items-center tw-gap-2 tw-mb-4 float-start w-50"
                          >
                            <span className="text-main-600">
                                <FiPlus />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <div className="pb-140" style={{backgroundColor:"black"}}>
        <div className="container tw-container-1624-px">

          {/* FIRST IMAGE */}
          {portfolio.gallery?.[0] && (
            <div
              className="text-center tw-mb-8"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <img
                className="tw-rounded-lg"
                src={portfolio.gallery[0]}
                alt=""
              />
            </div> 
          )}

          {/* OTHER IMAGES */}
          <div className="row">
            <div className="col-xl-12">
              <div className="service-details-gallery d-flex justify-content-center tw-gap-8">
                {portfolio.gallery?.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="tw-mb-8"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={200 + i * 100}
                  >
                    <img
                      className="tw-rounded-lg"
                      src={img}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer   />
    </>
  );
}