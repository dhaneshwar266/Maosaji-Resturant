import React, { useState, useMemo } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuData';
import { MENU_CATEGORIES } from '../../data/categoriesData';
import type { MenuItem } from '../../types/restaurant';
import { MenuCard } from './MenuCard';
import { MenuItemModal } from './MenuItemModal';

const INITIAL_LIMIT = 12;

interface MenuSectionProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedCategory: controlledCategory,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const activeCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const handleSelectCategory = (catId: string) => {
    setShowAll(false);
    if (onCategoryChange) {
      onCategoryChange(catId);
    } else {
      setInternalCategory(catId);
    }
  };

  // Filtered menu logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchCat = activeCategory === 'all' || item.category === activeCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Capped items to display (12 initially, all on Explore All)
  const isCapped = !showAll && filteredItems.length > INITIAL_LIMIT;
  const displayedItems = isCapped ? filteredItems.slice(0, INITIAL_LIMIT) : filteredItems;

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section className="section" id="menu" aria-labelledby="menu-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 id="menu-title" className="section-title">
            The Royal Digital Menu
          </h2>
          <div className="decorative-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
          <p className="section-description">
            Explore 78 authentic vegetarian specialities spanning Chatori Street savories, crispy South Indian dosas,
            Punjabi thalis, Italian & Indo-Chinese favorites, handcrafted shakes, and pure desi ghee sweets.
          </p>
        </div>

        {/* Menu Controls: Search, Categories */}
        <div className="menu-controls">
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <Search className="search-icon-pos" size={22} aria-hidden="true" />
            <input
              type="text"
              className="search-input-royal"
              placeholder="Search dishes by name (e.g. Samosa, Dosa, Manchurian, Pav Bhaji, Ras Malai)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setShowAll(false);
                }}
                aria-label="Clear search query"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category Tabs Scrollable Horizontal Bar */}
          <div
            className="category-tabs-wrapper"
            role="tablist"
            aria-label="Menu category navigation"
          >
            {MENU_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`category-tab-btn-royal ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className="category-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Current Category Description */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '26px',
            paddingBottom: '14px',
            borderBottom: '1.5px dashed rgba(228, 173, 82, 0.4)',
          }}
        >
          <span style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{displayedItems.length}</strong>
            {filteredItems.length > displayedItems.length ? ` of ${filteredItems.length}` : ''} delicacies
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-maroon)',
              fontWeight: 700,
            }}
          >
            {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.description}
          </span>
        </div>

        {/* Dishes Grid */}
        {filteredItems.length > 0 ? (
          <>
            <div className="menu-items-grid">
              {displayedItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onItemClick={(clicked) => setSelectedItem(clicked)}
                />
              ))}
            </div>

            {/* Explore All / Show More Button */}
            {filteredItems.length > INITIAL_LIMIT && (
              <div style={{ textAlign: 'center', marginTop: '36px' }}>
                {!showAll ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{
                      padding: '13px 34px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: 'var(--shadow-royal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onClick={() => setShowAll(true)}
                  >
                    <span>Explore All ({filteredItems.length - INITIAL_LIMIT} More Dishes)</span>
                    <ChevronDown size={18} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{
                      padding: '11px 28px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onClick={() => {
                      setShowAll(false);
                      const menuEl = document.getElementById('menu');
                      if (menuEl) {
                        menuEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span>Show Less (First 12)</span>
                    <ChevronUp size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '2px solid rgba(228, 173, 82, 0.3)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-maroon)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Search size={28} />
            </div>
            <h3
              style={{
                fontSize: '1.35rem',
                color: 'var(--color-burgundy)',
                marginBottom: '8px',
                fontFamily: 'var(--font-serif)',
              }}
            >
              व्यंजन नहीं मिला (No dishes found)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              We could not find any items matching "{searchQuery}" in this category.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                handleSelectCategory('all');
              }}
            >
              Reset Filters & Show All
            </button>
          </div>
        )}
      </div>

      {/* Modal View */}
      {selectedItem && (
        <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
};
