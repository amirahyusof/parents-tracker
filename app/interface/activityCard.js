import React from 'react'

export default function ActivityCard(){
  return (
    <section className='p-6'>
      <h1 className='text-2xl mb-4'>Activities</h1>
      <div className='grid grid-cols-2 gap-4'>
        <div className='card w-40 shadow-xl border-2 border-[#FFDEB4]'>
          <div className='card-body'>
            <h2 className='text-md'>Anisa Leyana</h2>
            <p>Do homework</p>
            <div className='card-actions justify-end'>
              <input type='checkbox' className='toggle toggle-sm hover:bg-blue-200' defaultChecked/>
            </div>
          </div>
        </div>

        <div className='card w-40 shadow-xl border-2 border-[#FFDEB4]'>
          <div className='card-body'>
            <h2 className='text-md'>Aniq Elhan</h2>
            <p>Sleep</p>
            <div className='card-actions justify-end'>
              <input type='checkbox' className='toggle toggle-sm hover:bg-blue-200' defaultChecked/>
            </div>
          </div>
        </div>
      
      </div>

    </section>
  )
}
