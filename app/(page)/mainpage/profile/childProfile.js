"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/firebase/hook";
import Link from 'next/link';
import Image from 'next/image';
import GirlKid from '@/public/asset/avatar/kidgirl.png';
import BoyKid from '@/public/asset/avatar/kidboy.png';
import GirlTeenager from '@/public/asset/avatar/teenagergirl.png'
import BoyTeenager from '@/public/asset/avatar/teenagerboy.png'
import BabyGirl from '@/public/asset/avatar/babygirl.png'
import BabyBoy from '@/public/asset/avatar/babyboy.png'

export default function ChildProfile({ userData }) {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [childData, setChildData] = useState({
    name: "", 
    age: "", 
    avatar: null
  });
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addChild } = useAuth();
  const router = useRouter();
  // Avatar options
  const avatarOptions = [
    { id: 'girl-kid', src: GirlKid, alt: 'Girl Kid' },
    { id: 'boy-kid', src: BoyKid, alt: 'Boy Kid' },
    { id: 'girl-teen', src: GirlTeenager, alt: 'Girl Teenager' },
    { id: 'boy-teen', src: BoyTeenager, alt: 'Boy Teenager' },
    { id: 'baby-girl', src: BabyGirl, alt: 'Baby Girl' },
    { id: 'baby-boy', src: BabyBoy, alt: 'Baby Boy' }
  ];

  // Debug logging
  useEffect(() => {
    console.log('User Data received:', userData);
  }, [userData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddChildProfile = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate inputs
    if (!childData) {
      setError('Please fill out all required fields and select an avatar');
      return;
    }

    try {
      await addChild(userData.uid, {
        ...childData, 
        imageUrl: selectedAvatar.src,
        avatarAlt: selectedAvatar.alt, 
        createdAt: new Date(),
        userId
      });

      console.log(childData);
      alert('Successfully Create Child Profile!');
      router.push('/mainpage');
    } catch (err) {
      console.error('Full error:', err);
      setError('Failed to create child profile: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  return (
    <section>
      <div className="hero-content flex-col lg:flex-row-reserve mt-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Add Child Profile</h1>
        </div>

        <div className="card mt-4 bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleAddChildProfile} className="card-body">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Name</span>
              </label>
              <input 
                type="text"
                placeholder="Name"
                value={childData.name}
                onChange={(e) => setChildData({...childData, name:e.target.value})}
                className="input input-bordered input-md bg-white w-full max-w-xs"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input 
                type="number"
                placeholder="Age"
                value={childData.age}
                onChange={(e) => setChildData({...childData, age:e.target.value})}
                className="input input-bordered input-md bg-white w-full max-w-xs"
                required
                min="0"
                max="18"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Avatar</span>
              </label>
              <div className='grid grid-cols-3 gap-2'>
                {avatarOptions.map((avatar) => (
                  <div  
                    key={avatar.id}
                    className={`cursor-pointer p-2 border-4 rounded-lg transition-all duration-300 ${
                      selectedAvatar?.id === avatar.id 
                        ? 'border-blue-500 bg-blue-100' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setChildData({...childData, avatar})}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      width={150}
                      height={150}
                      className='mx-auto'
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-control mt-6 space-y-2">
              <button 
                type="submit" 
                className={`
                  btn btn-md border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black
                  ${isSubmitting ? 'loading': ''}
                  `}
                disabled = {isSubmitting}
              >
                { isSubmitting ? 'Adding...' : 'Add Child'}
              </button>

              <Link href="/mainpage" className="w-full">
                <button type="button" className='btn btn-md btn-neutral w-full'>
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}