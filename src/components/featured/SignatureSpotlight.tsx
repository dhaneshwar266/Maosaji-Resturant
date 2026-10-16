import React from 'react';
import { Crown, Sparkles, Utensils, Plus, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuData';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';
import { useCart } from '../../context/useCart';
import type { MenuItem } from '../../types/restaurant';

interface SignatureSpotlightProps {
  onSelectCategory: (category: string) => void;
  onOpenItemModal?: (item: MenuItem) => void;
}

export const SignatureSpotlight: React.FC<SignatureSpotlightProps> = ({
  onSelectCategory,
  onOpenItemModal,
}) => {
  const { cart, addToCart } = useCart();

  // Find the three signature flagship items
  const thaliItem = MENU_ITEMS.find((i) => i.id === 'st-08') || MENU_ITEMS[0];
  const dosaItem = MENU_ITEMS.find((i) => i.id === 'si-07') || MENU_ITEMS[1];
  const kachoriItem = MENU_ITEMS.find((i) => i.id === 'cs-13') || MENU_ITEMS[2];

  const signatures = [
    {
      item: thaliItem,
      hindiTitle: 'मौसाजी स्पेशल थाली',
      badge: 'Royal Feast',
      highlight: '9 पारंपरिक व्यंजनों का अनुपम संगम',
      details: [
        'शाही पनीर मक्खन मसाला',
        'धीमी आंच पर पकी दाल फ्राई',
        'मौसमी सूखी सब्ज़ी',
        'गरमा-गर्म तवा रोटियां व सुगंधित जीरा राइस',
        'बूंदी रायता, मीठा गुलाब जामुन व पापड़',
      ],
      icon: Crown,
      tagColor: '#B8860B',
    },
    {
      item: dosaItem,
      hindiTitle: 'मौसाजी स्पेशल डोसा',
      badge: 'Flagship Dosa',
      highlight: '18 घंटे पारंपरिक खमीर व अमूल बटर',
      details: [
        'कुरकुरा सुनहरा पेपर-थिन डोसा',
        'ताज़ा पनीर क्यूब्स व स्पेशल वेजीज़',
        'सीक्रेट मौसाजी मसाला रोस्टेड',
        'गरमा-गर्म अरहर दाल सांभर',
        'पत्थर पर पिसी ताज़ा नारियल चटनी',
      ],
      icon: Utensils,
      tagColor: '#1E7E34',
    },
    {
      item: kachoriItem,
      hindiTitle: 'शाही राज कचौरी',
      badge: 'Chaat King',
      highlight: 'खट्टा-मीठा तीखा लाजवाब स्वाद',
      details: [
        'विशाल कुरकुरी सुनहरी कचौरी',
        'अंकुरित मूंग व चटपटे उबले आलू',
        'मीठी सोंठ व तीखी पुदीना चटनी',
        'ठंडी मलाईदार फेंटा हुआ दही',
        'रसीले अनार के दाने व कुरकुरी नायलॉन सेव',
      ],
      icon: Sparkles,
      tagColor: '#C45D3E',
    },
  ];

  const occasions = [
    {
      label: 'सुबह का नाश्ता',
      sub: 'Morning Breakfast',
      time: '8:00 AM – 11:30 AM',
      categoryId: 'chatori-street',
      emoji: '🌅',
    },
    {
      label: 'दोपहर की थाली',
      sub: 'Lunch Feast',
      time: '11:30 AM – 4:00 PM',
      categoryId: 'snacks-thali',
      emoji: '🍛',
    },
    {
      label: 'शाम की चटोरी गली',
      sub: 'Evening Chaats',
      time: '4:00 PM – 7:00 PM',
      categoryId: 'chatori-street',
      emoji: '🌆',
    },
    {
      label: 'रात का शाही भोजन',
      sub: 'Dinner Specials',
      time: '7:00 PM – 10:30 PM',
      categoryId: 'chinese-corner',
      emoji: '🌙',
    },
    {
      label: 'शुद्ध देसी मिष्ठान',
      sub: 'Sweets & Shakes',
      time: 'All Day Delights',
      categoryId: 'meetha-mazaa',
      emoji: '🍨',
    },
  ];

  const handleOccasionClick = (catId: string) => {
    onSelectCategory(catId);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section signature-spotlight-section" id="signatures" aria-labelledby="signatures-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-pretitle">शाही आकर्षण • Chef's Heritage Showcase</span>
          <h2 id="signatures-title" className="section-title">
            The Three Royal Signatures
          </h2>
          <div className="decorative-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
          <p className="section-description">
            Carefully curated culinary masterpieces crafted daily with pure desi ghee, stone-ground spices,
            and generations of traditional Indian cooking secrets in Bilaspur.
          </p>
        </div>

        {/* 3 Grand Architectural Showcase Cards */}
        <div className="signature-cards-grid">
          {signatures.map((sig) => {
            const isItemInCart = cart.some((ci) => ci.item.id === sig.item.id);
            const Icon = sig.icon;

            return (
              <div key={sig.item.id} className="signature-showcase-card">
                {/* Card Top Jharokha Arch Window */}
                <div
                  className="signature-arch-window"
                  onClick={() => onOpenItemModal && onOpenItemModal(sig.item)}
                  style={{ cursor: onOpenItemModal ? 'pointer' : 'default' }}
                >
                  <img
                    src={sig.item.image}
                    alt={sig.item.name}
                    className="signature-card-img"
                    loading="lazy"
                  />
                  <div className="signature-badge-pill" style={{ borderColor: sig.tagColor }}>
                    <Icon size={14} color="var(--color-gold-bright)" aria-hidden="true" />
                    <span>{sig.badge}</span>
                  </div>

                  {/* Coin Price Seal */}
                  <div className="signature-coin-seal">
                    <span className="coin-currency">₹</span>
                    <span className="coin-amount">{sig.item.price}</span>
                    <span className="coin-status">
                      {sig.item.priceEstimated ? 'Est.' : 'Verified'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="signature-card-body">
                  <div className="signature-title-row">
                    <div>
                      <h3 className="signature-hindi-title">{sig.hindiTitle}</h3>
                      <h4 className="signature-english-name">{sig.item.name}</h4>
                    </div>
                  </div>

                  <p className="signature-highlight-text">{sig.highlight}</p>

                  {/* Curated list of ingredients / specialties */}
                  <ul className="signature-details-list">
                    {sig.details.map((detail, idx) => (
                      <li key={idx}>
                        <span className="detail-bullet">✦</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="signature-actions-row">
                    <button
                      type="button"
                      className={`btn ${isItemInCart ? 'btn-secondary' : 'btn-primary'}`}
                      style={{ flex: 1, padding: '10px 14px', fontSize: '0.9rem' }}
                      onClick={() => addToCart(sig.item)}
                    >
                      {isItemInCart ? (
                        <>
                          <Check size={16} aria-hidden="true" />
                          <span>In Cart</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} aria-hidden="true" />
                          <span>+ Add to Order</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`${RESTAURANT_CONFIG.whatsAppUrl}&text=${encodeURIComponent(
                        `नमस्ते Maosaji! मुझे "${sig.item.name}" (₹${sig.item.price}) का ऑर्डर करना है। कृपया उपलब्धता बताएं।`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ padding: '10px 14px' }}
                      title="Quick Order on WhatsApp"
                      aria-label={`Order ${sig.item.name} on WhatsApp`}
                    >
                      <MessageCircle size={17} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Craving / Occasion Selector */}
        <div className="craving-navigator-strip">
          <div className="craving-header">
            <span className="craving-pretitle">TASTE BY OCCASION</span>
            <h3 className="craving-title">What are you craving today?</h3>
            <p className="craving-desc">
              Select your dining moment below to instantly explore matching dishes from our 78-item royal menu.
            </p>
          </div>

          <div className="craving-buttons-grid">
            {occasions.map((occ) => (
              <button
                key={occ.label}
                type="button"
                className="craving-btn"
                onClick={() => handleOccasionClick(occ.categoryId)}
              >
                <span className="craving-emoji" aria-hidden="true">
                  {occ.emoji}
                </span>
                <span className="craving-name">{occ.label}</span>
                <span className="craving-sub">{occ.sub}</span>
                <span className="craving-time">{occ.time}</span>
              </button>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <a href="#menu" className="btn btn-secondary">
              <span>Browse All 78 Delicacies</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
