import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
  
export default function AvatarChild({childData, user}) {
  // Debug logging
  console.log('Child Data:', childData);

  useEffect(() => {
    console.log('Child Data in AvatarChild:', childData);
  }, [childData])

  return (
    <section className='p-6 h-screen'>
      <h1 className='text-xl'>Your Children</h1>
      <div className='flex gap-4 overflow-x-auto'>
        {/* Add Profile Button */}
        <div className='avatar mt-4 flex flex-col placeholder'>
          <Link href='/mainpage/profile'>
            <div className='w-20 h-20 bg-[#FFB4B4] rounded-full flex items-center justify-center'>
              <span className='text-xl text-white'>+</span>
            </div>
            <p className='mt-2 text-sm text-center'>
              Add Profile
            </p>
          </Link>
        </div>

        {/* Render Child Avatars */}
        {childData && childData.length > 0 && childData.map((child, index) => (
          <div key={index} className='avatar mt-4 flex flex-col cursor-pointer'>
            <div className='w-20 h-20 rounded-full overflow-hidden'>
              <Link href={`/mainpage/activity?childId=${child.id}`}>
                <Image
                  src={child.imageUrl}
                  width={100}
                  height={100}
                  alt={child.avatarAlt || "Child's avatar"}
                  className='w-full h-full object-cover'
                />
              </Link>
            </div>
            <p className='mt-2 text-sm text-center'>{child.childName}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

