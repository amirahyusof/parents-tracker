"use client"

import Link from 'next/link';
import ActivityCard from '@/app/interface/activityCard';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from "@/app/firebase/hook";

export default function ActivityPage() {
  const { loading, getTasks } = useAuth();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId'); 
  const [childActivities, setChildActivities] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (childId) {
      getTasks(childId)
        .then(data => {
          console.log('Fetched activities:', data);
          setChildActivities(data);
          setError(null);
        })
        .catch(err => {
          console.error('Error fetching activities:', err);
          setError("Failed to fetch activities");
        });
    }
  }, [childId, getTasks]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-6 h-screen mt-10 bg-[#FFF9CA]'>
      <h1 className='text-xl'>Activities for {/* Child Name */}</h1>
      <div>
        <Link href={`/activity/create?childId=${childId}`}>
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
          <ActivityCard childData={childActivities} />
        )}
      </div>
    </section>
  );
}



