import React, { useState } from 'react';
import { Calendar, User, Phone, Clock, Users, Gift, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';
import type { ReservationRequest } from '../../types/restaurant';
import { generateWhatsAppReservationUrl } from '../../utils/whatsapp';

// Helper to get today's date formatted as YYYY-MM-DD
const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const ReservationSection: React.FC = () => {
  const [todayStr] = useState(getTodayDateString);

  const [formData, setFormData] = useState<ReservationRequest>(() => ({
    customerName: '',
    mobileNumber: '',
    date: getTodayDateString(),
    timeSlot: '07:30 PM (Dinner)',
    guests: 4,
    occasion: 'Family Gathering',
    specialRequests: '',
  }));

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationRequest, string>>>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationRequest, string>> = {};

    // Customer Name validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters';
    }

    // Indian Mobile Number validation (10 digits starting with 6, 7, 8, or 9)
    const cleanedPhone = formData.mobileNumber.replace(/\D/g, '');
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!cleanedPhone) {
      newErrors.mobileNumber = 'Please enter your 10-digit mobile number';
    } else if (!indianMobileRegex.test(cleanedPhone)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9)';
    }

    // Date validation: cannot be in the past
    if (!formData.date) {
      newErrors.date = 'Please select a reservation date';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Reservation date cannot be in the past';
    }

    // Time slot validation
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a preferred dining time';
    }

    // Guests validation
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Number of guests must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const cleanedData: ReservationRequest = {
      ...formData,
      mobileNumber: formData.mobileNumber.replace(/\D/g, ''),
    };

    const whatsappUrl = generateWhatsAppReservationUrl(cleanedData);
    setSubmittedUrl(whatsappUrl);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section reservation-section" id="reservation" aria-labelledby="reservation-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ color: '#FFFFFF' }}>
          <span className="section-pretitle" style={{ color: 'var(--color-gold-bright)' }}>
            दावत आरक्षण • Hospitality & Dining
          </span>
          <h2 id="reservation-title" className="section-title" style={{ color: '#FFFFFF' }}>
            Reserve a Table
          </h2>
          <div className="decorative-divider">
            <span className="divider-line" style={{ background: 'var(--grad-gold)' }} />
            <span className="divider-diamond" style={{ backgroundColor: 'var(--color-gold)' }} />
            <span className="divider-line" style={{ background: 'var(--grad-gold)' }} />
          </div>
          <p className="section-description" style={{ color: 'var(--color-cream)' }}>
            Planning a family lunch, festive celebration, or casual get-together? Prepare your reservation
            request below and connect directly with our restaurant team via WhatsApp.
          </p>
        </div>

        {/* Reservation Card */}
        <div className="reservation-card-container">
          {submittedUrl ? (
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(228, 173, 82, 0.2)',
                  color: 'var(--color-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <CheckCircle2 size={36} aria-hidden="true" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  color: 'var(--color-gold-light)',
                  marginBottom: '12px',
                }}
              >
                Reservation Request Prepared!
              </h3>
              <p
                style={{
                  color: 'var(--color-cream)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  maxWidth: '540px',
                  margin: '0 auto 24px auto',
                }}
              >
                Your reservation details for <strong>{formData.customerName}</strong> ({formData.guests} guests on{' '}
                {formData.date} at {formData.timeSlot}) have been formatted for WhatsApp.
              </p>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(228, 173, 82, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '28px',
                  fontSize: '0.9rem',
                  color: 'var(--color-ivory)',
                }}
              >
                <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--color-gold)' }} />
                <strong>Important:</strong> This is a booking request and does not imply automatic confirmation. Our
                restaurant team will reply on WhatsApp to confirm table availability.
              </div>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <span>Re-open WhatsApp Message</span>
                </a>
                <button
                  type="button"
                  className="btn btn-outline-gold"
                  onClick={() => setSubmittedUrl(null)}
                >
                  <span>Make Another Request</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="reservation-form-grid">
                {/* Customer Name */}
                <div className="form-group">
                  <label htmlFor="res-name" className="form-label">
                    <User size={15} aria-hidden="true" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    className={`form-input ${errors.customerName ? 'input-error' : ''}`}
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                  />
                  {errors.customerName && (
                    <span className="field-error-msg">{errors.customerName}</span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="res-mobile" className="form-label">
                    <Phone size={15} aria-hidden="true" />
                    <span>10-Digit Mobile Number *</span>
                  </label>
                  <input
                    id="res-mobile"
                    type="tel"
                    className={`form-input ${errors.mobileNumber ? 'input-error' : ''}`}
                    placeholder="e.g. 9876543210"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    maxLength={10}
                    required
                  />
                  {errors.mobileNumber && (
                    <span className="field-error-msg">{errors.mobileNumber}</span>
                  )}
                </div>

                {/* Date */}
                <div className="form-group">
                  <label htmlFor="res-date" className="form-label">
                    <Calendar size={15} aria-hidden="true" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={todayStr}
                    className={`form-input ${errors.date ? 'input-error' : ''}`}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  {errors.date && <span className="field-error-msg">{errors.date}</span>}
                </div>

                {/* Time Slot */}
                <div className="form-group">
                  <label htmlFor="res-time" className="form-label">
                    <Clock size={15} aria-hidden="true" />
                    <span>Preferred Time Slot *</span>
                  </label>
                  <select
                    id="res-time"
                    className="form-select"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  >
                    <optgroup label="Lunch Hours">
                      <option value="12:00 PM (Lunch)">12:00 PM</option>
                      <option value="12:30 PM (Lunch)">12:30 PM</option>
                      <option value="01:00 PM (Lunch)">01:00 PM</option>
                      <option value="01:30 PM (Lunch)">01:30 PM</option>
                      <option value="02:00 PM (Lunch)">02:00 PM</option>
                      <option value="02:30 PM (Lunch)">02:30 PM</option>
                      <option value="03:00 PM (Lunch)">03:00 PM</option>
                    </optgroup>
                    <optgroup label="Evening & Dinner Hours">
                      <option value="06:30 PM (Dinner)">06:30 PM</option>
                      <option value="07:00 PM (Dinner)">07:00 PM</option>
                      <option value="07:30 PM (Dinner)">07:30 PM</option>
                      <option value="08:00 PM (Dinner)">08:00 PM</option>
                      <option value="08:30 PM (Dinner)">08:30 PM</option>
                      <option value="09:00 PM (Dinner)">09:00 PM</option>
                      <option value="09:30 PM (Dinner)">09:30 PM</option>
                      <option value="10:00 PM (Dinner)">10:00 PM</option>
                    </optgroup>
                  </select>
                </div>

                {/* Number of Guests */}
                <div className="form-group">
                  <label htmlFor="res-guests" className="form-label">
                    <Users size={15} aria-hidden="true" />
                    <span>Number of Guests *</span>
                  </label>
                  <select
                    id="res-guests"
                    className="form-select"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value={25}>20+ Guests (Large Gathering)</option>
                  </select>
                </div>

                {/* Occasion */}
                <div className="form-group">
                  <label htmlFor="res-occasion" className="form-label">
                    <Gift size={15} aria-hidden="true" />
                    <span>Dining Occasion</span>
                  </label>
                  <select
                    id="res-occasion"
                    className="form-select"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  >
                    <option value="Family Gathering">Family Gathering</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Casual Lunch / Dinner">Casual Lunch / Dinner</option>
                    <option value="Business Meeting">Business Lunch / Meeting</option>
                    <option value="Festive Celebration">Festive Celebration</option>
                    <option value="Other">Other Occasion</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div className="form-group full-width">
                  <label htmlFor="res-requests" className="form-label">
                    <MessageSquare size={15} aria-hidden="true" />
                    <span>Special Requests / Seating Preferences (Optional)</span>
                  </label>
                  <textarea
                    id="res-requests"
                    rows={3}
                    className="form-textarea"
                    placeholder="e.g. Quiet corner table preferred, high chair for infant, mild spice preference for kids..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  />
                </div>
              </div>

              {/* Disclaimer Notice */}
              <div className="form-disclaimer-note">
                <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--color-gold)' }} />
                <span>{RESTAURANT_CONFIG.reservationDisclaimer}</span>
              </div>

              {/* Submit CTA */}
              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '1.05rem' }}>
                  <Calendar size={18} aria-hidden="true" />
                  <span>Send Reservation Request via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
