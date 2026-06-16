import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Legacy } from './components/Legacy';
import { Services } from './components/Services';
import { Sanctuary } from './components/Sanctuary';
import { Testimonials } from './components/Testimonials';
import { OffersSection } from './components/OffersSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AppointmentsManager } from './components/AppointmentsManager';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [bookingCount, setBookingCount] = useState(0);

  // Sync Booking Count from localStorage
  const updateBookingCount = () => {
    const saved = localStorage.getItem('mrmahi_appointments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBookingCount(parsed.length);
          return;
        }
      } catch (err) {
        // Safe skip
      }
    }
    setBookingCount(0);
  };

  useEffect(() => {
    updateBookingCount();
    
    // Smooth scrolling animation logic fallback
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const id = target.getAttribute('href')?.substring(1);
        const element = id ? document.getElementById(id) : null;
        if (element) {
          e.preventDefault();
          const topOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - topOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleOpenBooking = () => {
    setSelectedServiceId(null);
    setBookingOpen(true);
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setBookingOpen(true);
  };

  return (
    <div className="bg-black text-white min-h-screen relative font-[Montserrat] selection:bg-[#DC2626] selection:text-white" id="mrmahi-salon-root">
      {/* Dynamic Floating Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenManageBookings={() => setManagerOpen(true)}
        activeBookingCount={bookingCount}
      />

      {/* Hero Welcome Deck */}
      <main id="main-content-layout">
        <Hero onOpenBooking={handleOpenBooking} />

        {/* About / Legacy story */}
        <Legacy />

        {/* Services collection catalog & Pillars highlight */}
        <Services onOpenBookingWithService={handleOpenBookingWithService} />

        {/* Beautiful mosaic sanctuary space gallery with custom Lightbox */}
        <Sanctuary />

        {/* Special Copy-to-clipboard Offers benefits section */}
        <OffersSection />

        {/* Reviews segment with Star rate submission forms */}
        <Testimonials />
      </main>

      {/* Styled Footer and Contact coordinates blocks */}
      <Footer />

      {/* Interactive Step Booking Engine popup */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
        onBookingSuccess={updateBookingCount}
      />

      {/* Interactive Appointments side drawer manager */}
      <AppointmentsManager
        isOpen={managerOpen}
        onClose={() => setManagerOpen(false)}
        onUpdateCount={updateBookingCount}
      />
    </div>
  );
}
