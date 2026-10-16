import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { TraditionPillars } from './components/home/TraditionPillars';
import { SignatureSpotlight } from './components/featured/SignatureSpotlight';
import { MenuSection } from './components/menu/MenuSection';
import { AboutSection } from './components/about/AboutSection';
import { GallerySection } from './components/gallery/GallerySection';
import { ReservationSection } from './components/reservation/ReservationSection';
import { LocationSection } from './components/location/LocationSection';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { MobileQuickBar } from './components/common/MobileQuickBar';
import './styles/components.css';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <CartProvider>
      <div className="app-layout">
        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Main Content Flow */}
        <main id="main-content">
          <HeroSection />
          <TraditionPillars onSelectCategory={setSelectedCategory} />
          <SignatureSpotlight onSelectCategory={setSelectedCategory} />
          <MenuSection
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <AboutSection />
          <GallerySection />
          <ReservationSection />
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Mobile Floating Quick Action Bar */}
        <MobileQuickBar />
      </div>
    </CartProvider>
  );
}

export default App;

