import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])

  const savetoLs = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = (params) => {
    if (todo.length !== 0) {
      setTodos([...todos, { id: uuidv4(), todo, isComplted: false }])
      setTodo('')
    } else {
      alert('Nothing to add')
    }
    savetoLs()
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isComplted = !newTodos[index].isComplted
    setTodos(newTodos)
    savetoLs()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLs()
  }

  const handleDel = (e, id) => {
    if (confirm(`Do you really want to delete this task?`)) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      })
      setTodos(newTodos)
      savetoLs()
    }
  }

  const togglefinished = (e) => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6">
        <div className='bg-violet-100 p-4 border rounded-lg min-h-[80vh] flex flex-col items-center gap-6 bg-violet-800'>
          <div className="addTodo flex flex-col items-center w-[100%] md:w-1/2 border rounded-lg py-3 bg-violet-300">
            <h2 className='font-bold text-lg'>Add a Todo</h2>
            <div className='flex flex-col justify-center items-center w-2/3'>
              <input type="text" className='w-full m-1 p-2' onChange={handleChange} value={todo} />
              <button id='addBtn' onClick={handleAdd} className= {`bg-violet-500 font-bold text-white p-1 px-6 m-1 rounded-lg hover:text-gray-100 ${todo.length === 0 ? 'bg-violet-500' : 'bg-violet-800 hover:bg-violet-700'}`}>Add</button>
            </div>
          </div>

          <div className='flex flex-col items-center w-[100%] md:w-1/2 min-h-[10%] py-2 border border-violet-500 rounded-xl bg-violet-300 max-h-[60vh] overflow-auto'>
            <div className='flex justify-between w-2/3'>
            <h2 className='font-bold text-lg'>Your Todos</h2>
              <span><input type="checkbox" onChange={togglefinished} checked={showFinished} /> Show completed Tasks</span>
            </div>

            {todos.length === 0 && <div>Your todo list is empty!</div>}
            {todos.map(item => {
              return (showFinished || !item.isComplted) && <div key={item.id} className="todos w-2/3">
                <div className="todo flex justify-between border-2 border-gray-200 rounded-md bg-violet-100 p-2 m-2 max-h-16 overflow-hidden">
                  <div className='flex gap-2'>
                    <input className='border rounded-xl' type="checkbox" name={item.id} onChange={handleCheckBox} checked={item.isComplted} />
                    <h2 className={item.isComplted ? 'max-w-lg line-through' : ''}>{item.todo}</h2>
                  </div>

                  <div className='w-18 flex gap-1'>
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='border px-2 bg-violet-900 text-white font-xl rounded-md'><FaEdit />
                    </button>
                    <button onClick={(e) => { handleDel(e, item.id) }} className='border px-2 bg-violet-900 text-white font-xl rounded-md'><MdDelete /></button>
                  </div>

                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
