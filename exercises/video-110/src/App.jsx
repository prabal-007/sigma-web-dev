import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showBtn, setshowBtn] = useState(false)
  const [todos, settodos] = useState([
    {
      id: 1,
      title: 'task-1',
      desc: "Do task one here"
    },
    {
      id: 2,
      title: 'task-2',
      desc: 'Now do task 2'
    },
    {
      id: 3,
      title: 'task-3',
      desc: 'Should we do task three'
    },
  ])


  // const Todo = ({todo}) => {
  //   return (<>
  //   <div className='border border-cyan-700 p-3 m-4'>
  //   <div className='todo'>{todo.title}</div>
  //   <div className='todo'>{todo.desc}</div>
  //   </div>
  //   {/* <div className='todo'>title</div>
  //   <div className='todo'>desc</div> */}
  //   </>)}

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <Todo/> */}
      {todos.map(todo => {
        // return <Todo key={todo.id} todo={todo}/>
        return <div key={todo.id} className='border border-cyan-700 p-3 m-4'>
          <div className='todo'>{todo.title}</div>
          <div className='todo'>{todo.desc}</div>
          </div>
      })}
      {/* {showBtn ? <button>Show btn is True</button> : <button>Show btn is False</button>}  */}
      {showBtn && <button>Hi there</button>}
      <div className="card">
        <button onClick={() => setshowBtn(!showBtn)}>
          {!showBtn ? 'Show Button' : 'Hide Button'}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
