import { useState, useEffect } from 'react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { Star, PlusCircle, ArrowRight, UserSquare } from 'lucide-react';

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form fields state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Style Enthusiast');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Load reviews from localStorage or fallback to default ones
    const saved = localStorage.getItem('mrmahi_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(REVIEWS);
      }
    } else {
      setReviews(REVIEWS);
      localStorage.setItem('mrmahi_reviews', JSON.stringify(REVIEWS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author,
      role,
      rating,
      text,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('mrmahi_reviews', JSON.stringify(updated));

    // Reset Form Fields & Success state
    setAuthor('');
    setRole('Style Enthusiast');
    setRating(5);
    setText('');
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setShowForm(false);
    }, 4000);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0A0B0B] text-white overflow-hidden border-t border-[#111]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16" id="testimonials-header">
          <div>
            <h2 className="font-[Playfair_Display] text-3xl md:text-[42px] font-bold tracking-tight text-white mb-4">
              Voice of Elegance
            </h2>
            <p className="font-[Montserrat] text-[#cfc4c5]/70 text-sm md:text-base max-w-[500px]">
              Discover why discerning gentlemen and women choose Mr. Mahi for their grooming rituals.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 text-[#D4AF37] hover:text-white font-[Montserrat] text-[12px] font-extrabold tracking-[0.2em] uppercase border-b border-[#D4AF37]/35 hover:border-white py-1 transition-all duration-300 self-start md:self-end mt-6 md:mt-0"
            id="write-review-toggle"
          >
            <PlusCircle size={14} className="text-[#DC2626]" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Floating Custom Review Form Block */}
        {showForm && (
          <div className="mb-12 bg-[#121414] border border-[#D4AF37]/25 rounded-sm p-6 md:p-10 max-w-[700px] animate-scale-up" id="review-submission-box">
            {formSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/30">
                  <Star size={28} className="fill-[#D4AF37]" />
                </div>
                <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-bold text-white mb-2">Thank you for sharing your experience</h3>
                <p className="font-[Montserrat] text-[#cfc4c5]/80 text-sm max-w-[400px] mx-auto leading-relaxed">
                  Your feedback helps maintain the high standards of luxury styling at the sanctuary.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-[Playfair_Display] text-xl font-bold text-white mb-2">Submit Your Sanctuary Experience</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Author Name */}
                  <div className="flex flex-col">
                    <label className="font-[Montserrat] text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">Guest Name</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Richard G."
                      className="bg-black border-b border-white/20 focus:border-[#DC2626] py-2.5 px-1 font-[Montserrat] text-sm text-white placeholder-white/35 focus:outline-none transition-colors"
                      id="review-input-name"
                    />
                  </div>

                  {/* Profile / Role Banner */}
                  <div className="flex flex-col">
                    <label className="font-[Montserrat] text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">Role Status</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="bg-black border-b border-white/20 focus:border-[#DC2626] py-2 px-1 font-[Montserrat] text-sm text-[#cfc4c5] focus:outline-none transition-colors"
                      id="review-input-role"
                    >
                      <option value="Executive Client">Executive Client</option>
                      <option value="Premium Resident">Premium Resident</option>
                      <option value="Style Enthusiast">Style Enthusiast</option>
                      <option value="VIP Patron">VIP Patron</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars selection */}
                <div className="flex flex-col">
                  <span className="font-[Montserrat] text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">Your Rating</span>
                  <div className="flex items-center space-x-2 py-1">
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <button
                        key={starIdx}
                        type="button"
                        onClick={() => setRating(starIdx)}
                        onMouseEnter={() => setHoverRating(starIdx)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-gray-600 hover:text-[#D4AF37] transition-all duration-150 focus:outline-none"
                        aria-label={`Rate ${starIdx} stars`}
                        id={`review-star-btn-${starIdx}`}
                      >
                        <Star
                          size={24}
                          className={`${
                            starIdx <= (hoverRating || rating)
                              ? 'text-[#D4AF37] fill-[#D4AF37]'
                              : 'text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 font-[Montserrat] text-sm text-[#D4AF37] font-semibold">{rating} of 5 Stars</span>
                  </div>
                </div>

                {/* Review Description */}
                <div className="flex flex-col">
                  <label className="font-[Montserrat] text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">Review Details</label>
                  <textarea
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder="Describe your session, the service quality, ambience, styling outcomes..."
                    className="bg-black border-b border-white/20 focus:border-[#DC2626] py-2 px-2 font-[Montserrat] text-sm text-white placeholder-white/35 focus:outline-none transition-colors resize-none"
                    id="review-input-text"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-[Montserrat] text-[11px] font-extrabold tracking-widest uppercase px-6 py-3.5 rounded-sm transition-all duration-200 shadow-md flex items-center space-x-2"
                    id="review-submit-btn"
                  >
                    <span>SUBMIT EXPERIENCE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials cards Grid matching screenshot layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8" id="testimonials-grid">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121414] hover:bg-[#151717] border border-[#1A1F1F] rounded-sm p-8 md:p-10 transition-all duration-300 flex flex-col justify-between h-full relative"
              id={`review-card-${rev.id}`}
            >
              <div>
                {/* 5 gold stars */}
                <div className="flex items-center space-x-1 mb-8" id={`review-stars-${rev.id}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < rev.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-[#222]'}
                    />
                  ))}
                </div>

                {/* Review Italic Text */}
                <blockquote className="font-[Montserrat] text-white/95 text-[14px] md:text-[15px] font-light leading-relaxed mb-10 italic">
                  "{rev.text}"
                </blockquote>
              </div>

              {/* Author Details Block */}
              <div className="flex items-center justify-between border-t border-[#1C1F1F]/75 pt-6 mt-auto">
                <div>
                  <h4 className="font-[Montserrat] text-white text-[13px] font-bold tracking-wide">
                    {rev.author}
                  </h4>
                  <p className="font-[Montserrat] text-[#D4AF37] text-[10px] tracking-widest uppercase mt-1 font-semibold">
                    {rev.role}
                  </p>
                </div>
                
                {/* Visual Avatar fallback */}
                <div className="w-9 h-9 bg-black/50 border border-[#333]/30 flex items-center justify-center rounded-full">
                  <span className="text-[#DC2626] font-bold text-xs uppercase font-[Montserrat]">
                    {rev.author.substring(0, 2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
