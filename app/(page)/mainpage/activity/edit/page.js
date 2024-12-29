"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { routeDB } from '@/app/firebase/api/route';

export default function CreateActivityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');
  const userId = searchParams.get('userId');
  const activityId = searchParams.get('activityId');
  const { getActivityById, updateActivity } = routeDB();
  const [updatedActivity, setUpdatedActivity] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'undone'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if(activityId) {
        try {
          const activity = await getActivityById(userId, childId, activityId);
          setUpdatedActivity(activity);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch activity');
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [userId, childId, activityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityId) return alert('Activity ID is missing.');

    setIsEditing(true);

    try {
      const editActivity = await updateActivity(
        userId, 
        childId, 
        activityId, 
        {
          ...updatedActivity,
          updatedAt: new Date(),
        }, 
      )

      console.log('Activity editing with ID:', editActivity);
      alert('Activity editing successfully!');
      router.push(`/mainpage/activity?userId=${userId}&childId=${childId}`);

    } catch (error) {
      console.error('Error editing activity:', error);
      setError("Failed to update activity");
      alert('Failed to edit the activity. Please try again.');

    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel= () => {
    router.push(`/mainpage/activity?userId=${userId}&childId=${childId}`);
  }

  if(loading){
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Error: {error}</div>;
  }

  return (
    <section className="p-6 h-screen">
      <h1 className="text-xl mb-4">Edit Activity</h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label htmlFor="taskName" className="label">
            <span className="text-black">Activity</span>
          </label>
          <input
            id="taskName"
            type="text"
            className="input input-bordered input-md bg-white w-full max-w-xs"
            value={updatedActivity.name || ''}
            onChange={(e) => setUpdatedActivity({...updatedActivity, name: e.target.value})}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="taskDescription" className="label">
            <span className="text-black">Description</span>
          </label>
          <textarea
            id="taskDescription"
            type="text"
            className="input input-bordered input-md bg-white w-full max-w-xs"
            value={updatedActivity.description || ''}
            onChange={(e) => setUpdatedActivity({...updatedActivity, description:e.target.value})}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="date" className="label">
            <span className='text-black'>Due Date</span>
          </label>
          <input
            id="duedate"
            type="date"
            className="w-full p-2 border rounded"
            value={updatedActivity.dueDate || ''}
            onChange={(e) => setUpdatedActivity({...updatedActivity, dueDate:e.target.value})}
          />
        </div>

        <div className="form-control">
          <label className="block mb-2 text-black">Status</label>
          <select
            value={updatedActivity.status || ''}
            onChange={(e) => setUpdatedActivity({...updatedActivity, status: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="undone">Undone</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="mt-6 space-y-2">
          <button
            type="submit"
            className={`btn w-full bg-green-300 ${isEditing ? 'Editing' : ''}`}
            disabled={isEditing}
          >
            {isEditing ? 'Editing...' : 'Save Edit'}
          </button>

          <button 
            type="button" 
            className='btn btn-md btn-neutral w-full'
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}