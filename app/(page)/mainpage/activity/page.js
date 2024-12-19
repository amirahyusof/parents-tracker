"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/hook";
import ListActivity from '@/app/interface/ListActivity';
import { routeDB } from '@/app/firebase/api/route';

export default function ActivityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');
  const userId = searchParams.get('userId');
  const {user, loading} = useAuth();
  const { getActivity } = routeDB()
  const [childActivities, setChildActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(userId && childId){
      const fetchTasks = async () => {
        try {
          const data = await getActivity(userId, childId);
          console.log('Fetched activities:', data);
          setChildActivities(data);
          setError(null);
        } catch(error){
          console.error('Deatiled error fetching activities:', error);
          setError("Failed to fetch activities");
        }
      };
      fetchTasks();
    }
  }, [user, childId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-6 h-screen bg-[#FFF9CA]'>
      <h1 className='text-2xl'>Activities for</h1>
      <div>
        <button 
          onClick={() => router.push(`/mainpage/activity/create?userId=${userId}&childId=${childId}`)}
          className='mt-4 bg-[#FF9494] text-white px-4 py-2 rounded hover:bg-[#FFD1D1] transition'
        >
          Add New Task
        </button>
      
        {/* Conditional rendering for tasks */}
        {(!childActivities || childActivities.length === 0) ? (
          <div className="mt-8 text-left">
            <p className="text-gray-500">No tasks yet</p>
            <p className="text-sm text-gray-400">
              Click "Add New Task" to create your first task
            </p>
          </div>
          ) : (
          <ListActivity 
            activityData={childActivities}
          />
        )}
      </div>
    </section>
  );
}



