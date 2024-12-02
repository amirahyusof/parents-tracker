import { Menu, Bell, } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function UpBar(){
  return (
    <header className='navbar sticky top-0 z-10 flex border-b border-[#FFB4B4] shadow-lg'>
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
              <Link href="/component/mainpage">Home</Link>
              
            </li>
            <li>
              <Link href="/component/activity">Activity</Link>
            </li>
            <li>
              <Link href="/component/setting">Setting</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <Link href="/component/mainpage" className='btn btn-ghost text-xl'>My Family</Link>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'> 
          <Bell />
        </button>
      </div>
    </header>
  )
}
