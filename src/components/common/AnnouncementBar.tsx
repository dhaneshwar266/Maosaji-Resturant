import React from 'react';
import { Sparkles, Phone, MessageCircle } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside className="announcement-bar" aria-label="Restaurant Announcement">
      <div className="container announcement-content">
        <span className="announcement-badge">
          <Sparkles size={13} aria-hidden="true" />
          {RESTAURANT_CONFIG.announcement.badge}
        </span>
        <span className="announcement-text">{RESTAURANT_CONFIG.announcement.message}</span>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
          <a
            href={RESTAURANT_CONFIG.phoneTelUrl}
            className="announcement-cta"
            aria-label={`Call restaurant at ${RESTAURANT_CONFIG.phoneDisplay}`}
          >
            <Phone size={13} aria-hidden="true" />
            <span>{RESTAURANT_CONFIG.phoneDisplay}</span>
          </a>
          <a
            href={RESTAURANT_CONFIG.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-cta"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle size={13} aria-hidden="true" />
            <span>WhatsApp Quick Order</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
