import { SERVICES } from '../data';
import { LucideIcon } from './LucideIcon';
import { Award, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface ServicesProps {
  onOpenBookingWithService: (serviceId: string) => void;
}

export function Services({ onOpenBookingWithService }: ServicesProps) {
  // Pillars metadata matching the screen cap icon rows
  const pillars = [
    {
      title: 'EXPERIENCED STYLISTS',
      description: 'Our stylists have years of hands-on experience and keep up with the latest trends.',
      icon: <Award className="text-[#DC2626] w-8 h-8 md:w-10 md:h-10" />
    },
    {
      title: 'PREMIUM PRODUCTS',
      description: 'We use trusted, high-quality products that are gentle on your hair and skin.',
      icon: <Sparkles className="text-[#DC2626] w-8 h-8 md:w-10 md:h-10" />
    },
    {
      title: 'HYGIENIC SPACE',
      description: 'Every station is cleaned and sanitised between every client, every time.',
      icon: <ShieldCheck className="text-[#DC2626] w-8 h-8 md:w-10 md:h-10" />
    },
    {
      title: 'AFFORDABLE LUXURY',
      description: 'Quality services at fair prices — no hidden charges, ever.',
      icon: <Heart className="text-[#DC2626] w-8 h-8 md:w-10 md:h-10" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0A0B0B] text-white scroll-mt-10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Section Title Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#D4AF37] font-[Montserrat] text-[11px] md:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 block">
            THE COLLECTION
          </span>
          <h2 className="font-[Playfair_Display] text-3xl md:text-[45px] font-bold leading-tight mb-4">
            Luxury Services
          </h2>
          <div className="h-[2px] w-16 bg-[#DC2626] mx-auto mt-6" />
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24" id="services-grid">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-[#121414] hover:bg-[#161818] border border-[#1A1E1E] hover:border-[#D4AF37]/30 rounded-sm p-8 md:p-10 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
              id={`service-card-${service.id}`}
            >
              {/* Gold Top Light Line on Hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#DC2626] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div>
                {/* Icon & Gold Circle Accent */}
                <div className="mb-8 relative inline-block">
                  <div className="w-12 h-12 bg-[#1C1E1E] rounded-sm flex items-center justify-center border border-[#333]/30 group-hover:border-[#D4AF37]/50 transition-colors duration-300">
                    <LucideIcon name={service.iconName} className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" size={24} />
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-bold mb-4 tracking-wide group-hover:text-white transition-colors">
                  {service.name}
                </h3>

                {/* Service Description */}
                <p className="font-[Montserrat] text-[#cfc4c5]/80 text-[13px] md:text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Bottom Details */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#1C1E1E]">
                <span className="text-[#D4AF37] font-[Montserrat] text-[13px] md:text-sm font-semibold tracking-wider">
                  FROM ₹{service.price}
                </span>
                
                <button
                  onClick={() => onOpenBookingWithService(service.id)}
                  className="text-white hover:text-[#DC2626] font-[Montserrat] text-[11px] font-bold tracking-widest uppercase transition-colors flex items-center space-x-1"
                  id={`book-service-${service.id}`}
                >
                  <span>RESERVE</span>
                  <span className="transition-transform group-hover:translate-x-1 block">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Salon Core Pillars Grid (4 elements matching screen capture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 border-t border-[#1C1E1E]/80 pt-20" id="pillars-container">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4"
              id={`pillar-card-${i}`}
            >
              {/* Pillar Icon */}
              <div className="mb-6 bg-[#121414] p-4 rounded-full border border-[#222]/30 hover:border-[#DC2626]/25 transition-colors duration-300">
                {pillar.icon}
              </div>

              {/* Pillar Label */}
              <h4 className="font-[Montserrat] text-white text-[12px] md:text-[13px] font-extrabold tracking-widest uppercase mb-3">
                {pillar.title}
              </h4>

              {/* Pillar Info */}
              <p className="font-[Montserrat] text-[#cfc4c5]/60 text-[12px] leading-relaxed max-w-[220px]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
