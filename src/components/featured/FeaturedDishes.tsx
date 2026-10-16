import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuData';
import { MenuCard } from '../menu/MenuCard';
import type { MenuItem } from '../../types/restaurant';
import { MenuItemModal } from '../menu/MenuItemModal';

export const FeaturedDishes: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Curated showcase of signature dishes
  const featuredItems = MENU_ITEMS.filter((item) => item.isFeatured).slice(0, 8);

  return (
    <section className="section featured-section" id="featured" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-header">
          <span className="section-pretitle">Signature Offerings</span>
          <h2 id="featured-title" className="section-title">
            Featured Delicacies
          </h2>
          <div className="decorative-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
          <p className="section-description">
            Hand-picked customer favorites from our kitchen, prepared fresh everyday with pure ingredients,
            aromatic spices, and traditional culinary mastery.
          </p>
        </div>

        <div className="featured-grid">
          {featuredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onItemClick={(clicked) => setSelectedItem(clicked)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#menu" className="btn btn-secondary">
            <span>Explore All 78 Menu Items</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      {selectedItem && (
        <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
};
