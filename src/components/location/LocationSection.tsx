import React from 'react';
import { MapPin, Navigation, Phone, MessageCircle, ExternalLink, Compass } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const LocationSection: React.FC = () => {
  return (
    <section className="section location-section" id="location" aria-labelledby="location-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pretitle">पधारो मौसाजी • Find Our Restaurant</span>
          <h2 id="location-title" className="section-title">
            Location & Contact
          </h2>
          <div className="decorative-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
          <p className="section-description">
            Conveniently located in Bilaspur, Chhattisgarh. Use the verified Google Maps button below for direct
            turn-by-turn navigation or reach out directly to our team via phone or WhatsApp.
          </p>
        </div>

        {/* Location Grid */}
        <div className="location-grid" id="contact">
          {/* Contact Details Card */}
          <div className="location-info-card">
            <div className="contact-row-item">
              <div className="contact-icon-box" aria-hidden="true">
                <MapPin size={24} />
              </div>
              <div>
                <span className="contact-row-title">Restaurant Location</span>
                <p className="contact-row-value">{RESTAURANT_CONFIG.name}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                  {RESTAURANT_CONFIG.locationArea}
                </p>
                <div style={{ marginTop: '12px' }}>
                  <a
                    href={RESTAURANT_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '9px 18px', fontSize: '0.85rem' }}
                  >
                    <Navigation size={15} aria-hidden="true" />
                    <span>Get GPS Directions on Google Maps</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-row-item">
              <div className="contact-icon-box" aria-hidden="true">
                <Phone size={24} />
              </div>
              <div>
                <span className="contact-row-title">Direct Telephone</span>
                <p className="contact-row-value">
                  <a href={RESTAURANT_CONFIG.phoneTelUrl}>{RESTAURANT_CONFIG.phoneDisplay}</a>
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
                  Available for dining inquiries, party orders & takeaway pickup
                </p>
              </div>
            </div>

            <div className="contact-row-item">
              <div className="contact-icon-box" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#128C7E', border: '1.5px solid #25D366' }} aria-hidden="true">
                <MessageCircle size={24} />
              </div>
              <div>
                <span className="contact-row-title">Official WhatsApp Ordering & Inquiries</span>
                <p className="contact-row-value">
                  <a
                    href={RESTAURANT_CONFIG.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#128C7E' }}
                  >
                    +91 62664 44862 (Chat with Team)
                  </a>
                </p>
                <div style={{ marginTop: '12px' }}>
                  <a
                    href={RESTAURANT_CONFIG.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ padding: '9px 18px', fontSize: '0.85rem' }}
                  >
                    <MessageCircle size={15} aria-hidden="true" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-row-item">
              <div className="contact-icon-box" aria-hidden="true">
                <Compass size={24} />
              </div>
              <div>
                <span className="contact-row-title">सुविधाएं व व्यवस्था • Amenities</span>
                <p style={{ color: 'var(--color-burgundy)', fontWeight: 700, fontSize: '0.98rem' }}>
                  100% Pure Veg AC Family Dining & Takeaway
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Spacious air-conditioned dining hall, dedicated parking, fresh preparation counter, and festive bulk orders.
                </p>
              </div>
            </div>
          </div>

          {/* Map Display & Directions Widget */}
          <div className="map-embed-wrapper">
            {/* Live Interactive Google Maps Iframe */}
            <div
              style={{
                width: '100%',
                height: '320px',
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                overflow: 'hidden',
                position: 'relative',
                borderBottom: '2px solid var(--color-gold)',
              }}
            >
              <iframe
                title="Maosaji Restaurant Google Map Location in Bilaspur"
                src={`https://maps.google.com/maps?q=${RESTAURANT_CONFIG.coordinates.lat},${RESTAURANT_CONFIG.coordinates.lng}&hl=en&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Operating Hours & Landmark Details */}
            <div style={{ padding: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '16px',
                  paddingBottom: '14px',
                  borderBottom: '1px dashed rgba(228, 173, 82, 0.35)',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: 'var(--color-maroon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    प्रतिदिन खुला • Open 7 Days
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      color: 'var(--color-burgundy)',
                    }}
                  >
                    8:00 AM – 10:30 PM
                  </h3>
                </div>

                <a
                  href={RESTAURANT_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '9px 18px', fontSize: '0.85rem' }}
                >
                  <Navigation size={15} aria-hidden="true" />
                  <span>Google Maps Navigation</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '12px',
                  fontSize: '0.82rem',
                }}
              >
                <div
                  style={{
                    padding: '10px 12px',
                    background: 'var(--color-parchment)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(228, 173, 82, 0.25)',
                  }}
                >
                  <strong style={{ color: 'var(--color-maroon)', display: 'block' }}>🌅 सुबह का नाश्ता</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>8:00 AM – 11:30 AM</span>
                </div>
                <div
                  style={{
                    padding: '10px 12px',
                    background: 'var(--color-parchment)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(228, 173, 82, 0.25)',
                  }}
                >
                  <strong style={{ color: 'var(--color-maroon)', display: 'block' }}>🍛 दोपहर की थाली</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>11:30 AM – 4:00 PM</span>
                </div>
                <div
                  style={{
                    padding: '10px 12px',
                    background: 'var(--color-parchment)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(228, 173, 82, 0.25)',
                  }}
                >
                  <strong style={{ color: 'var(--color-maroon)', display: 'block' }}>🌆 शाम की चाट</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>4:00 PM – 7:00 PM</span>
                </div>
                <div
                  style={{
                    padding: '10px 12px',
                    background: 'var(--color-parchment)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(228, 173, 82, 0.25)',
                  }}
                >
                  <strong style={{ color: 'var(--color-maroon)', display: 'block' }}>🌙 रात्रि शाही भोजन</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>7:00 PM – 10:30 PM</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                <Compass size={15} color="var(--color-gold-dark)" aria-hidden="true" />
                <span>
                  Bilaspur, Chhattisgarh • Lat: {RESTAURANT_CONFIG.coordinates.lat.toFixed(4)}° N, Long: {RESTAURANT_CONFIG.coordinates.lng.toFixed(4)}° E • {RESTAURANT_CONFIG.locationArea}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
