"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/hook";
import { routeDB } from '@/app/firebase/api/route';
import Image from 'next/image';

export default function ChildProfileEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const childId = searchParams.get('childId');
  const { getChildData } = routeDB();
  const { loading } = useAuth();
  const [childDetails, setChildDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId && childId) {
      const fetchChildData = async () => {
        try {
          const children = await getChildData(userId);
          const currentChild = children.find(child => child.id === childId);
          setChildDetails(currentChild);
          setError(null);
        } catch (error) {
          console.error('Error fetching child data:', error);
          setError("Failed to fetch child data");
        }
      };
      fetchChildData();
    }
  }, [userId, childId, getChildData]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !childDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-6 h-screen bg-[#FFF9CA]'>
      <h1 className='text-2xl mb-4'>{childDetails.name}'s Profile</h1>
      <div className='card bg-white rounded-lg shadow-md p-6'>
        <figure>
          {childDetails.imageUrl ? (
            <Image 
              src={childDetails.imageUrl}
              alt={`${childDetails.name}'s profile image`}
              width={100}
              height={100}
              className='rounded-full'

            />
          ):(
            <p className='text-gray-600'>No profile image available</p>
          )}
        </figure>
        <div className='card-body'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <p className='text-gray-800'>{childDetails.name}</p>
          </div>
        

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Age
            </label>
            <p className='text-gray-800'>{childDetails.age}</p>
          </div>

          <div className='card-actions flex justify-end'>
            <button
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={() => router.push(`/mainpage/activity?userId=${userId}&childId=${childId}`)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

