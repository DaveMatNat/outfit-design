import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available themes
const themes = {
  light: {
    name: 'Light',
    colors: {
      background: 'hsl(0 0% 95%)',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      primary: '#00b894',
      primaryHover: '#019875',
      buttonBg: '#2d3436',
      buttonHover: '#636e72',
      accent: '#646cff',
      accentHover: '#535bf2',
    },
    shadows: {
      dropShadow: 'drop-shadow(0 0 2rem rgba(255, 255, 255, 0))',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      boxShadowHover: '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
    fonts: {
      primary: '"Bodoni Moda", serif',
      secondary: '"Courier New Bold", monospace',
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#b8b8b8',
      primary: '#00b894',
      primaryHover: '#019875',
      buttonBg: '#c8c8c8ff',
      buttonHover: '#5a5a5a',
      accent: '#646cff',
      accentHover: '#535bf2',
    },
    shadows: {
      dropShadow: 'drop-shadow(0 0 1.5rem rgba(255, 255, 255, 0.5))',
      boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
      boxShadowHover: '0 6px 20px rgba(255, 255, 255, 0.15)',
    },
    fonts: {
      primary: '"Bodoni Moda", serif',
      secondary: '"Inter", sans-serif',
    }
  },
  elegant: {
    name: 'Elegant',
    colors: {
      background: '#f8f6f0',
      surface: '#ffffff',
      text: '#2c2c2c',
      textSecondary: '#666666',
      primary: '#d4af37',
      primaryHover: '#b8941f',
      buttonBg: '#8b4513',
      buttonHover: '#a0522d',
      accent: '#8b4513',
      accentHover: '#a0522d',
    },
    shadows: {
      dropShadow: 'drop-shadow(8px 8px 12px rgba(139, 69, 19, 0.3))',
      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)',
      boxShadowHover: '0 6px 20px rgba(139, 69, 19, 0.25)',
    },
    fonts: {
      primary: '"Playfair Display", serif',
      secondary: '"Source Sans Pro", sans-serif',
    }
  },
  modern: {
    name: 'Modern',
    colors: {
      background: '#f5f7fa',
      surface: '#ffffff',
      text: '#2d3748',
      textSecondary: '#718096',
      primary: '#667eea',
      primaryHover: '#5a67d8',
      buttonBg: '#4a5568',
      buttonHover: '#2d3748',
      accent: '#ed64a6',
      accentHover: '#d53f8c',
    },
    shadows: {
      dropShadow: 'drop-shadow(10px 10px 15px rgba(102, 126, 234, 0.25))',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
      boxShadowHover: '0 6px 20px rgba(102, 126, 234, 0.2)',
    },
    fonts: {
      primary: '"Poppins", sans-serif',
      secondary: '"Inter", sans-serif',
    }
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('outfit-design-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('outfit-design-theme', currentTheme);
  }, [currentTheme]);

  // Apply CSS variables when theme changes
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply shadow variables
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
