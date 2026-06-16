import { useState } from 'react';
import { SPECIAL_OFFERS } from '../data';
import { Ticket, Copy, Check, ShieldAlert, BadgeInfo } from 'lucide-react';

export function OffersSection() {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2500);
  };

  return (
    <section id="offers" className="py-24 bg-black text-white relative border-t border-[#111]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Section title */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-[Montserrat] text-[11px] font-bold tracking-[0.3em] uppercase mb-3 block">
            CHAIR BENEFITS
          </span>
          <h2 className="font-[Playfair_Display] text-3xl md:text-[45px] font-bold text-white mb-4">
            Exclusive Offers
          </h2>
          <p className="font-[Montserrat] text-[#cfc4c5]/60 text-sm max-w-[500px] mx-auto mt-2 leading-relaxed">
            Use these codes at checkout to get a discount on your next visit.
          </p>
          <div className="h-[2px] w-16 bg-[#DC2626] mx-auto mt-6" />
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[950px] mx-auto" id="offers-collection-grid">
          {SPECIAL_OFFERS.map((offer) => {
            const isCopied = copiedCodeId === offer.id;
            return (
              <div
                key={offer.id}
                className="bg-[#121414] border border-[#1C1F1F] hover:border-[#D4AF37]/35 rounded-sm p-6 md:p-10 transition-all duration-300 flex flex-col justify-between relative group"
                id={`offer-card-${offer.id}`}
              >
                {/* Gold VIP offer banner tag */}
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-[9px] font-black tracking-widest px-2.5 py-1 rounded-xs font-[Montserrat]">
                  {offer.badge}
                </div>

                <div className="mb-8">
                  {/* Icon */}
                  <div className="w-10 h-10 bg-[#1C1F1F] rounded-sm flex items-center justify-center border border-[#333]/30 mb-6">
                    <Ticket className="text-[#D4AF37]" size={18} />
                  </div>

                  {/* Title */}
                  <h3 className="font-[Playfair_Display] text-xl font-bold mb-3 tracking-wide">{offer.title}</h3>
                  
                  {/* Info description */}
                  <p className="font-[Montserrat] text-[#cfc4c5]/75 text-[13px] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Promo field trigger coupon clicker */}
                <div className="border-t border-[#1C1F1F]/80 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 font-[Montserrat] text-[9px] tracking-widest uppercase block mb-1">PROMO CODE</span>
                    <span className="text-white font-mono text-xs font-bold tracking-wider">{offer.discountCode}</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(offer.discountCode, offer.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 border rounded-sm font-[Montserrat] text-[10px] font-black uppercase transition-all duration-200 ${
                      isCopied
                        ? 'bg-green-500/10 border-green-500 text-green-400'
                        : 'bg-black border-[#222] hover:border-white text-[#D4AF37] hover:text-white'
                    }`}
                    id={`copy-offer-btn-${offer.id}`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={12} />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>COPY CODE</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Informative terms notification banner */}
        <div className="mt-12 bg-black border border-[#1C1F1F]/85 p-6 rounded-sm text-center max-w-[950px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4" id="offer-disclaimer">
          <div className="flex items-start space-x-3 text-left">
            <BadgeInfo size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div className="font-[Montserrat]">
              <p className="text-white text-xs font-bold uppercase tracking-wide">Looking for personal tailored package upgrades?</p>
              <p className="text-[#cfc4c5]/60 text-[11px] mt-0.5 leading-relaxed">
                Connect with Mr. Mahi directly for wedding styling consultation, multi-person event schedules, and corporate subscriptions.
              </p>
            </div>
          </div>
          <a
            href="mailto:consult@mrmahi.salon"
            className="text-white hover:text-[#DC2626] font-[Montserrat] text-[10px] font-black tracking-widest uppercase border border-white/20 hover:border-white px-4 py-2.5 rounded-sm transition-colors text-nowrap"
            id="offer-mail-btn"
          >
            INQUIRE SUBSCRIPTION
          </a>
        </div>

      </div>
    </section>
  );
}
