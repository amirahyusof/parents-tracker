"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/hook";
import { routeDB } from '@/app/firebase/api/route';
import Image from 'next/image';

export default function ParentProfileEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const { user, loading } = useAuth();
  const { getParentData, updateParentData } = routeDB();
  const [parentDetails, setParentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchParentData = async () => {
        try {
          const parentData = await getParentData(userId);
          setParentDetails(parentData);
          setError(null);
        } catch (error) {
          console.error('Error fetching parent data:', error);
          setError("Failed to fetch parent data");
        }
      };
      fetchParentData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateParentData(userId, parentDetails);
      router.push(`/profile/parent?userId=${userId}`);
    } catch (error) {
      console.error('Error updating parent data:', error);
      setError("Failed to update parent data");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !parentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-6 h-screen bg-[#FFF9CA]'>
      <h1 className='text-2xl mb-4'>Edit Parent Profile</h1>
      <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md p-6'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            value={parentDetails.name || ''}
            onChange={(e) => setParentDetails({...parentDetails, name: e.target.value})}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            value={parentDetails.email || ''}
            onChange={(e) => setParentDetails({...parentDetails, email: e.target.value})}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
            Phone
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='phone'
            type='tel'
            value={parentDetails.phone || ''}
            onChange={(e) => setParentDetails({...parentDetails, phone: e.target.value})}
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
            onClick={() => router.push(`/profile/parent?userId=${userId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
