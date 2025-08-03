import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
    const { currentTheme, themes, changeTheme } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleThemeSelect = (themeName) => {
        changeTheme(themeName);
        setIsExpanded(false);
    };

    return (
        <div className="theme-switcher">
            {/* Theme Selector */}
            <div className="theme-selector">
                <button
                    className="theme-selector-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    title="Choose theme"
                >
                    🎨 {themes[currentTheme].name}
                </button>

                {isExpanded && (
                    <div className="theme-dropdown">
                        {Object.entries(themes).map(([key, theme]) => (
                            <button
                                key={key}
                                className={`theme-option ${currentTheme === key ? 'active' : ''}`}
                                onClick={() => handleThemeSelect(key)}
                            >
                                <span className="theme-preview" style={{
                                    backgroundColor: theme.name === "Dark" ? theme.colors.background : theme.name === "Light" ? theme.colors.background : theme.colors.primary,
                                    fontFamily: theme.fonts.primary.split(',')[0].replace(/"/g, '')
                                }}></span>
                                {theme.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
