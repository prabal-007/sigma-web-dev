import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {
  const [cards, setCards] = useState([])

  const fetchData = async () => {
    let a = await fetch('https://jsonplaceholder.typicode.com/posts')
    let data = await a.json()
    setCards(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Navbar />
      <>
        <div className='main flex flex-wrap pl-4 my-4 gap-4 justify-center'>
      {cards.map(card => {
        return <div key={card.id} className='border w-80 justify-center items-center m-1 p-3 bg-slate-500'>
          <h1 className='font-bold  border p-1'>{card.title}</h1>
          <p>{card.body}</p>
          <span>By {card.userId}</span>
        </div>
      })}
      </div>
      </>
    </>
  )
}

export default App
