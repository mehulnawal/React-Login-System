import { createContext, useState } from "react";

// Theme Context 
export const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};