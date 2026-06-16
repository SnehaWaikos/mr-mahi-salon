import { GALLERY_IMAGES } from '../data';

export function Legacy() {
  return (
    <section id="about" className="py-24 md:py-32 bg-black border-t border-[#111]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Duo Image Frame */}
          <div className="lg:col-span-6 relative" id="about-illustrations">
            {/* Fine border container frame mimicking luxury layout */}
            <div className="border border-[#D4AF37]/20 p-3 md:p-4 rounded-sm bg-[#121212]/50">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="overflow-hidden rounded-sm relative group h-[350px] md:h-[450px]">
                  <img
                    src={GALLERY_IMAGES.legacy_1}
                    alt="Precision haircutting and styling"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-115"
                    referrerPolicy="no-referrer"
                    id="legacy-img-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[12px] font-semibold text-white tracking-widest font-[Montserrat] uppercase">Precision Cuts</span>
                  </div>
                </div>
                
                <div className="overflow-hidden rounded-sm relative group h-[350px] md:h-[450px] translate-y-4 md:translate-y-6">
                  <img
                    src={GALLERY_IMAGES.legacy_2}
                    alt="Artisanal coloring detail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-115"
                    referrerPolicy="no-referrer"
                    id="legacy-img-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[12px] font-semibold text-white tracking-widest font-[Montserrat] uppercase">Artisanal Color</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subtle floating glow representing gold theme */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl -z-1" />
          </div>

          {/* Right Column: Descriptions & Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center mt-8 lg:mt-0" id="about-brand-story">
            {/* Sub-label */}
            <span className="text-[#DC2626] font-[Montserrat] text-[12px] md:text-[13px] font-bold tracking-[0.25em] uppercase mb-4">
              OUR LEGACY
            </span>

            {/* Heading */}
            <h2 className="text-white font-[Playfair_Display] text-3xl md:text-[44px] font-bold leading-tight mb-8 tracking-tight">
              Where Good Grooming <br className="hidden md:inline" /> Feels Natural.
            </h2>

            {/* Paragraph Text */}
            <div className="font-[Montserrat] text-[#cfc4c5] text-sm md:text-base leading-[28px] md:leading-[32px] font-light space-y-6 max-w-[580px] mb-12">
              <p>
                Mr. Mahi Unisex Salon started with one simple idea — everyone deserves to look and feel their best, without it being complicated. We offer haircuts, coloring, facials, and spa services for both men and women in a clean, relaxed space.
              </p>
              <p>
                Over the years, we have built a loyal clientele in Pune by keeping things simple: skilled hands, good products, and genuine care for every person who walks in. No gimmicks, just great grooming.
              </p>
            </div>

            {/* Stats list resembling the luxury grid layout */}
            <div className="flex items-center space-x-12 border-t border-[#1A1A1A] pt-8" id="legacy-stats-grid">
              
              <div className="flex flex-col">
                <span className="text-[#D4AF37] font-[Playfair_Display] text-4xl md:text-5xl font-bold mb-1">
                  10<sup className="text-2xl text-[#D4AF37]">+</sup>
                </span>
                <span className="text-white/50 font-[Montserrat] text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase">
                  YEARS EXPERIENCE
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#D4AF37] font-[Playfair_Display] text-4xl md:text-5xl font-bold mb-1">
                  15k<sup className="text-2xl text-[#D4AF37]">+</sup>
                </span>
                <span className="text-white/50 font-[Montserrat] text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase">
                  HAPPY CLIENTS
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
