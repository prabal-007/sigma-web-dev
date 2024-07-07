import React from 'react'

const Navbar = () => {
    const handleAll = () => {
        if (confirm('This will delete all you saved tasks!')) {
            localStorage.clear();
        }
    }
    return (
        <nav className='flex justify-between md:justify-evenly mx-auto px-11 py-3 bg-violet-800 text-white m-0'>
            <div className="icon font-bold text-xl">
                <span>taskTracker</span>
            </div>
            <div>
                <ul className='flex mx-4 gap-11'>
                    <li className='hover:font-bold cursor-pointer'><button onClick={handleAll}>Free memory</button></li>
                    <li className='hover:font-bold cursor-pointer'><a href="http://"></a>Source Code</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
