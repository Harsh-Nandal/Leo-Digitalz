import { NextResponse } from "next/server";
import Service from "@/models/Service";
import { connectDB } from "@/lib/mongodb";

// ✅ ULTRA DEBUG VERSION - Will show EXACT problem
export async function GET(request, { params }) {
  try {
    console.log('🚀 API HIT - Raw params:', params);
    
    // ✅ Connect DB
    await connectDB();
    console.log('✅ DB Connected');

    // 🔥 AWAIT PARAMS PROMISE
    const awaitedParams = await params;
    console.log('🔍 Awaited params:', awaitedParams);
    
    const slug = awaitedParams?.slug;
    console.log('📝 Raw slug:', slug, 'Type:', typeof slug);

    // ✅ VALIDATE
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      console.log('❌ INVALID SLUG');
      return NextResponse.json(
        { error: "Invalid slug", received: slug },
        { status: 400 }
      );
    }

    const cleanSlug = slug.trim();
    console.log('🧹 Clean slug:', cleanSlug);

    // 🔥 GET ALL SERVICES FOR DEBUG
    const allServices = await Service.find({}).select('slug title').lean();
    console.log('📚 ALL SERVICES COUNT:', allServices.length);
    console.log('📋 ALL SLUGS:', allServices.map(s => s.slug));

    // 🔥 EXACT MATCH SEARCH
    const service = await Service.findOne({ slug: cleanSlug }).lean();
    console.log('🔎 Service found:', !!service);
    if (service) {
      console.log('✅ SERVICE DATA:', {
        _id: service._id,
        slug: service.slug,
        title: service.title
      });
    }

    // 🔥 CASE INSENSITIVE SEARCH (backup)
    const insensitiveService = await Service.findOne({ 
      slug: { $regex: new RegExp(`^${cleanSlug}$`, 'i') } 
    }).lean();
    console.log('🔎 Case-insensitive found:', !!insensitiveService);

    if (!service && !insensitiveService) {
      return NextResponse.json(
        { 
          error: "Service not found", 
          searchedSlug: cleanSlug,
          allSlugs: allServices.map(s => s.slug),
          allServicesCount: allServices.length
        },
        { status: 404 }
      );
    }

    // ✅ Return first match
    const finalService = service || insensitiveService;
    
    // ✅ Safe serialization
    const safeService = JSON.parse(JSON.stringify(finalService));
    
    console.log('🎉 RETURNING SERVICE:', safeService.slug);
    
    return NextResponse.json(safeService, {
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('💥 FULL API ERROR:', error);
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    );
  }
}