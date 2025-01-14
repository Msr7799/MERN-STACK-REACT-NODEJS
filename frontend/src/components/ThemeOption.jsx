// src/components/ThemeOption.jsx
import React from "react";

const ThemeOption = ({ theme }) => {
  const setTheme = () => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div onClick={setTheme} className="theme-option" id={`theme-${theme}`}></div>
  );
};

export default ThemeOption;