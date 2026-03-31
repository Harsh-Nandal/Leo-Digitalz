import Service from "@/models/Service";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Header from "@/public/components/layout/Header";
import Breadcrumbs from "@/public/components/services/Breadcrumbs";
import Footer from "@/public/components/layout/Footer";
import HowWeWork from "@/public/components/services/HowWeWork";

// ✅ SEO
export async function generateMetadata({ params }) {
  await connectDB();
  const { slug } = await params;
  const service = await Service.findOne({ slug }).lean();

  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription || "Service details",
  };
}

export default async function ServicePage({ params }) {
  await connectDB();

  const { slug } = await params;
  const service = await Service.findOne({ slug }).lean();

  if (!service) return notFound();

  const description = service.description?.length
    ? service.description
    : ["No description available"];

  const features = service.features?.length
    ? service.features
    : ["No features added"];

  const steps = service.steps?.length ? service.steps : [];

  let videoEmbed = service.videoUrl;
  if (videoEmbed?.includes("watch?v=")) {
    videoEmbed = videoEmbed.replace("watch?v=", "embed/");
  }

  return (
    <>
    <Header />
    <Breadcrumbs items={[
    { label: "Our Services", link: "/services" },
    { label: service.title, link: `/services/${service.slug}` } ]} />
      {/* ================= SERVICE DETAILS ================= */}
      <section className="pt-32 pb-20 bg-black text-white">
        <div className="container mx-auto px-4">
          {/* TOP IMAGE */}
          <div className="text-center mb-12">
            <img
              src={service.coverImage || "/fallback.jpg"}
              alt={service.title}
              className="rounded-2xl w-full max-h-[500px] object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-12 gap-10">
            {/* LEFT TITLE */}
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-bold uppercase leading-tight">
                {service.title}
              </h1>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-8 space-y-6">
              {/* DESCRIPTION */}
              {description.map((d, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed">
                  {d}
                </p>
              ))}

              {/* BENEFITS */}
              <div>
                <h4 className="text-xl font-semibold mb-2">
                  {service.benefitsTitle || "Benefits of this service"}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.benefitsDescription ||
                    "This package is ideal for businesses aiming to grow."}
                </p>
              </div>

              {/* FEATURES LIST */}
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white font-medium"
                  >
                    <span className="text-orange-500 text-xl">+</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* VIDEO */}
              {service.videoThumbnail && (
                <div className="relative mt-10">
                  <img
                    src={service.videoThumbnail}
                    className="rounded-xl w-full object-cover"
                    alt="video"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={service.videoUrl}
                      target="_blank"
                      className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-black text-2xl hover:scale-110 transition"
                    >
                      ▶
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
     <HowWeWork />
      <Footer />
    </>
  );
}
