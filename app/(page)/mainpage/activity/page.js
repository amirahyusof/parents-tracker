"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/hook";
import ListActivity from '@/app/interface/ListActivity';

export default function ActivityPage() {
  const { loading, getTasks } = useAuth();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId'); 
  const [childActivities, setChildActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(childId){
      const fetchTasks = async () => {
        try {
          const data = getTasks(childId)
          console.log('Fetched activities:', data);
          setChildActivities(data);
          setError(null);
        } catch(error){
          console.error('Deatiled error fetching activities:', error);
          setError("Failed to fetch activities");
          throw error;
        }
      };
      fetchTasks();
    }
  }, [childId, getTasks]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-6 h-screen bg-[#FFF9CA]'>
      <h1 className='text-xl'>Activities for {/* Child Name */}</h1>
      <div>
        <Link href={`/mainpage/activity/create?childId=${childId}`}>
          <button className='btn hover:bg-[#B2A4FF]'>
            Add New Task
          </button>
        </Link>

        {/* Conditional rendering for tasks */}
        {childActivities.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-gray-500">No tasks yet</p>
            <p className="text-sm text-gray-400">
              Click "Add New Task" to create your first task
            </p>
          </div>
        ) : (
          <ListActivity 
            childData={fetchTasks}
          />
        )}
      </div>
    </section>
  );
}



