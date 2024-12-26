import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
  
export default function ListChildAvatar({childData}) {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  // Debug logging
  console.log('Child Data:', childData);

  useEffect(() => {
    console.log('Child Data in AvatarChild:', childData);
  }, [childData])

  return (
    <section className='p-2 w-full'>
      <div className='flex gap-2 overflow-x-auto'>
        {/* Render Child Avatars */}
        {childData && childData.length > 0 && childData.map((child) => (
          <div key={child.id} className='avatar flex flex-col cursor-pointer '>
            <div className='avatar w-20 h-20 space-x-2 rounded-full border-2 overflow-hidden'>
              <Link href={`/mainpage/profile/parent/child?userId=${userId}&childId=${child.id}`}>
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
    </section>
  )
}