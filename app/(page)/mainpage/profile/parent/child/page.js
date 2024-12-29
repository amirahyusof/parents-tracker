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
  const { user, loading } = useAuth();
  const { getChildData, updateChildData } = routeDB();
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
  }, [userId, childId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChildData(userId, childId, childDetails);
      router.push(`/profile/child?userId=${userId}&childId=${childId}`);
    } catch (error) {
      console.error('Error updating child data:', error);
      setError("Failed to update child data");
    }
  };

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (loading || !childDetails) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section className='p-6 h-screen bg-[#FFF9CA]'>
      <h1 className='text-2xl mb-4'>Edit Child Profile</h1>
      <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md p-6'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name
          </label>
          <input
            className='shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            // value={childDetails.name || ''}
            // onChange={(e) => setChildDetails({...childDetails, name: e.target.value})}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='age'>
            Age
          </label>
          <input
            className='shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='age'
            type='number'
            // value={childDetails.age || ''}
            // onChange={(e) => setChildDetails({...childDetails, age: e.target.value})}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='imageUrl'>
            Profile Image URL
          </label>
          <input
            className='shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='imageUrl'
            type='text'
            // value={childDetails.imageUrl || ''}
            // onChange={(e) => setChildDetails({...childDetails, imageUrl: e.target.value})}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-[#FF9494] hover:bg-[#FFD1D1] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Save Changes
          </button>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => router.push(`/mainpage/profile/parent?userId=${userId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

