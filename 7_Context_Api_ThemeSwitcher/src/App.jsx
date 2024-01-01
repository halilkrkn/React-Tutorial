import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import ToggleThemeButton from './components/ToggleThemeButton'
import { ThemeProvider } from './context/Theme'

function App() {
  const [themeMode, setThemeMode] = useState("light")


  const darkTheme = () => {
    setThemeMode('dark')
  }

  const lightTheme = () => {
    setThemeMode('light')
  }


  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light")
    document.querySelector("html").classList.add(themeMode)
  }, [themeMode])
  


  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
     <h1 className='text-center bg-teal-300 text-2xl'>Theme Switcher with Context API</h1>
     <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  <ToggleThemeButton />
              </div>

              <div className="w-full max-w-sm mx-auto">
                  <Card />
              </div>
          </div>
      </div>
    </ThemeProvider>
  )
}

export default App
