import Image from 'next/image'
import React from 'react'
import avatar from '@/public/asset/totoro025.jpg'
export default function AvatarChild(){
  return (
    <section className='p-6'>
      <h1 className='text-xl'>Your Children</h1>
      <div className='flex gap-4 scroll-y-auto'>
      <div className='avatar mt-4 flex flex-col placeholder'>
          <div className='w-20 bg-[#FFB4B4] rounded-full'>
            <span className='text-xl'>+</span>
          </div>
          <p className='mt-2 text-sm'>Add Profile</p>
        </div>

        <div className='avatar mt-4 flex flex-col'>
          <div className='w-20 rounded-full'>
            <Image 
              src={avatar}
              width={20}
              height={20}
              alt="Child's avatar"
            />
          </div>
          <p className='mt-2 text-sm'>Anisa Leyana</p>
        </div>

        <div className='avatar mt-4 flex flex-col'>
          <div className='w-20 rounded-full'>
            <Image 
              src={avatar}
              width={20}
              height={20}
              alt="Child's avatar"
            />
          </div>
          <p className='mt-2 text-sm'>Aniq Elhan</p>
        </div>

      </div>
    </section>
  )
}

