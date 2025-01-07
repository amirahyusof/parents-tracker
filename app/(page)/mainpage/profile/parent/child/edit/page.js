"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import GirlKid from '@/public/asset/avatar/kidgirl.png';
import BoyKid from '@/public/asset/avatar/kidboy.png';
import GirlTeenager from '@/public/asset/avatar/teenagergirl.png'
import BoyTeenager from '@/public/asset/avatar/teenagerboy.png'
import BabyGirl from '@/public/asset/avatar/babygirl.png'
import BabyBoy from '@/public/asset/avatar/babyboy.png'
import { routeDB } from '@/app/firebase/api/route';

export default function ChildProfile() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const childId = searchParams.get('childId')
  const [updatedChildData, setUpdatedChildData] = useState({
    name: "", 
    age: "", 
    selectedAvatar: null
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { getChildDataById, updateChildData } = routeDB();
 
  // Avatar options
  const avatarOptions = [
    { id: 'girl-kid', src: GirlKid, alt: 'Girl Kid' },
    { id: 'boy-kid', src: BoyKid, alt: 'Boy Kid' },
    { id: 'girl-teen', src: GirlTeenager, alt: 'Girl Teenager' },
    { id: 'boy-teen', src: BoyTeenager, alt: 'Boy Teenager' },
    { id: 'baby-girl', src: BabyGirl, alt: 'Baby Girl' },
    { id: 'baby-boy', src: BabyBoy, alt: 'Baby Boy' }
  ];

  useEffect(() => {
    const fetchTask = async () => {
      if(childId) {
        try {
          const childData = await getChildDataById(userId, childId);
          setUpdatedChildData(childData);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch child data');
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [userId, childId]);

  const handleUpdatedChildProfile = async (e) => {
    e.preventDefault();
    setIsEditing(true);

    if (!childId) {
      return alert ('ChildId is missing');
    }

    try {
      const updateData = await updateChildData(
        userId, 
        childId,
        {
          name: updatedChildData.name,
          age: updatedChildData.age,
          imageUrl: updatedChildData.imageUrl,
          avatarAlt: updatedChildData.avatarAlt,
          avatarId: updatedChildData.avatarId,
          updatedAt: new Date(),
        }
      );

      console.log('Child profile updating with ID', updateData);
      alert('Successfully Updating Child Profile!');
      router.push(`/mainpage/profile/parent?userId=${userId}`);
    } catch (err) {
      console.error('Full error:', err);
      setError('Failed to update child profile: ' + err.message);
    } finally {
      setIsEditing(false);
    }
  };


  return (
    <section className="w-full min-h-screen bg-white p-8">
      <div className="flex flex-col">
        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold">Edit Child Profile</h1>
        </div>

        <div className="mt-4 w-full bg-white shrink-0 rounded-2xl shadow-2xl p-6">
          <form onSubmit={handleUpdatedChildProfile}>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Child Name</span>
              </label>
              <input 
                type="text"
                placeholder="Name"
                value={updatedChildData.name || ''}
                onChange={(e) => setUpdatedChildData({...updatedChildData, name:e.target.value})}
                className="input input-bordered input-md bg-white w-full max-w-md"
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
                value={updatedChildData.age || ''}
                onChange={(e) => setUpdatedChildData({...updatedChildData, age:e.target.value})}
                className="input input-bordered input-md bg-white w-full max-w-md"
                required
                min="0"
                max="18"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Child Avatar</span>
              </label>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                {avatarOptions.map((avatar) => (
                  <div  
                    key={avatar.id}
                    className={`cursor-pointer p-2 border-4 rounded-lg transition-all duration-300 ${
                      updatedChildData.avatarId === avatar.id 
                        ? 'border-blue-300 scale-105 ' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setUpdatedChildData({
                      ...updatedChildData, 
                      imageUrl: avatar.src,
                      avatarAlt: avatar.alt, 
                      avatarId: avatar.id
                    })}
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

            <div className="flex flex-row mt-6 space-x-4 justify-end">
              <button 
                type="submit" 
                className={`
                  btn btn-md border-white bg-[#FFB4B4] hover:bg-[#FFDEB4] text-black
                  ${isEditing ? 'Editing': ''}
                  `}
                disabled = {isEditing}
              >
                { isEditing ? 'Editing...' : 'Save Edit'}
              </button>

              <Link href={`/mainpage/profile/parent?userId=${userId}`}>
                <button type="button" className='btn btn-md btn-neutral text-white'>
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