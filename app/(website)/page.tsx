import Image from 'next/image'
import React from 'react'
import image from '@/app/asset/front-page.jpeg'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { auth } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const { userId } = auth()
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <section className='relative w-full border lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-opacity-60 bg-black lg:relative lg:bg-transparent lg:p-0'>
        <div className='mx-auto grid w-[350px] gap-6 text-white lg:text-gray-700'>
          <h1 className='text-3xl font-extrabold sm:text-xl'>Parent-Child Activity Tracker</h1>
          <p className='my-2 text-xl sm:text-md text-balance'>
            Enhance family bonding by planning and tracking activities together. 
            Sign up now to start creating memorable moments with your loved ones.
          </p>
          <div className='grid gap-2 text-center'>
            <Button className='bg-[#89CFF0] text-white font-bold text-lg'>
              <Link href={'/sign-in'}>
                Log In
              </Link>
            </Button>
            <Button className='bg-[#FFD700] text-white font-bold text-lg'>
              <Link href={'/sign-up'}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:block">
        <Image 
          src={image}
          width={450}
          height={350}
          alt='illustration'
          loading='lazy'
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default HomePage
