import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Facebook, Twitter, Check, Map } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Save news letter subscriber locally
    const existing = localStorage.getItem('mrmahi_subscribers');
    let subscribers = [];
    if (existing) {
      try {
        subscribers = JSON.parse(existing);
      } catch (err) {
        subscribers = [];
      }
    }
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    localStorage.setItem('mrmahi_subscribers', JSON.stringify(subscribers));

    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4500);
  };

  const socialLinks = [
    { icon: <Instagram size={14} />, link: 'https://instagram.com/mrmahi.salon', label: 'IG' },
    { icon: <Facebook size={14} />, link: 'https://facebook.com/mrmahi.salon', label: 'FB' },
    { icon: <Twitter size={14} />, link: 'https://twitter.com/mrmahi.salon', label: 'TW' },
  ];

  return (
    <footer id="contact" className="bg-[#0A0B0B] border-t border-[#1C1F1F]/70 text-white py-20 font-[Montserrat]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Main Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16" id="footer-section-grid">
          
          {/* Logo Column */}
          <div className="flex flex-col space-y-6" id="footer-brand-col">
            <h3 className="font-[Playfair_Display] text-white text-2xl font-black tracking-widest text-[#DC2626]">
              MR. MAHI
            </h3>
            <p className="text-[#cfc4c5]/60 text-xs md:text-[13px] leading-relaxed max-w-[280px]">
              A premium unisex salon in the heart of Pune. We believe great grooming is for everyone — come in and experience the difference.
            </p>
            
            {/* Social vectors */}
            <div className="flex items-center space-x-3.5 pt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#222] hover:border-white text-zinc-500 hover:text-white flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col space-y-4" id="footer-connect-col">
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-300">
              CONNECT
            </h4>
            
            <div className="space-y-4 text-xs text-[#cfc4c5]/75 mt-4">
              <div className="flex items-start space-x-3">
                <MapPin size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Shop No. 12, FC Road, Deccan Gymkhana
                  <br />
                  Pune, Maharashtra 411004
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={15} className="text-[#D4AF37] flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={15} className="text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:hello@mrmahi.salon" className="hover:text-white transition-colors">
                  hello@mrmahi.salon
                </a>
              </div>
            </div>
          </div>

          {/* Opening hours Column */}
          <div className="flex flex-col space-y-4" id="footer-hours-col">
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-300">
              OPENING HOURS
            </h4>
            
            <table className="table-auto text-xs text-[#cfc4c5]/75 mt-4 border-none space-y-3" id="hours-table">
              <tbody>
                <tr className="border-none">
                  <td className="pr-4 py-1 font-medium text-white/50">Mon - Fri:</td>
                  <td className="py-1">9:00 AM - 9:00 PM</td>
                </tr>
                <tr className="border-none">
                  <td className="pr-4 py-1 font-medium text-white/50">Saturday:</td>
                  <td className="py-1">10:00 AM - 8:00 PM</td>
                </tr>
                <tr className="border-none">
                  <td className="pr-4 py-1 font-medium text-white/50">Sunday:</td>
                  <td className="py-1 text-[#DC2626] font-bold">By Appointment</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Newsletter subscription Column */}
          <div className="flex flex-col space-y-4" id="footer-newsletter-col">
            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-zinc-300">
              NEWSLETTER
            </h4>
            <p className="text-[#cfc4c5]/60 text-xs leading-relaxed mt-4">
              Subscribe to get updates, seasonal offers, and new service announcements.
            </p>

            {subscribed ? (
              <div className="bg-green-500/10 border border-green-500/25 p-3 rounded-sm flex items-center space-x-2 text-green-400 text-xs font-semibold animate-scale-up">
                <Check size={14} />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col mt-4" id="newsletter-form">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL"
                    className="w-full bg-black border-b border-white/20 focus:border-[#DC2626] py-3.5 pr-10 text-xs placeholder-white/30 uppercase focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 text-zinc-500 hover:text-[#D4AF37] p-2 transition-colors duration-200"
                    aria-label="Submit subscriber email"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Minimal Blueprint Local Location Map Section */}
        <div className="border-t border-[#1C1F1F]/50 pt-16 mb-12" id="footer-location-banner">
          <div className="relative h-[180px] bg-gradient-to-r from-zinc-950 to-neutral-900 border border-[#222] hover:border-[#D4AF37]/25 rounded-md overflow-hidden flex items-center justify-center group" id="footer-mockup-map">
            {/* Styled schematic map lines using abstract dark SVG grids */}
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            
            {/* Centered locator overlay */}
            <div className="relative z-10 flex flex-col items-center pointer-events-none group-hover:scale-105 transition-transform duration-300">
              <div className="w-11 h-11 bg-black/80 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-xl animate-bounce">
                <MapPin size={18} />
              </div>
              <span className="text-white text-[10px] font-extrabold tracking-widest uppercase mt-4 block p-2 px-4 rounded-full border border-white/5 bg-black/80">
                FIND US HERE
              </span>
            </div>

            {/* Stylist decorative layout vectors */}
            <div className="absolute top-1/2 left-1/4 w-[120px] h-[1px] bg-white/5 -rotate-12" />
            <div className="absolute top-1/3 right-1/4 w-[250px] h-[1px] bg-white/5 rotate-45" />
            <div className="absolute top-2/3 right-1/3 w-[150px] h-[1px] bg-white/5 -rotate-45" />

            {/* Faint gold rings referencing map reach */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] border border-[#D4AF37]/5 rounded-full animate-ping pointer-events-none" />
          </div>
        </div>

        {/* Copyright subtext bar */}
        <div className="border-t border-[#1C1F1F]/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[11px] font-[Montserrat]" id="copyright-bar">
          <span>&copy; {new Date().getFullYear()} Mr. Mahi Unisex Salon. All rights reserved.</span>
          
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors" id="privacy-link">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors" id="terms-link">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
