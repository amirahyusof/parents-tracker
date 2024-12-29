"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/hook";
import { routeDB } from '@/app/firebase/api/route';
import ListChildAvatar from './child/listChildAvatar';

export default function ParentProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userIdFromParams = searchParams.get('userId');
  const { user, loading } = useAuth();
  const { getUserDocument, updateUserDocument, getChildData } = routeDB();
  const [childData, setChildData] = useState([]);
  const [parentData, setParentData] = useState({
    username: '', 
    email: '', 
    bio: ''
  });
  const [error, setError] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = userIdFromParams || user?.uid;

      if(!userId){
        setError("No user Id available");
        return;
      }

      try {
        const data = await getUserDocument(userId);
        setParentData((prevState)=> ({
          ...prevState, 
          ...data
        }));

        if(!data){
          setError("Failed to get or create user data");
          return;
        }

        const children = await getChildData(userId);
        setChildData(children || []);
        setError(null)
        
        } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to load user data: ${error.message}`);
      }
    };

    fetchData();
  }, [user, getUserDocument, getChildData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdate(true);
    setError(null)

    const userId = userIdFromParams || user?.uid;

    if(!userId){
      setError('No user ID available');
      setIsUpdate(false);
      return;
    }

    try {
      const updateData = await updateUserDocument(
        userId, 
        {
         ...parentData, 
         updatedAt: new Date(),
        }
      )
      setParentData((prevState) => ({
        ...prevState, 
        username: parentData.username,
        bio: parentData.bio,
      }))

      console.log('Edit user data with ID:', updateData);
      alert('Profile updated successfully!');
      router.push(`/mainpage/profile/parent?userId=${userIdFromParams}`);

    } catch (error) {
      console.error('Error updating user profile:', error);
      setError("Failed to update user profile");
      alert('Failed to edit user profile. Please try again :-)')

    } finally {
      setIsUpdate(false)
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

    if(loading) {
    return <div>Loading...</div>;
  }


  return (
    <section className='p-6 w-full min-h-screen bg-[#FFF9CA]'>
      <h1 className='text-2xl mb-4'>Parent Profile</h1>

      <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md p-6'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username
          </label>
          <input
            className='shadow bg-white border rounded w-full py-2 px-3 text-gray-700 rounded-2xl focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            value={parentData.username || ''}
            onChange={(e) => 
              setParentData((prevState) => ({
                ...prevState, 
                username: e.target.value
              }))
            }
          />
          <div className='label'>
            <span className='label-text-alt'>This is your public display name. It can be your real name</span>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='shadow bg-gray-300 border rounded w-full py-2 px-3 text-gray-700 rounded-2xl focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            value={parentData.email || ''}
            disabled
          />
          <div className='label'>
            <span className='label-text-alt'>No able to change the email</span>
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bio'>
            Bio
          </label>
          <textarea
            className='shadow  bg-white border border rounded w-full py-2 px-3 text-gray-700 rounded-2xl focus:outline-none focus:shadow-outline'
            id='bio'
            type='text'
            value={parentData.bio || ''}
            onChange={(e) => 
              setParentData((prevState) => ({
                ...prevState, 
                bio: e.target.value
              }))}
          />
          <div className='label'>
            <span className='label-text-alt'>You can write about yourself or your child</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className={`bg-[#FF9494] hover:bg-[#FFD1D1] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
              ${isUpdate ? 'Updating': ''}`}
            disabled={isUpdate}  
            type='submit'
          >
            {isUpdate ? "Updating...": "Update"}
          </button>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={() => router.push(`/mainpage?userId=${userIdFromParams}`)}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className='mt-6'>
        <h1 className='text-2xl'>Child Profile</h1>
        <div className='label'>
          <span className='label-text-alt'>Click avatar to edit child profile</span>
        </div>
        <div className='bg-white rounded-lg shadow-md p-2'>
          <ListChildAvatar 
            childData={childData}
          />
        </div>

      </div>
    </section>
  );
}