"use client"

import { Menu, Bell, LogOut} from 'lucide-react'
import Link from 'next/link'
import React, {useState} from 'react'
import { useAuth } from '../firebase/hook';
import { useRouter } from 'next/navigation';

export default function NavBar(){
  const [error, setError] = useState('');
  const { logout}  = useAuth();
  const router = useRouter();

  const handleLogOut = async(e) => {
    e.preventDefault();
    setError('');

    try {
      await logout;
      router.push('/login');
    } catch(error){
      setError("Failed to log in. Please check your credentials.");
      console.log(error);
    }
  };
  return (
    <header className='navbar bg-[#FFF9CA] sticky top-0 z-10 flex border-b border-[#B2A4FF] shadow-lg'>
      <div className='navbar-start'>
        <div className='dropdown mt-4'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg"
          >
            <li>
              <Link href="/mainpage">Home</Link>
            </li>
            <li>
              <Link href="/mainpage/profile">Child's Profile</Link>
            </li>
            <li>
              <Link href="/mainpage/setting">Setting</Link>
            </li>
            <button onClick={handleLogOut} className='btn btn-ghost text-md left-0 hover:bg-grey-400'>
             <LogOut className='h-4 w-4' /> Sign Out
            </button>
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <Link href="/mainpage" className='btn btn-ghost text-xl'>My Family</Link>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-ghost btn-circle'> 
          <Bell />
        </button>
      </div>
    </header>
  )
}
