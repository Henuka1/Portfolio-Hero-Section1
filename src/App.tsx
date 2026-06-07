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
      className="h-[100dvh] md:h-screen relative overflow-y-auto overflow-x-hidden transition-all duration-700 ease-in-out bg-cover bg-center bg-scroll md:bg-fixed"
      style={{
        backgroundImage: `url('${isNight ? NIGHT_BG : DAY_BG}')`,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ backgroundColor: isNight ? 'rgba(32, 47, 63, 0.4)' : 'rgba(15, 23, 42, 0.15)' }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-full flex flex-col">
        <Navbar />

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 pb-24 sm:pb-16">
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white text-center leading-[1.05] sm:leading-tight drop-shadow-lg text-balance">
              Craft Digital Experiences That Elevate Your Brand
            </h1>
            <p className="text-center text-white text-sm sm:text-base md:text-lg font-light leading-relaxed mt-5 sm:mt-8 max-w-2xl mx-auto drop-shadow-lg px-2 sm:px-0">
              Award-winning designer transforming visions into compelling digital solutions with meticulous attention to detail and creative excellence.
            </p>

            {/* Get Started CTA */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 bg-white text-gray-900 rounded-sm font-medium text-xs tracking-[0.25em] hover:bg-white/90 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => setCurrentPage('pricing')}
          className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex items-center gap-2 text-white text-[10px] sm:text-xs font-medium drop-shadow-lg hover:opacity-70 transition-opacity cursor-pointer group"
        >
          <ChevronDown size={16} className="animate-bounce group-hover:translate-y-1 transition-transform" />
          <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
          <span className="sm:hidden">EXPLORE</span>
        </button>

        {/* Decorative dot */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 border-2 border-white rounded-full flex items-center justify-center">
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
