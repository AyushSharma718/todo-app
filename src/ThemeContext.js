import React, { createContext, useState, useEffect } from "react";

// Step 1: Create context object
export const ThemeContext = createContext();

// Step 2: Create provider component
export function ThemeProvider({ children }) {
  // Step 3: Set up state using localStorage as initial value
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Step 4: Save to localStorage and change body background on toggle
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
  }, [darkMode]);

  // Step 5: Provide darkMode and setDarkMode to the app
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
