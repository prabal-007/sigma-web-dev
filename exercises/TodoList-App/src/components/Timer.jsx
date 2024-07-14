import React from 'react'
import { useState, useEffect } from 'react'

const Timer = () => {
    const [dateTime, setdateTime] = useState(new Date())
    useEffect(() => {
      const intervalId = setInterval(() => {
        setdateTime(new Date())
      }, 1000);

      return () => clearInterval(intervalId)
    }, [])
    
  return (
    <div className='flex justify-center font-mono'>
      {dateTime.toLocaleString()}
    </div>
  )
}

export default Timer
