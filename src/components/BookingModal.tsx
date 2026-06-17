import { useState, useEffect } from 'react';
import { SERVICES, STYLISTS, SPECIAL_OFFERS } from '../data';
import { Appointment, Service, Stylist } from '../types';
import { X, Check, Calendar, Clock, User, Gift, CreditCard, Sparkles, AlertCircle, ArrowLeft, Ticket } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId: string | null;
  onBookingSuccess: () => void;
}

export function BookingModal({ isOpen, onClose, preselectedServiceId, onBookingSuccess }: BookingModalProps) {
  const [step, setStep] = useState(1);
  
  // Selection States
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Contact States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Promo State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  
  // Success Confirmation State
  const [createdBooking, setCreatedBooking] = useState<Appointment | null>(null);

  // Initialize Preselected Service if available
  useEffect(() => {
    if (isOpen) {
      if (preselectedServiceId) {
        setSelectedServices([preselectedServiceId]);
      } else {
        setSelectedServices([]);
      }
      // Reset variables on new open
      setStep(1);
      setSelectedStylist(STYLISTS[0].id);
      
      // Default to tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      setSelectedDate(dateStr);
      
      setSelectedTime('11:30 AM');
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setPromoCode('');
      setAppliedPromo(null);
      setPromoError('');
      setCreatedBooking(null);
    }
  }, [isOpen, preselectedServiceId]);

  if (!isOpen) return null;

  // Next 7 days builder for luxury calendar horizontal ribbon
  const getNext7Days = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = weekdays[d.getDay()];
      const dateNum = d.getDate();
      const monthName = months[d.getMonth()];
      const isoDate = d.toISOString().split('T')[0];
      
      days.push({
        dayName,
        dateNum,
        monthName,
        isoString: isoDate
      });
    }
    return days;
  };

  const daysList = getNext7Days();

  // Premium hourly time slots matching original salon schedules
  const availableSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
    '08:30 PM'
  ];

  const handleToggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Pricing Helpers
  const subTotal = selectedServices.reduce((acc, currentId) => {
    const service = SERVICES.find(s => s.id === currentId);
    return acc + (service?.price || 0);
  }, 0);

  const discountAmount = appliedPromo ? (subTotal * appliedPromo.percent) / 100 : 0;
  const totalAmount = Math.max(0, subTotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    const codeUpper = promoCode.trim().toUpperCase();
    
    if (codeUpper === 'WELCOMEVIP') {
      setAppliedPromo({ code: 'WELCOMEVIP', percent: 15 });
    } else if (codeUpper === 'MIDWEEK15') {
      setAppliedPromo({ code: 'MIDWEEK15', percent: 10 });
    } else if (codeUpper === '') {
      setPromoError('Please type a valid voucher code.');
    } else {
      setPromoError('Invalid coupon code. Try WELCOMEVIP or MIDWEEK15.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const handleSelectStylistObj = (id: string) => {
    setSelectedStylist(id);
  };

  const handleCreateAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const confirmationNumber = 'MHI-' + Math.floor(100000 + Math.random() * 900000).toString();
    
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceIds: selectedServices,
      stylistId: selectedStylist,
      date: selectedDate,
      timeSlot: selectedTime,
      totalAmount,
      status: 'confirmed',
      notes: notes,
      confirmationCode: confirmationNumber,
      createdAt: new Date().toISOString()
    };

    // Save to LocalStorage list
    const existing = localStorage.getItem('mrmahi_appointments');
    let appointmentsList: Appointment[] = [];
    if (existing) {
      try {
        appointmentsList = JSON.parse(existing);
      } catch (err) {
        appointmentsList = [];
      }
    }
    
    appointmentsList.unshift(newAppointment);
    localStorage.setItem('mrmahi_appointments', JSON.stringify(appointmentsList));

    setCreatedBooking(newAppointment);
    setStep(5); // Advance to receipt screen
    onBookingSuccess(); // Parent notification to update counters
  };

  const activeStylistObj = STYLISTS.find(st => st.id === selectedStylist) || STYLISTS[0];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="booking-modal-overlay">
      
      {/* Central Booking Dialogue Window Grid */}
      <div className="bg-[#121414] border border-[#222] hover:border-[#D4AF37]/30 transition-colors duration-400 w-full max-w-[850px] rounded-sm relative shadow-2xl flex flex-col md:flex-row overflow-hidden" id="booking-modal-window">
        
        {/* Close trigger button */}
        {step !== 5 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-[#DC2626] bg-[#1a1c1c] border border-white/5 hover:border-[#DC2626]/20 p-2 rounded-full transition-all duration-200 z-52"
            title="Cancel Booking"
            id="close-booking-modal"
          >
            <X size={16} />
          </button>
        )}

        {/* LEFT COLUMN: Overview of Selections - Dark Slate Background */}
        <div className="w-full md:w-5/12 bg-black md:border-r border-[#1C1F1F] p-6 md:p-8 flex flex-col justify-between" id="booking-left-sidebar">
          
          <div>
            <img
                src="./logo.png"
                alt="Mr. Mahi Salon"
                className="h-10 w-auto object-contain mb-1"
            />
            <h2 className="text-white font-[Playfair_Display] text-xl md:text-2xl font-bold mb-6">
              Your Booking
            </h2>

            {/* Selection indicators list */}
            <div className="space-y-5" id="spec-sheet">
              {/* Selected Services Listing */}
              <div className="border-b border-[#1C1F1F]/60 pb-4">
                <span className="text-white/40 font-[Montserrat] text-[10px] font-bold tracking-widest uppercase block mb-2">Services Selected</span>
                {selectedServices.length === 0 ? (
                  <span className="text-[#cfc4c5]/60 font-[Montserrat] text-[12px] italic">No services checked yet.</span>
                ) : (
                  <div className="space-y-1.5">
                    {selectedServices.map(id => {
                      const ser = SERVICES.find(s => s.id === id);
                      return (
                        <div key={id} className="flex justify-between text-xs font-[Montserrat] font-medium text-white">
                          <span>{ser?.name}</span>
                          <span className="text-[#D4AF37]">₹{ser?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Chosen Master Specialist */}
              <div className="border-b border-[#1C1F1F]/60 pb-4">
                <span className="text-white/40 font-[Montserrat] text-[10px] font-bold tracking-widest uppercase block mb-1.5">Master Specialist</span>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse inline-block" />
                  <span className="text-white font-[Montserrat] text-xs font-semibold">{activeStylistObj?.name}</span>
                  <span className="text-[#cfc4c5]/50 font-[Montserrat] text-[11px] italic">({activeStylistObj?.role})</span>
                </div>
              </div>

              {/* Sheduled Chairs Appointment Time */}
              <div className="border-b border-[#1C1F1F]/60 pb-4">
                <span className="text-white/40 font-[Montserrat] text-[10px] font-bold tracking-widest uppercase block mb-1.5 font-bold">Time Slot reservation</span>
                <div className="flex items-center space-x-2 text-white">
                  <Calendar size={13} className="text-[#DC2626]" />
                  <span className="text-xs font-[Montserrat] font-medium">{selectedDate || 'Select Date'}</span>
                  <span className="mx-1 text-white/30">|</span>
                  <Clock size={13} className="text-[#DC2626]" />
                  <span className="text-xs font-[Montserrat] font-medium">{selectedTime || 'Select Hour'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Ledger summary card */}
          <div className="mt-8 pt-6 border-t border-[#1C1F1F]" id="pricing-ledger">
            <div className="flex justify-between items-center text-xs font-[Montserrat] mb-2 text-[#cfc4c5]">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>
            
            {appliedPromo && (
              <div className="flex justify-between items-center text-xs font-[Montserrat] mb-2 text-green-500 font-medium">
                <span className="flex items-center space-x-1">
                  <Ticket size={11} />
                  <span>Promo ({appliedPromo.code} -{appliedPromo.percent}%)</span>
                </span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center border-t border-[#1C1F1F]/80 pt-4 text-white">
              <span className="font-[Montserrat] text-[11px] font-bold tracking-wider uppercase">TOTAL AMOUNT</span>
              <span className="font-[Montserrat] text-[16px] font-black text-[#D4AF37] tracking-wide">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Step Controls - Warm Charcoal Background */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between" id="booking-step-container">
          
          {/* STEP 1: SERVICES SELECTOR */}
          {step === 1 && (
            <div className="animate-scale-up" id="step-1-wrap">
              <span className="text-[#DC2626] font-[Montserrat] text-[10px] font-bold tracking-widest uppercase mb-1 block">STEP 1 of 4</span>
              <h3 className="font-[Playfair_Display] text-white text-xl font-bold mb-5">Choose Your Services</h3>
              
              {/* Vertical checklists */}
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1" id="booking-service-checklist">
                {SERVICES.map((ser) => {
                  const checked = selectedServices.includes(ser.id);
                  return (
                    <button
                      key={ser.id}
                      onClick={() => handleToggleService(ser.id)}
                      className={`w-full text-left p-3.5 border rounded-sm flex items-center justify-between transition-all duration-200 ${
                        checked
                          ? 'bg-[#D4AF37]/5 border-[#D4AF37] text-white'
                          : 'bg-[#181a1a] border-[#222] hover:border-[#444] text-[#cfc4c5]'
                      }`}
                      id={`list-toggle-${ser.id}`}
                    >
                      <div className="flex items-center space-x-3.5">
                        {/* Selector check indicator */}
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          checked ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-[#444] bg-black'
                        }`}>
                          {checked && <Check size={11} strokeWidth={4} />}
                        </div>
                        <div>
                          <p className="font-[Montserrat] text-xs font-bold uppercase tracking-wider">{ser.name}</p>
                          <p className="font-[Montserrat] text-[10px] text-[#cfc4c5]/60 mt-0.5">{ser.duration}</p>
                        </div>
                      </div>
                      <span className="font-[Montserrat] text-xs font-semibold text-[#D4AF37]">₹{ser.price}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Controls */}
              <div className="mt-8 pt-4 border-t border-[#1C1F1F] flex justify-end">
                <button
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep(2)}
                  className={`font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3.5 px-6 rounded-sm transition-all duration-200 flex items-center space-x-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white ${
                    selectedServices.length === 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                  id="checkout-step-1-btn"
                >
                  <span>CONTINUE</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STYLIST CHOICE */}
          {step === 2 && (
            <div className="animate-scale-up" id="step-2-wrap">
              <span className="text-[#DC2626] font-[Montserrat] text-[10px] font-bold tracking-widest uppercase mb-1 block">STEP 2 of 4</span>
              <h3 className="font-[Playfair_Display] text-white text-xl font-bold mb-5">Select Master Specialist</h3>

              <div className="space-y-3" id="booking-stylist-picker">
                {STYLISTS.map((st) => {
                  const selected = selectedStylist === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleSelectStylistObj(st.id)}
                      className={`w-full text-left p-4 border rounded-sm flex items-center space-x-4 transition-all duration-200 ${
                        selected
                          ? 'bg-[#D4AF37]/5 border-[#D4AF37] text-white'
                          : 'bg-[#181a1a] border-[#222] hover:border-[#444] text-[#cfc4c5]'
                      }`}
                      id={`stylist-toggle-${st.id}`}
                    >
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-11 h-11 object-cover rounded-full border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-[Montserrat] text-xs font-bold uppercase tracking-wider">{st.name}</p>
                          <span className="text-amber-500 text-[10px] font-bold font-[Montserrat]">★ {st.rating.toFixed(1)}</span>
                        </div>
                        <p className="font-[Montserrat] text-[10px] text-[#D4AF37] font-semibold tracking-wide uppercase mt-0.5">{st.role}</p>
                        <p className="font-[Montserrat] text-[10px] text-[#cfc4c5]/60 mt-1 line-clamp-1">{st.bio}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Controls */}
              <div className="mt-8 pt-4 border-t border-[#1C1F1F] flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3 px-5 rounded-sm transition-all duration-200 bg-transparent hover:bg-white/5 border border-white/15 text-white/80"
                  id="back-step-2-btn"
                >
                  BACK
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3.5 px-6 rounded-sm transition-all duration-200 flex items-center space-x-1"
                  id="checkout-step-2-btn"
                >
                  <span>CONTINUE</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE CALENDAR & HOUR */}
          {step === 3 && (
            <div className="animate-scale-up" id="step-3-wrap">
              <span className="text-[#DC2626] font-[Montserrat] text-[10px] font-bold tracking-widest uppercase mb-1 block">STEP 3 of 4</span>
              <h3 className="font-[Playfair_Display] text-white text-xl font-bold mb-5">Date & Time Reservation</h3>

              {/* Horizontal Date Ribbon */}
              <span className="font-[Montserrat] text-[10px] text-[#cfc4c5]/50 uppercase font-black mb-2.5 block tracking-widest">Select Date</span>
              <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-thin scrollbar-thumb-[#333]" id="calendar-ribbon">
                {daysList.map((day, i) => {
                  const isChecked = selectedDate === day.isoString;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(day.isoString)}
                      className={`flex flex-col items-center justify-center p-3.5 border rounded-sm min-w-[70px] text-center transition-all duration-200 ${
                        isChecked
                          ? 'bg-[#DC2626] border-[#DC2626] text-white'
                          : 'bg-[#181a1a] border-[#222] hover:border-[#444] text-[#cfc4c5]'
                      }`}
                      id={`date-cell-${day.isoString}`}
                    >
                      <span className="font-[Montserrat] text-[10px] tracking-wide uppercase font-semibold opacity-70">{day.dayName}</span>
                      <span className="font-[Montserrat] text-lg font-extrabold my-0.5">{day.dateNum}</span>
                      <span className="font-[Montserrat] text-[90%] text-[8px] tracking-wider uppercase font-extrabold opacity-60">{day.monthName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hour Slots Grid */}
              <span className="font-[Montserrat] text-[10px] text-[#cfc4c5]/50 uppercase font-black mb-2.5 block tracking-widest">Select Hour</span>
              <div className="grid grid-cols-3 gap-2" id="time-grid">
                {availableSlots.map((time, idx) => {
                  const active = selectedTime === time;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 border rounded-sm font-[Montserrat] text-xs font-semibold tracking-wider text-center transition-all duration-150 ${
                        active
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                          : 'bg-[#181a1a] border-[#222] hover:border-[#333] text-[#cfc4c5]/80'
                      }`}
                      id={`time-cell-${idx}`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Controls */}
              <div className="mt-8 pt-4 border-t border-[#1C1F1F] flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3 px-5 rounded-sm transition-all duration-200 bg-transparent hover:bg-white/5 border border-white/15 text-white/80"
                  id="back-step-3-btn"
                >
                  BACK
                </button>
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3.5 px-6 rounded-sm transition-all duration-200 flex items-center space-x-1"
                  id="checkout-step-3-btn"
                >
                  <span>CONTINUE</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST DETAILS & PROMO CODES */}
          {step === 4 && (
            <div className="animate-scale-up" id="step-4-wrap">
              <span className="text-[#DC2626] font-[Montserrat] text-[10px] font-bold tracking-widest uppercase mb-1 block">STEP 4 of 4</span>
              <h3 className="font-[Playfair_Display] text-white text-xl font-bold mb-5">Guest Information & Validation</h3>

              <form onSubmit={handleCreateAppointmentSubmit} className="space-y-4">
                
                {/* Guest Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-[Montserrat] text-white/50 text-[10px] font-extrabold tracking-widest uppercase mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Richard Hendricks"
                      className="bg-black border border-[#222] focus:border-[#DC2626] rounded-sm py-2 px-3 font-[Montserrat] text-xs text-white focus:outline-none transition-colors"
                      id="booking-input-name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-[Montserrat] text-white/50 text-[10px] font-extrabold tracking-widest uppercase mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (555) 019-2834"
                      className="bg-black border border-[#222] focus:border-[#DC2626] rounded-sm py-2 px-3 font-[Montserrat] text-xs text-white focus:outline-none transition-colors"
                      id="booking-input-phone"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="font-[Montserrat] text-white/50 text-[10px] font-extrabold tracking-widest uppercase mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. richard@piedpiper.com"
                    className="bg-black border border-[#222] focus:border-[#DC2626] rounded-sm py-2 px-3 font-[Montserrat] text-xs text-white focus:outline-none transition-colors"
                    id="booking-input-email"
                  />
                </div>

                {/* Promo Code Fields */}
                <div className="bg-[#181a1a] border border-[#222] p-4 rounded-sm">
                  <span className="font-[Montserrat] text-white/50 text-[9px] font-bold tracking-widest uppercase mb-2 block">Premium Voucher / Gift Promo</span>
                  
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 p-2 rounded-sm text-green-400 text-xs font-[Montserrat] font-semibold">
                      <span className="flex items-center space-x-1">
                        <Sparkles size={12} />
                        <span>Voucher '{appliedPromo.code}' applied! Saved {appliedPromo.percent}% (₹{discountAmount.toFixed(2)})</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-white hover:text-[#DC2626] text-[10px] font-bold uppercase underline"
                      >
                        REMOVE
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError('');
                        }}
                        placeholder="ENTER VIP CODE (e.g. WELCOMEVIP)"
                        className="flex-1 bg-black border border-[#333] focus:border-white rounded-sm py-2 px-3 font-[Montserrat] text-[10px] text-white placeholder-white/30 uppercase focus:outline-none transition-colors"
                        id="promo-code-input"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-[#D4AF37] hover:bg-amber-500 text-black font-[Montserrat] text-[10px] font-black uppercase px-4 rounded-sm tracking-wide transition-colors"
                        id="apply-promo-btn"
                      >
                        APPLY
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <span className="text-[#DC2626] font-[Montserrat] text-[10px] mt-2 block font-medium flex items-center space-x-1">
                      <AlertCircle size={10} />
                      <span>{promoError}</span>
                    </span>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col">
                  <label className="font-[Montserrat] text-white/50 text-[10px] font-extrabold tracking-widest uppercase mb-1.5">Special Instructions (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="e.g. Allergies, specific hair texture warnings, long-styling requirements..."
                    className="bg-black border border-[#222] focus:border-white rounded-sm py-2 px-3 font-[Montserrat] text-xs text-white focus:outline-none transition-colors resize-none"
                    id="booking-input-notes"
                  />
                </div>

                {/* Step Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-[#1C1F1F] flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3 px-5 rounded-sm transition-all duration-200 bg-transparent hover:bg-white/5 border border-white/15 text-white/80"
                    id="back-step-4-btn"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-3.5 px-6 rounded-sm transition-all duration-200 shadow-md flex items-center space-x-2"
                    id="finalize-booking-btn"
                  >
                    <span>CONFIRM BOOKING</span>
                    <Sparkles size={11} className="animate-spin" />
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* STEP 5: SUCCESS TICKET DECAL DEPLOYMENT */}
          {step === 5 && createdBooking && (
            <div className="animate-scale-up py-4 flex flex-col items-center text-center" id="booking-success-screen">
              
              <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Check size={32} />
              </div>

              <h2 className="font-[Playfair_Display] text-2xl md:text-3xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="font-[Montserrat] text-[#cfc4c5]/80 text-xs max-w-[400px] mb-8 leading-relaxed">
                Thank you, <span className="text-white font-bold">{createdBooking.customerName}</span>. We have noted your appointment and will see you at the salon.
              </p>

              {/* VIP Digital Gold Salon Card Boarding Pass */}
              <div className="w-full max-w-[400px] bg-black/60 border border-[#D4AF37]/35 rounded-sm overflow-hidden relative shadow-xl text-left" id="boarding-pass">
                {/* Decorative notches */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#121414] rounded-full border border-r-[#222]" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#121414] rounded-full border border-l-[#222]" />
                
                {/* Boarding head */}
                <div className="bg-[#D4AF37] p-4 text-black flex justify-between items-center">
                  <div>
                    <h4 className="font-[Montserrat] text-[10px] font-black tracking-widest uppercase">MR. MAHI UNISEX SALON</h4>
                    <p className="font-[Playfair_Display] text-sm font-bold mt-0.5">Appointment Details</p>
                  </div>
                  <Ticket size={24} className="opacity-80" />
                </div>

                {/* Boarding Body */}
                <div className="p-5 font-[Montserrat] space-y-4">
                  <div className="grid grid-cols-2 gap-4 border-b border-[#222] pb-3.5">
                    <div>
                      <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase block mb-1">GUEST NAME</span>
                      <span className="text-white text-xs font-semibold uppercase">{createdBooking.customerName}</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase block mb-1">CONFIRMATION #</span>
                      <span className="text-white font-mono text-xs font-black text-[#DC2626]">{createdBooking.confirmationCode}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-[#222] pb-3.5">
                    <div>
                      <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase block mb-1">SCHEDULE DATE</span>
                      <span className="text-white text-xs font-semibold">{createdBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase block mb-1">CHAIR SLOT</span>
                      <span className="text-white text-xs font-semibold">{createdBooking.timeSlot}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase block mb-1">PROFESSIONAL STYLIST</span>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase">{activeStylistObj?.name}</span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="bg-[#1C1F1F]/50 px-5 py-3 text-center border-t border-[#222]/80">
                  <span className="text-[#cfc4c5]/60 text-[9px] font-semibold tracking-wider font-[Montserrat] uppercase block">
                    Please share this code when you arrive.
                  </span>
                </div>
              </div>

              {/* Close session button */}
              <button
                onClick={onClose}
                className="mt-8 bg-white hover:bg-[#cfc4c5] text-black font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase py-4 px-10 rounded-sm transition-all duration-300"
                id="booking-finish-close"
              >
                CLOSE
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
