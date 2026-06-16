import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { SERVICES, STYLISTS } from '../data';
import { X, Trash2, Calendar, Clock, Contact, HelpCircle, ShieldAlert, BadgeInfo, CheckCircle } from 'lucide-react';

interface AppointmentsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCount: () => void;
}

export function AppointmentsManager({ isOpen, onClose, onUpdateCount }: AppointmentsManagerProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const fetchAppointments = () => {
    const saved = localStorage.getItem('mrmahi_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        setAppointments([]);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAppointments();
      setConfirmCancelId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancelAppointment = (id: string) => {
    const filtered = appointments.filter((apt) => apt.id !== id);
    setAppointments(filtered);
    localStorage.setItem('mrmahi_appointments', JSON.stringify(filtered));
    setConfirmCancelId(null);
    onUpdateCount(); // Refresh parent count
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex justify-end animate-fade-in" id="appointments-manager-mask">
      
      {/* Click outside target panel */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Main Drawer Shell */}
      <div
        className="relative z-10 w-full max-w-[460px] h-full bg-[#121414] border-l border-[#1C1F1F] flex flex-col justify-between shadow-2xl animate-slide-in-right"
        id="appointments-manager-panel"
      >
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#1C1F1F] flex items-center justify-between" id="manager-header">
          <div>
            <h3 className="font-[Playfair_Display] text-xl font-bold text-white">Your Appointments</h3>
            <span className="font-[Montserrat] text-[10px] text-[#D4AF37] tracking-widest font-bold uppercase mt-1 block">MR. MAHI SALON</span>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-[#DC2626] bg-[#1a1c1c] border border-white/5 hover:border-[#DC2626]/20 p-2.5 rounded-full transition-all duration-200"
            title="Close reservations list"
            id="close-manager-drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" id="appointments-listing-scroller">
          {appointments.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center h-full" id="empty-manager-state">
              <div className="w-12 h-12 bg-[#D4AF37]/5 border border-[#D4AF37]/15 rounded-full flex items-center justify-center text-[#D4AF37]/65 mb-4">
                <BadgeInfo size={24} />
              </div>
              <p className="font-[Playfair_Display] text-white text-lg font-bold mb-1">No active chairs reserved</p>
              <p className="font-[Montserrat] text-[#cfc4c5]/60 text-xs max-w-[240px] leading-relaxed mx-auto">
                Nothing booked yet. Use the Book Now button to schedule your visit.
              </p>
            </div>
          ) : (
            <div className="space-y-4" id="appointments-card-stack">
              {appointments.map((apt) => {
                const stylistObj = STYLISTS.find(st => st.id === apt.stylistId);
                const isConfirmingCancel = confirmCancelId === apt.id;
                
                return (
                  <div
                    key={apt.id}
                    className="bg-black/40 border border-[#222] p-5 rounded-sm hover:border-[#333] transition-colors relative flex flex-col justify-between"
                    id={`apt-item-${apt.id}`}
                  >
                    
                    {/* Header info */}
                    <div className="flex items-start justify-between border-b border-[#222]/50 pb-3 mb-3">
                      <div>
                        <span className="text-[#D4AF37] text-xs font-black font-mono tracking-wider">{apt.confirmationCode}</span>
                        <div className="flex items-center space-x-1.5 text-[10px] text-zinc-500 font-[Montserrat] mt-1">
                          <CheckCircle size={10} className="text-green-500" />
                          <span className="uppercase text-green-500 font-bold">Confirmed</span>
                        </div>
                      </div>
                      
                      {/* Cancel icon trigger toggle */}
                      {!isConfirmingCancel && (
                        <button
                          onClick={() => setConfirmCancelId(apt.id)}
                          className="text-[#cfc4c5]/50 hover:text-[#DC2626] bg-[#1a1c1c] border border-white/5 hover:border-[#DC2626]/20 p-2 rounded-full transition-all duration-200"
                          title="Cancel Reservation"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    {/* Double Check confirm Cancel menu overlay */}
                    {isConfirmingCancel ? (
                      <div className="bg-[#DC2626]/10 border border-[#DC2626]/40 p-4 rounded-sm animate-scale-up" id="cancel-confirm-box">
                        <div className="flex items-start space-x-2.5 mb-3 text-white">
                          <ShieldAlert size={16} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                          <p className="font-[Montserrat] text-xs leading-relaxed text-zinc-300">
                            Confirm cancelling your reserved salon chair {apt.confirmationCode}? This process cannot be reversed.
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 justify-end">
                          <button
                            onClick={() => setConfirmCancelId(null)}
                            className="bg-transparent text-white border border-white/20 hover:border-white px-3 py-1.5 rounded-sm font-[Montserrat] text-[10px] uppercase font-bold"
                            id="abort-cancel-btn"
                          >
                            KEEP CHAIR
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="bg-[#DC2626] text-white hover:bg-[#B91C1C] px-3.5 py-1.5 rounded-sm font-[Montserrat] text-[10px] uppercase font-bold"
                            id="confirm-cancel-btn"
                          >
                            CANCEL APPOINTMENT
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Regular info display block */
                      <div className="font-[Montserrat] space-y-3">
                        {/* Services involved */}
                        <div>
                          <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase block mb-1">Services Registered</span>
                          <div className="space-y-1">
                            {apt.serviceIds.map((sid) => {
                              const sObj = SERVICES.find(s => s.id === sid);
                              return (
                                <p key={sid} className="text-white text-xs font-semibold">{sObj?.name}</p>
                              );
                            })}
                          </div>
                        </div>

                        {/* Schedule details */}
                        <div className="grid grid-cols-2 gap-3 pb-1">
                          <div>
                            <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase block">Date</span>
                            <span className="text-zinc-300 text-xs font-semibold">{apt.date}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase block">Chaired Hour</span>
                            <span className="text-zinc-300 text-xs font-semibold">{apt.timeSlot}</span>
                          </div>
                        </div>

                        {/* Stylist name */}
                        <div>
                          <span className="text-zinc-500 text-[9px] font-bold tracking-widest uppercase block">Selected Stylist</span>
                          <span className="text-[#D4AF37] text-xs font-bold uppercase">{stylistObj?.name}</span>
                        </div>

                        {/* Total price charged */}
                        <div className="border-t border-[#222]/50 pt-2.5 flex justify-between items-center text-xs">
                          <span className="text-zinc-500 text-[9px] font-bold">TOTAL AMOUNT</span>
                          <span className="text-white font-extrabold font-[Montserrat]">₹{apt.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer footer help block */}
        <div className="p-6 border-t border-[#1C1F1F] bg-black" id="manager-footer">
          <div className="flex items-start space-x-3 text-zinc-500 text-xs font-[Montserrat]" id="footer-helper-text">
            <HelpCircle size={14} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Want to change your date or services? Cancel your booking here and make a new one. For group bookings, call us on <a href="tel:+919876543210" className="text-white underline">+91 98765 43210</a>.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
