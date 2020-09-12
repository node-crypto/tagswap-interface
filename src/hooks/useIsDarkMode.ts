import { useContext } from 'react';

import { DarkModeContext } from 'contexts/DarkMode';

const useIsDarkMode = () => {
    const { darkMode, handleToggle } = useContext(DarkModeContext);
    return { darkMode, handleToggle };
};

export default useIsDarkMode;
