import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={dark ? "theme-root dark" : "theme-root"}>{children}</div>
    </ThemeContext.Provider>
  );
};
