import { Menu, Bell, } from 'lucide-react'
import React from 'react'

export default function UpBar(){
  return (
    <header className='navbar sticky top-0 z-10 flex '>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <Menu />
          </div>
          <ul
            tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>Activity</a>
            </li>
            <li>
              <a href='#'>Calender</a>
            </li>
            <li>
              <a href='#'>Setting</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <a href='#' className='btn btn-ghost text-xl'>My Family</a>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'> 
          <Bell />
        </button>
      </div>
    </header>
  )
}
