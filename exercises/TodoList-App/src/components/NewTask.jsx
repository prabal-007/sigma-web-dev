import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Timer from './Timer';


const NewTask = () => {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [showFinished, setShowFinished] = useState(true)
    const [priority, setPriority] = useState('Low')
    const [dueDate, setdueDate] = useState(null)
    const [sortBy, setsortBy] = useState('')
    const [tag, setTag] = useState('other')
    const [description, setDescription] = useState('')
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurrenceInterval, setRecurrenceInterval] = useState('')
    const [showAddtodo, setShowAddtodo] = useState(false)

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
        setDescription(e.target.value)
    }

    const handleTextarea = (e) => {
        // setDescription(`${e.target.value} - `)
        setDescription(e.target.value)
    }

    const handleAdd = () => {
        if (todo.length !== 0) {
            setTodos([...todos, { id: uuidv4(), todo, isComplted: false, priority, dueDate, tag, recurrenceInterval, description }])
            setTodo('')
            // console.log()
        } else {
            alert('Nothing to add')
        }
        setShowAddtodo(false)
        setDescription('')
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

    const handlePriority = (e) => {
        let pname = e.target.name
        setPriority(pname)
    }

    const handleSort = (e) => {
        setsortBy(e.target.value)
        // console.log(todos)
    }

    const handleTag = (e) => {
        let tag = e.target.value
        setTag(tag)
        let des = description + '\n\nTask belong to ' + tag + ' category and should be done by ' + dueDate
        setDescription(des)
    }

    const getSorterOrder = () => {
        if (sortBy === '') return todos
        else if (sortBy === 'priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 }
            return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
        } else if (sortBy === 'categories') {
            const priorityOrder = { 'Office': 4, 'personal': 3, 'shopping': 2, 'other': 1, '': 0 }
            return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
        } else {
            console.log('new sort')
            return [...todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        }
    }

    const checkOverDuetask = () => {
        setTodos((prevtask) =>
            prevtask.map((task) => (
                { ...task, isOverDue: new Date(task.dueDate) < new Date() }
            ))
        )
    }

    const onChangeValue = (e) => {
        console.log(e.target.value)
        setRecurrenceInterval(e.target.value)
    }

    const getNextduedate = (currentDueDate, recurrenceInterval) => {
        const nextDueDate = new Date(currentDueDate)

        switch (recurrenceInterval) {
            case 'daily':
                nextDueDate.setDate(nextDueDate.getDate() + 1)
                break;
            case 'weekly':
                nextDueDate.setDate(nextDueDate.getDate() + 7)
                break;
            case 'monthly':
                nextDueDate.setDate(nextDueDate.getMonth() + 1)
                break;
            default:
                alert('Invalid recurrence interval!')
        }
        return nextDueDate
    }

    const checkAndUpdaterecurringTask = (todos) => {
        const updatedTodos = todos.map(todo => {
            if (todo.isRecurring && new Date(todo.dueDate) < new Date()) {
                return {
                    ...todo, dueDate: getNextduedate(todo.dueDate, todo.recurrenceInterval), showFinished: false,
                };
            }
            console.log(todo)
            return todo
        })
        setTodos(updatedTodos)
    }

    const isAddTodo = () => {
        setShowAddtodo(!showAddtodo)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkAndUpdaterecurringTask(todos)
        }, 60000)
        return () => {
            clearInterval(interval)
        }
    }, [todos])

    useEffect(() => {
        const interval = setInterval(checkOverDuetask, 6000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const sortedtodos = getSorterOrder()

    useEffect(() => {
    }, [priority, dueDate]);

    return (
        <div className="container mx-auto p-6">
            <div className='p-4 border rounded-lg min-h-[80vh] flex flex-col md:flex-row md:justify-evenly items-center gap-6 bg-violet-800 dark:bg-gray-900'>
                <button onClick={isAddTodo} className={`md:hidden bg-gray-200 dark:bg-violet-600 dark:text-white font-bold font-mono py-1 px-2 rounded-xl ${showAddtodo && 'hidden'}`}>{!showAddtodo && 'Add New Task'}</button>

                <div className={`addTodo md:flex flex-col items-center w-full md:w-[36%] border rounded-lg py-3 md:px-2 bg-violet-300 dark:bg-slate-400 ${!showAddtodo ? 'hidden' : 'flex'}`}>
                    <div className='flex justify-between px-2 w-full items-center'>
                        <h2 className='font-bold text-lg mx-2'>Add New Task</h2>
                        <button onClick={isAddTodo} className={`md:hidden bg-gray-200 dark:bg-violet-600 dark:text-white font-bold font-mono py-1 px-2 rounded-xl`}>{showAddtodo && 'X'}</button>
                    </div>
                    {/* <div className='w-full flex justify-center'> */}

                    <div className='md:w-[90%] w-[85%] ml-[85%] md:ml-0 hidden md:flex md:flex-row p-1'>
                        <input type="text" placeholder='my new task' className='w-[75%] m-1 p-2 dark:bg-gray-200' onChange={handleChange} value={todo} />
                        {/* <input type="textbox" className='md:w-[80%] h-28'/> */}
                        <button onClick={handleAdd} className={`bg-violet-500 font-bold text-white p-1 px-6 m-1 rounded-lg hover:text-gray-100 ${todo.length === 0 ? 'bg-violet-500' : 'bg-violet-800 hover:bg-violet-700'}`}>Add</button>
                    </div>

                    {/* </div> */}

                    <div className='flex flex-col md:flex-row justify-center items-center w-2/3 md:w-[90%]'>
                        <input type="text" className='w-full m-1 p-2 block md:hidden' onChange={handleChange} value={todo} />
                        <div className='flex w-full flex-col md:flex-row'>
                            <div className="priority w-fit flex flex-row md:flex-col gap-2 md:gap-1 md:border border-violet-500 p-2 font-mono font-medium">
                                <h2 className='bg-violet-200 p-1 text-sm hidden'>Priority</h2>
                                <button onClick={handlePriority} name='Low' className='flex w-fit items-center text-xs border border-green-400 dark:bg-green-400 rounded-lg py-[2px] px-1'><FcLowPriority />Low</button>
                                <button onClick={handlePriority} name='Medium' className='flex w-fit items-center text-xs border border-yellow-400 rounded-lg py-[2px] px-1 dark:bg-yellow-300'><FcMediumPriority />Medium</button>
                                <button onClick={handlePriority} name='High' className='flex w-fit items-center text-xs border border-red-400 rounded-lg py-[2px] px-1 dark:bg-red-500'><FcHighPriority />High</button>
                            </div>
                            {/* <input type="text" className='h-8 m-1 p-2' onChange={handleChange} value={todo} /> */}
                            <div className='p-2 md:ml-3 w-fit'>
                                <DatePicker
                                    showIcon
                                    selected={dueDate}
                                    onChange={(date) => setdueDate(date)}
                                    minDate={new Date()}
                                    toggleCalendarOnIconClick
                                    showTimeSelect
                                    placeholderText='Select due date/time'
                                    isClearable
                                    closeOnScroll={true}
                                    timeFormat='HH:MM'
                                    timeIntervals={30}
                                />
                            </div>
                            <div className='p-2'>
                                <select onChange={handleTag} name="" id="">
                                    <option value="">Add tag</option>
                                    <option value="office" className='bg-red-200'>Office</option>
                                    <option value="personal" className='bg-yellow-200'>Personal</option>
                                    <option value="shopping" className='bg-green-300'>Shopping</option>
                                    <option value="other" className='bg-orange-300'>Other</option>
                                </select>
                            </div>
                        </div>


                        <div className='date-class absolute my-1 left-[60%] mt-[32%] md:mt-2 md:left-[24%] flex flex-col w-full mb-10'>
                            {/* <div className='w-[22%] md:w-[8%] md:fixed ml-[-8%] mt-[-20px] md:mt-4'> */}
                                <span className='w-[30%] md:w-[8%] md:fixed ml-[-8%] mt-[-20px] md:mt-4'><input type="checkbox" className='' onChange={() => setIsRecurring(!isRecurring)} />
                                <label htmlFor=""> Recurring</label></span>
                            {/* </div> */}
                            <div className={`${!isRecurring ? 'hidden' : 'block'} flex flex-row fixed ml-[-25%] md:-ml-6 mt-2 md:mt-[18px] gap-3 border border-gray-200 w-fit md:fixed px-2`} onChange={onChangeValue}>
                                <label htmlFor=""><input type="radio" name="recurring" value="daily" /> Daily</label>
                                <label htmlFor=""><input type="radio" name="recurring" value="weekly" /> Weekly</label>
                                <label htmlFor=""><input type="radio" name="recurring" value="monthly" /> Monthly</label>
                            </div>
                        </div>

                        <button onClick={handleAdd} className={`block md:hidden bg-violet-500 font-bold text-white p-1 px-6 m-1 rounded-lg mt-10 md:mt-0 hover:text-gray-100 ${todo.length === 0 ? 'bg-violet-500' : 'bg-violet-800 hover:bg-violet-700'}`}>Add</button>
                    </div>
                    {/* <input type="textbox" placeholder='Your task description...' className='md:w-[75%] h-28 ml-32 mt-[-12%]'/> */}
                    <textarea name="" id="" onChange={handleTextarea} value={description} className='w-[90%] md:w-[70%] h-24 ml-24 md:mt-[-2%] mt-2 mr-[28%] md:mr-0 dark:bg-gray-200' placeholder='  Your task description...'></textarea>
                </div>

                <div className='flex flex-col items-center md:w-1/2 min-h-[10%] py-6 border border-violet-500 rounded-xl bg-violet-300 dark:bg-slate-400 max-h-[60vh] overflow-auto'>
                    <h2 className='font-bold text-lg block md:hidden mb-1'>Your Todos</h2>
                    <div className='flex justify-between w-full md:w-2/3 p-4'>
                        <h2 className='font-bold text-lg hidden md:block'>Your Todos</h2>
                        <span><input type="checkbox" onChange={togglefinished} checked={showFinished} /> Show completed Tasks</span>
                        <select onChange={handleSort} name="" id="">
                            <option value="">Sort By</option>
                            <option value="priority">Priority</option>
                            <option value="dueDate">Due Date</option>
                            <option value="categories">Categories</option>
                        </select>
                    </div>

                    {todos.length === 0 && <div>Your todo list is empty!</div>}

                    {sortedtodos.map(item => {
                        return (showFinished || !item.isComplted) && <div key={item.id} className="todos w-full md:w-2/3">

                            <div className={`todo flex justify-between border-2 ${item.isOverDue && !item.isComplted ? 'border-red-600 bg-red-200' : 'border-gray-200 bg-violet-100'}  rounded-md p-2 m-2 max-h-16 overflow-hidden`}>
                                <div className='flex gap-2'>
                                    <input className='border rounded-xl' type="checkbox" name={item.id} onChange={handleCheckBox} checked={item.isComplted} />
                                    <h2 className={item.isComplted ? 'max-w-lg line-through' : ''}>{item.todo}</h2>
                                </div>

                                <div className='w-18 flex gap-1'>

                                    {item.tag && <span className='hidden md:block border border-gray-500 bg-gray-400 p-1 rounded-xl'>{item.tag}</span>}
                                    {item.priority === 'Low' && <FcLowPriority /> || item.priority === 'High' && <FcHighPriority /> || item.priority === 'Medium' && <FcMediumPriority />}


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

    )
}

export default NewTask
