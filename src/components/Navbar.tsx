import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const { isNight, setIsNight } = useTheme();

  return (
    <nav className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-20">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 rounded border-2 border-white flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">DP</span>
        </div>
        <div className="text-white text-[10px] sm:text-xs font-medium leading-tight tracking-[0.2em] whitespace-nowrap">
          <div>DESIGN</div>
          <div>PORTFOLIO</div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-10 xl:gap-12">
        <a href="#" className="text-white text-sm font-medium hover:opacity-70 transition">WORK</a>
        <a href="#" className="text-white text-sm font-medium hover:opacity-70 transition">ABOUT</a>
        <a href="#" className="text-white text-sm font-medium hover:opacity-70 transition">CONTACT</a>
      </div>

      <button
        onClick={() => setIsNight(!isNight)}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/30 hover:border-white/60 transition-all duration-300 hover:bg-white/10 shrink-0"
        title={isNight ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      >
        {isNight
          ? <Sun size={18} className="text-white" />
          : <Moon size={18} className="text-gray-800" />
        }
      </button>
    </nav>
  );
}
