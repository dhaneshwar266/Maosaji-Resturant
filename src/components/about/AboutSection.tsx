import React from 'react';
import { Leaf, Flame, Shield, Users, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-sanad-card">
          <div className="about-grid">
            {/* Left Text Narrative */}
            <div className="about-text-content">
              <span className="section-pretitle">परंपरा • Culinary Philosophy</span>
              <h2 id="about-title" className="section-title">
                Rooted in Indian Culinary Heritage
              </h2>
              <div className="decorative-divider" style={{ justifyContent: 'flex-start', margin: '14px 0 20px 0' }}>
                <span className="divider-line" style={{ width: '40px' }} />
                <span className="divider-diamond" />
                <span className="divider-line" style={{ width: '80px' }} />
              </div>

              {/* Royal Quote Plaque */}
              <div className="about-quote-plaque">
                <p className="about-quote-text">
                  “परंपरा, शुचिता और स्वाद का संगम — हर निवाले में भारतीय आतिथ्य।”
                </p>
                <span className="about-quote-author">
                  — मौसाजी (Mausaji) • Authentic Vegetarian Tradition
                </span>
              </div>

              <p>
                Indian culinary heritage is an enduring celebration of regional craftsmanship, slow-roasted spices,
                and the joyful warmth of sharing food with family. At{' '}
                <strong style={{ color: 'var(--color-maroon)' }}>मौसाजी (Mausaji)</strong> in Bilaspur,
                Chhattisgarh, we honor this legacy with a dedicated 100% pure vegetarian kitchen.
              </p>

              <p>
                From paper-thin crispy South Indian dosas and Chatori Street savories to rich Punjabi thalis and
                pure desi ghee sweets, every dish honors the timeless balance of sweet, tangy, and aromatic flavors
                crafted fresh daily.
              </p>
            </div>

            {/* Right Image Composition */}
            <div className="about-img-composition">
              <div className="about-arch-frame">
                {/* 100% Pure Veg Badge over Image - centered at arch apex with white-space: nowrap */}
                <div className="about-pureveg-tag">
                  <Leaf size={14} aria-hidden="true" />
                  <span>100% PURE VEG</span>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80"
                  alt="Authentic traditional Indian pure vegetarian feast with aromatic curries, rice and fresh breads"
                  className="about-arch-img"
                  loading="lazy"
                />
              </div>

              {/* Purity Guarantee Plaque - cleanly placed below image so 100% of food is visible and card never gets cut off */}
              <div className="about-guarantee-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-bright)', marginBottom: '5px' }}>
                  <Award size={18} aria-hidden="true" />
                  <h4 className="guarantee-card-title">शुद्धता की गारंटी</h4>
                </div>
                <p className="guarantee-card-text">
                  Committed to genuine Indian food traditions, wholesome hospitality, and authentic pure vegetarian flavors in Bilaspur.
                </p>
              </div>
            </div>
          </div>

          {/* Full Width 4 Core Values Feature Strip */}
          <div className="about-features-strip">
            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <Leaf size={20} />
              </div>
              <div>
                <h3 className="about-feature-title">100% शुद्ध शाकाहारी</h3>
                <p className="about-feature-desc">
                  Dedicated, purely vegetarian culinary environment.
                </p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <Flame size={20} />
              </div>
              <div>
                <h3 className="about-feature-title">ताज़ा मसाले व घी</h3>
                <p className="about-feature-desc">
                  All doughs, batters, and sweets crafted fresh daily.
                </p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="about-feature-title">हथ-कुटा मसाला</h3>
                <p className="about-feature-desc">
                  Stone-ground traditional spices for natural aroma and purity.
                </p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="about-feature-icon" aria-hidden="true">
                <Users size={20} />
              </div>
              <div>
                <h3 className="about-feature-title">पारिवारिक संस्कार</h3>
                <p className="about-feature-desc">
                  Warm hospitality designed for gatherings and celebrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
