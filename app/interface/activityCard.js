import React from 'react'

export default function ActivityCard({childData}){
  return (
    <section className='p-6'>
      <h1 className='text-xl mb-4'>Activities</h1>
      <div className='grid grid-cols-2 gap-4'>
        {childData && childData.map((child, index) => (
        <div key={index} className='card w-40 shadow-xl border-2 border-[#FFDEB4]'>
          <div className='card-body'>
            <h2 className='text-md font-bold'>{child.childName}</h2>
            <p>{child.activity}</p>
            <div className='card-actions justify-end'>
              <input type='checkbox' className='toggle toggle-sm hover:bg-blue-200' defaultChecked/>
            </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  )
}
