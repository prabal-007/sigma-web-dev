import { useState } from 'react'
import './App.css'

function App() {

  const [name, setName] = useState('stark')
  const [form, setForm] = useState({ email: "abc@example.com", phone: "98898989" })

  const handleClick = () => {
    alert('Mouse is clicked')
  }

  const handleMouseOver = () => {
    {
      main.style.backgroundColor = 'black'
      hc.style.color = 'white'
    }
  }

  const handleMouseLeave = () => {
    {
      main.style.backgroundColor = 'aqua'
      hc.style.color = 'black'
    }
  }

  const handleChange = (e) => {
    setName(e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <div id='main' className='main' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <h1 id='hc'>I am hover</h1>
      </div>
      <div className='f-main'>
        <div className='f2'>
          <label htmlFor="">Name</label>
          <input type="text" value={name} onChange={handleChange} />
        </div>
        <div className='f2'>
          <label htmlFor="">Email</label>
          <input type="text" name='email' value={form.email} onChange={handleChange} />
        </div>
        <div className='f2'>
          <label htmlFor="">Phone</label>
          <input type="text" name='phone' value={form.phone} onChange={handleChange} />
        </div>
      </div>

    </>
  )
}

export default App
