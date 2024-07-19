import React from 'react'
import Timer from './Timer';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
    const handleAll = () => {
        if (confirm('This will delete all you saved tasks!')) {
            localStorage.clear();
        }
    }
    return (
        <nav className='flex justify-between md:justify-between mx-auto px-11 py-3 bg-violet-800 dark:bg-gray-900 text-white m-0'>
            <div>
                <ul className='flex mx-4 gap-5'>
                    <li className='hover:font-bold cursor-pointer'><button onClick={handleAll}>Clear all tasks</button></li>
                    <li className='hover:font-bold cursor-pointer'><a href="https://github.com/prabal-007/sigma-web-dev/tree/main/exercises/TodoList-App">Source Code</a></li>
                </ul>
            </div>
            <div className="icon font-bold text-3xl">
                <span>taskTracker</span>
            </div>
            <div className='flex gap-6 items-center'>
            <Timer />
            <DarkModeToggle />
            </div>
        </nav>
    )
}

export default Navbar
