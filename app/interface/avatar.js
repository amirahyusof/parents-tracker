import Image from 'next/image'
import React from 'react'
import avatar from '@/public/asset/totoro025.jpg'
import Link from 'next/link'


export default function AvatarChild({childData, user}){
  return (
    <section className='p-6'>
      <h1 className='text-xl'>Your Children</h1>
      <div className='flex gap-4 overflow-x-auto'>
        <div className='avatar mt-4 flex flex-col placeholder'>
          <Link href='/profile'>
            <div className='w-20 bg-[#FFB4B4] rounded-full'>
              <span className='text-xl'>+</span>
            </div>
            <p className='mt-2 text-sm'>
              Add Profile
            </p>
          </Link>
        </div>

        {childData && (
          <div className='avatar snap-x snap-proximity mt-4 flex flex-col'>
            <div className='w-20 rounded-full snap-center'>
            {childData.imageUrl ? ( // Check if imageUrl exists
                <Image
                  src={childData.imageUrl} // Use the stored imageUrl
                  width={20}
                  height={20}
                  alt="Child's avatar"
                />
              ) : (
                <Image
                  src={avatar} // Default avatar if no imageUrl
                  width={20}
                  height={20}
                  alt="Child's avatar"
                />
              )}
              <p className='mt-2 text-sm'>{childData.childName}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

