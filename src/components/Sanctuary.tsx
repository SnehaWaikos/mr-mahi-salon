import { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export function Sanctuary() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imagesList = [
    {
      src: GALLERY_IMAGES.sanctuary_tall,
      alt: 'Luxury Salon Architecture & Backstage Leather Stations',
      title: 'Styling Arena'
    },
    {
      src: GALLERY_IMAGES.sanctuary_top_right,
      alt: 'Artisanal Gold Hair Trimming Highlight Details',
      title: 'Master Highlights'
    },
    {
      src: GALLERY_IMAGES.sanctuary_mid_right,
      alt: 'Organic Serum and Hair Tonic Showcase Products',
      title: 'Botanicals Shelf'
    },
    {
      src: GALLERY_IMAGES.sanctuary_low_right,
      alt: 'Gold and Brass Spa Wash Head massage Treatment Station',
      title: 'Wellness Oasis'
    }
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + imagesList.length) % imagesList.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % imagesList.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-black text-white border-t border-[#111]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Gallery Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12" id="gallery-header">
          <div>
            <h2 className="font-[Playfair_Display] text-3xl md:text-[42px] font-bold tracking-tight mb-4 text-white">
              Inside the Sanctuary
            </h2>
            <p className="font-[Montserrat] text-[#cfc4c5]/70 text-sm md:text-base max-w-[600px] leading-relaxed">
              Explore our meticulously designed spaces where comfort meets cutting-edge style.
            </p>
          </div>
          
          <button
            onClick={() => setLightboxIndex(0)}
            className="text-[#D4AF37] hover:text-white font-[Montserrat] text-[12px] font-extrabold tracking-[0.2em] uppercase border-b border-[#D4AF37]/30 hover:border-white py-1 transition-all duration-300 self-start md:self-end mt-6 md:mt-0"
            id="gallery-view-all"
          >
            VIEW ALL GALLERY
          </button>
        </div>

        {/* Gallery Grid mirroring screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6" id="gallery-mosaic">
          
          {/* Left Column (Tall Frame) - Span 5 */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="md:col-span-5 h-[400px] md:h-[650px] relative overflow-hidden group cursor-pointer border border-[#1A1E1E]"
            id="gallery-item-0"
          >
            <img
              src={imagesList[0].src}
              alt={imagesList[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Overlay cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#D4AF37] font-[Montserrat] text-[10px] tracking-widest font-bold uppercase mb-1 block">Sanctuary</span>
              <h4 className="font-[Playfair_Display] text-lg md:text-2xl font-bold text-white mb-2">{imagesList[0].title}</h4>
              <div className="flex items-center space-x-1.5 text-white/70 text-xs">
                <Eye size={12} className="text-[#DC2626]" />
                <span className="font-[Montserrat]">Enlarge Image</span>
              </div>
            </div>
          </div>

          {/* Right Columns Area - Span 7 */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4 md:space-y-6">
            
            {/* Top Right Landscape - Span Full in segment */}
            <div
              onClick={() => setLightboxIndex(1)}
              className="h-[250px] md:h-[312px] relative overflow-hidden group cursor-pointer border border-[#1A1E1E]"
              id="gallery-item-1"
            >
              <img
                src={imagesList[1].src}
                alt={imagesList[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              <div className="absolute bottom-6 left-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#D4AF37] font-[Montserrat] text-[10px] tracking-widest font-bold uppercase mb-1 block">Detailing</span>
                <h4 className="font-[Playfair_Display] text-lg md:text-2xl font-bold text-white mb-2">{imagesList[1].title}</h4>
                <div className="flex items-center space-x-1.5 text-white/70 text-xs">
                  <Eye size={12} className="text-[#DC2626]" />
                  <span className="font-[Montserrat]">Enlarge Image</span>
                </div>
              </div>
            </div>

            {/* Bottom Two Split Images inside segment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Product bottles vertical box */}
              <div
                onClick={() => setLightboxIndex(2)}
                className="h-[300px] md:h-[312px] relative overflow-hidden group cursor-pointer border border-[#1A1E1E]"
                id="gallery-item-2"
              >
                <img
                  src={imagesList[2].src}
                  alt={imagesList[2].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                <div className="absolute bottom-6 left-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[#D4AF37] font-[Montserrat] text-[10px] tracking-widest font-bold uppercase mb-1 block">Aesthetics</span>
                  <h4 className="font-[Playfair_Display] text-lg md:text-xl font-bold text-white mb-1">{imagesList[2].title}</h4>
                  <div className="flex items-center space-x-1.5 text-white/70 text-xs">
                    <Eye size={12} className="text-[#DC2626]" />
                    <span className="font-[Montserrat]">Enlarge Image</span>
                  </div>
                </div>
              </div>

              {/* Relax Massage square-ish box */}
              <div
                onClick={() => setLightboxIndex(3)}
                className="h-[300px] md:h-[312px] relative overflow-hidden group cursor-pointer border border-[#1A1E1E]"
                id="gallery-item-3"
              >
                <img
                  src={imagesList[3].src}
                  alt={imagesList[3].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                <div className="absolute bottom-6 left-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[#D4AF37] font-[Montserrat] text-[10px] tracking-widest font-bold uppercase mb-1 block">Wellness</span>
                  <h4 className="font-[Playfair_Display] text-lg md:text-xl font-bold text-white mb-1">{imagesList[3].title}</h4>
                  <div className="flex items-center space-x-1.5 text-white/70 text-xs text-nowrap">
                    <Eye size={12} className="text-[#DC2626]" />
                    <span className="font-[Montserrat]">Enlarge Image</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Luxury Lightbox Overlay modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
          id="gallery-lightbox"
        >
          {/* Top Header / Close Action */}
          <div className="absolute top-4 left-0 w-full px-6 md:px-12 flex items-center justify-between z-55">
            <div className="text-left">
              <span className="text-[#D4AF37] font-[Montserrat] text-[10px] tracking-widest font-bold uppercase block">
                Gallery Frame {lightboxIndex + 1} of {imagesList.length}
              </span>
              <span className="font-[Playfair_Display] text-white font-medium text-lg capitalize">{imagesList[lightboxIndex].title}</span>
            </div>
            
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white/60 hover:text-white bg-[#121212] border border-[#333] hover:border-[#DC2626] p-3 rounded-full transition-all duration-200"
              title="Close Image Viewer"
              id="lightbox-close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/50 hover:text-[#D4AF37] hover:bg-[#121212]/80 border border-white/10 hover:border-[#D4AF37]/50 p-3 md:p-4 rounded-full transition-all duration-300 z-55"
            aria-label="Previous image"
            id="lightbox-prev"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Max-width Active Image display box */}
          <div className="max-w-[1000px] max-h-[75vh] md:max-h-[80vh] overflow-hidden flex items-center justify-center relative shadow-2xl">
            <img
              src={imagesList[lightboxIndex].src}
              alt={imagesList[lightboxIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-sm select-none border border-white/5 animate-scale-up"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/50 hover:text-[#D4AF37] hover:bg-[#121212]/80 border border-white/10 hover:border-[#D4AF37]/50 p-3 md:p-4 rounded-full transition-all duration-300 z-55"
            aria-label="Next image"
            id="lightbox-next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Description at Bottom */}
          <div className="absolute bottom-6 text-center text-[#cfc4c5] font-[Montserrat] text-[12px] md:text-sm tracking-wide max-w-[500px]">
            <p>{imagesList[lightboxIndex].alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
