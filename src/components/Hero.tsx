import { ChevronDown, ChevronsDown } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black"
    >
      {/* Background Image with luxury dark gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={GALLERY_IMAGES.heroBg}
          alt="Mr. Mahi Unisex Salon Boutique Interior"
          className="w-full h-full object-cover opacity-35 scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
          id="hero-img-bg"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-1" />
        <div className="absolute inset-0 bg-radial-gradient-dark z-2" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
        {/* Established Badge */}
        <div className="mb-6 flex items-center space-x-3 animate-fade-in">
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
          <span className="text-[#D4AF37] font-[Montserrat] text-[12px] md:text-[13px] font-semibold tracking-[0.3em] uppercase">
            EST. 2024
          </span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
        </div>

        {/* Big Serif Heading */}
        <h1 className="text-white font-[Playfair_Display] text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight max-w-[900px] animate-fade-in">
          Welcome to <br className="sm:hidden" />
          <span className="text-[#DC2626] font-extrabold relative inline-block mr-1 md:mr-3">
            Mr. Mahi
          </span>{' '}
          Unisex Salon
        </h1>

        {/* Elegant Slogan */}
        <p className="font-[Montserrat] text-[#cfc4c5] text-sm sm:text-base md:text-[18px] font-light leading-relaxed max-w-[700px] mb-10 tracking-wide italic leading-8 animate-fade-in">
          Haircuts, coloring, facials, and spa — all under one roof.
          Walk in looking good. Walk out feeling great.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 min-w-[200px] w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={onOpenBooking}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold font-[Montserrat] text-[13px] tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#DC2626]/20 active:translate-y-[1px]"
            id="hero-book-btn"
          >
            BOOK NOW
          </button>
          <button
            onClick={scrollToGallery}
            className="text-[#D4AF37] hover:text-white border border-[#D4AF37] hover:border-white font-semibold font-[Montserrat] text-[13px] tracking-[0.15em] uppercase px-8 py-4 rounded-sm transition-all duration-300 transform hover:scale-[1.02] bg-transparent active:translate-y-[1px]"
            id="hero-explore-btn"
          >
            EXPLORE GALLERY
          </button>
        </div>
      </div>

      {/* Animated Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50 hover:text-white transition-colors duration-300"
        aria-label="Scroll to About segment"
        id="hero-scroll-trigger"
      >
        <span className="font-[Montserrat] text-[10px] tracking-[0.3em] uppercase mb-2 text-gray-500">
          Scroll Down
        </span>
        <div className="animate-bounce">
          <ChevronDown size={20} className="text-[#D4AF37]" />
        </div>
      </button>
    </section>
  );
}
