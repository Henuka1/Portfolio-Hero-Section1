import { ChevronDown } from 'lucide-react';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { PageTransition } from './components/PageTransition';
import { ContactSection } from './components/ContactSection';
import { PricingSection } from './components/PricingSection';

const DAY_BG = 'https://res.cloudinary.com/djxspiq46/image/upload/v1780780423/day_lozegl.png';
const NIGHT_BG = 'https://res.cloudinary.com/djxspiq46/image/upload/v1780780423/night_xogjs0.png';

function HomePage() {
  const { isNight, setCurrentPage } = useTheme();

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url('${isNight ? NIGHT_BG : DAY_BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ backgroundColor: isNight ? 'rgba(32, 47, 63, 0.35)' : 'rgba(255, 255, 255, 0)' }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-light text-white text-center leading-tight drop-shadow-lg">
              Craft Digital Experiences That Elevate Your Brand
            </h1>
            <p className="text-center text-white text-lg font-light leading-relaxed mt-8 max-w-2xl mx-auto drop-shadow-lg">
              Award-winning designer transforming visions into compelling digital solutions with meticulous attention to detail and creative excellence.
            </p>

            {/* Get Started CTA */}
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-10 py-3.5 bg-white text-gray-900 rounded-sm font-medium text-xs tracking-widest hover:bg-white/90 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => setCurrentPage('pricing')}
          className="absolute bottom-8 left-8 flex items-center gap-2 text-white text-xs font-medium drop-shadow-lg hover:opacity-70 transition-opacity cursor-pointer group"
        >
          <ChevronDown size={16} className="animate-bounce group-hover:translate-y-1 transition-transform" />
          <span>SCROLL TO EXPLORE</span>
        </button>

        {/* Decorative dot */}
        <div className="absolute bottom-8 right-8 w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { currentPage, isNight } = useTheme();

  useEffect(() => {
    document.documentElement.style.colorScheme = isNight ? 'dark' : 'light';
  }, [isNight]);

  // Prevent page scrolling only when the home page is active — allow scrolling on pricing and contact
  useEffect(() => {
    const noScrollPages = ['home', 'contact'];
    if (noScrollPages.includes(currentPage)) {
      document.body.style.overflow = 'hidden';
      // also lock the root/html to prevent any scrollbar appearing in some browsers
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Hide the visible scrollbar on the root when contact or pricing page is active
    if (currentPage === 'contact' || currentPage === 'pricing') {
      document.documentElement.classList.add('hide-scrollbar');
    } else {
      document.documentElement.classList.remove('hide-scrollbar');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPage]);

  return (
    <div className="relative w-full min-h-screen">
      <PageTransition isActive={currentPage === 'home'}>
        <HomePage />
      </PageTransition>
      <PageTransition isActive={currentPage === 'contact'}>
        <ContactSection />
      </PageTransition>
      <PageTransition isActive={currentPage === 'pricing'}>
        <PricingSection />
      </PageTransition>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
