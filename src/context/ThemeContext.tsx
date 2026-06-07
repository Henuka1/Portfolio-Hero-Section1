import React, { createContext, useContext, useState } from 'react';

type Page = 'home' | 'contact' | 'pricing';

interface ThemeContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isNight: boolean;
  setIsNight: (night: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isNight, setIsNight] = useState(true);

  return (
    <ThemeContext.Provider value={{ currentPage, setCurrentPage, isNight, setIsNight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
