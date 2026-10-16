import React from 'react';
import { Sparkles, Utensils, Coffee, Crown } from 'lucide-react';

interface TraditionPillarsProps {
  onSelectCategory: (categoryId: string) => void;
}

export const TraditionPillars: React.FC<TraditionPillarsProps> = ({ onSelectCategory }) => {
  const pillars = [
    {
      id: 'chatori-street',
      title: 'Chatori Street Chaats',
      desc: 'Crisp samosas, dal kachoris, Raj Kachori, & pani puri',
      icon: Sparkles,
    },
    {
      id: 'south-indian',
      title: 'South Indian Craft',
      desc: 'Crispy paper dosas, cheese masala, & steamed idlis',
      icon: Utensils,
    },
    {
      id: 'snacks-thali',
      title: 'Snacks & Royal Thali',
      desc: 'Buttery pav bhaji, chhole bhature, & special feast',
      icon: Crown,
    },
    {
      id: 'meetha-mazaa',
      title: 'Pure Ghee Sweets & Drinks',
      desc: 'Kesar Ras Malai, Moong Halwa, kulfi, & cold coffee',
      icon: Coffee,
    },
  ];

  const handleClick = (id: string) => {
    onSelectCategory(id);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="tradition-pillars-strip" aria-label="Tradition Flavors Quick Navigation">
      <div className="container">
        <div className="pillars-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="pillar-card"
                onClick={() => handleClick(pillar.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick(pillar.id);
                  }
                }}
              >
                <div className="pillar-icon-box" aria-hidden="true">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
