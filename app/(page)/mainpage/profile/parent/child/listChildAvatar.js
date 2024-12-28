import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
  
export default function ListChildAvatar({childData}) {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  return (
    <section className='p-2 w-full'>
      <div className='flex gap-2 overflow-x-auto'>
        {(!childData || childData.length === 0) ? (
          <div className="text-left text-black rounded-lg">
            <p>Please add child profile at Home</p>

          </div>
        ):(
          <div>
            {childData.map((child) => (
            <div key={child.id} className='avatar flex flex-col cursor-pointer '>
              <div className='avatar w-20 h-20 space-x-2 rounded-full border-2 overflow-hidden'>
                <Link href={`/mainpage/profile/parent/child/edit?userId=${userId}&childId=${child.id}`}>
                  <Image
                    src={child.imageUrl}
                    width={100}
                    height={100}
                    alt={child.avatarAlt || "Child's avatar"}
                    className='w-full h-full object-cover'
                  />
                </Link>
              </div>
              <p className='text-sm text-center mt-2 text-gray-400'>{child.name}</p>
            </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}