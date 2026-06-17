import { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenManageBookings: () => void;
  activeBookingCount: number;
}

export function Navbar({ onOpenBooking, onOpenManageBookings, activeBookingCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check current section for active highlighting
      const sections = ['home', 'about', 'services', 'gallery', 'offers', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Offers', id: 'offers' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[#1A1A1A] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        {/* Brand Logo */}
{/* Brand Logo */}
<button
  onClick={() => scrollToSection('home')}
  id="nav-logo"
>
  <img
    src="/mr-mahi-salon/logo.png"
    alt="Mr. Mahi Unisex Salon"
    className="h-12 w-auto object-contain"
  />
</button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-[Montserrat] text-[13px] font-medium tracking-widest text-[#cfc4c5]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`hover:text-white uppercase transition-colors relative py-1 ${
                activeTab === item.id ? 'text-white' : ''
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DC2626]" />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {activeBookingCount > 0 && (
            <button
              onClick={onOpenManageBookings}
              className="flex items-center space-x-2 bg-[#121212] hover:bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-2 rounded-sm text-[12px] font-semibold font-[Montserrat] tracking-wider transition-all duration-200"
              title="Manage Appointments"
              id="nav-manage-bookings"
            >
              <Clock size={14} className="animate-pulse" />
              <span>MY RESERVATIONS ({activeBookingCount})</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold font-[Montserrat] text-[12px] tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all duration-200 shadow-md shadow-[#DC2626]/20 active:translate-y-[1px]"
            id="nav-book-btn"
          >
            BOOK APPOINTMENT
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          {activeBookingCount > 0 && (
            <button
              onClick={onOpenManageBookings}
              className="p-2 text-[#D4AF37] relative"
              id="mobile-manage-indicator"
            >
              <Clock size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#DC2626] rounded-full" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#e2e2e2] hover:text-white p-1 focus:outline-none"
            aria-label="Toggle Menu"
            id="mobile-menu-trigger"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-black/98 z-40 flex flex-col justify-between p-8 animate-fade-in"
          id="mobile-menu-drawer"
        >
          <div className="flex flex-col space-y-6 font-[Montserrat] text-lg font-semibold tracking-widest text-[#cfc4c5]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`uppercase text-left py-2 border-b border-[#111] hover:text-white ${
                  activeTab === item.id ? 'text-white border-b border-[#DC2626]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            {activeBookingCount > 0 && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenManageBookings();
                }}
                className="flex items-center justify-center space-x-2 bg-[#121212] hover:bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/50 w-full py-3.5 rounded-sm text-sm font-semibold font-[Montserrat] tracking-widest transition-colors duration-200"
                id="mobile-manage-btn"
              >
                <Clock size={16} />
                <span>MY RESERVATIONS ({activeBookingCount})</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold font-[Montserrat] text-sm tracking-widest uppercase py-4 rounded-sm transition-all duration-200 text-center w-full shadow-lg shadow-[#DC2626]/20"
              id="mobile-book-btn"
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
