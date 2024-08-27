import React from 'react'
const ThemeContext = React.createContext({
  lightTheme: true,
  updateTheme: () => {},
})
export default ThemeContext
