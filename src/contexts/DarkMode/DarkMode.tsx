import React, { useState } from 'react';

export interface IDarkMode {
    darkMode: boolean;
    handleToggle: () => void;
}

export const DarkModeContext = React.createContext<IDarkMode>({
    darkMode: true,
    handleToggle: () => {},
});

const DarkModeProvider: React.FC = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const handleToggle = () => {
        setDarkMode((darkMode: boolean) => !darkMode);
    };
    return (
        <DarkModeContext.Provider
            value={{
                darkMode,
                handleToggle,
            }}
        >
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
