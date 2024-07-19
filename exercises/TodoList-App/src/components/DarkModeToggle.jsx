import React from 'react'
import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    // const [darkMode, setDarkMode] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        console.log(darkMode)
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        console.log(darkMode)
      }
    }, [darkMode]);
    
  return (
    <button onClick={() => setDarkMode(!darkMode)} className='dark:bg-white rounded-lg bg-gray-900' title={darkMode ? 'Switch to LightMode' : 'Switch to DarkMode'}>
        {darkMode ? '☀️' : '🌙'}
    </button>
  )
}

export default DarkModeToggle
