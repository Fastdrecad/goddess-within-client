import { createContext, useState } from "react";

export const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <MenuContext.Provider value={{ menuOpen, toggle }}>
      {children}
    </MenuContext.Provider>
  );
};
