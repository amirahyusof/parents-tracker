"use client"

import { Check, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useAuth } from '../firebase/hook';
import { routeDB } from '../firebase/api/route';

export default function ListActivity({ activityData, setActivityData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');
  const userId = searchParams.get('userId');
  const { deleteActivity } = routeDB();
  const [deleteTaskId, setDeletingTaskId] = useState(null);

  const handleEditTask = (userId, childId, activityId) => {
    router.push(`/mainpage/activity/edit?userId=${userId}&childId=${childId}&activityId=${activityId}`);
  };

  const handleDeleteTask = async (activityId) => {
    const confirmDelete = window.confirm('Are you sure want to delete this task?');

    if (confirmDelete) {
      try {
        setDeletingTaskId(activityId);
        await deleteActivity(userId, childId, activityId);
        setActivityData((prevData) => prevData.filter((activity) => activity.id !== activityId))
        alert('Activity deleted successfully!');
        router.refresh();

      } catch (error) {
        console.error('Failed to delete activity:', error);
        alert('Failed to delete activity');

      } finally {
        setDeletingTaskId(null);
      }
    }
  };

  return (
    <section className='mt-6 space-y-4'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activityData.length > 0 && activityData.map((activity) => (
          <div key={activity.id} className='card shadow-xl border-2 border border-[#FFDEB4]'>
            <div className="card-body">
              <p>Title: <span className='capitalize'>{activity.name}</span></p>
              <p>Description: {activity.description}</p>
              <p>Status: {activity.status}</p>
              <p>DueDate: {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : "No due date"}</p>

              <div className='card-actions justify-end'>
                <button
                  type='button'
                  onClick={() => handleEditTask(activity.id, childId)}
                  className="btn btn-xs"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  type='button'
                  onClick={() => handleDeleteTask(activity.id)}
                  className={` bg-red-500 text-white px-3 py-1 rounded
                    ${deleteTaskId === activity.id ? 'opacity-50 cursor-not-allowed' : "hover:bg-red-600"}
                    `}
                >
                  {deleteTaskId === activity.id ? 'Deleting...' : <Trash2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}