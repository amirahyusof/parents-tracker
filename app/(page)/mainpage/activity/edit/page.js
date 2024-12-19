"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/firebase/hook';
import { routeDB } from '@/app/firebase/api/route';

export default function CreateActivityPage() {
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');
  const userId = searchParams.get('userId');
  const activityId = searchParams.get('activityId');
  const [taskId, setTaskId] = searchParams.get('taskId');
  const { getActivityById, updateActivity } = routeDB();

  const [taskData, setTaskData] = useState({
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
          const task = await getActivityById(activityId);
          setTaskData(task);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch task');
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [activityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityId) return alert('Activity ID is missing.');

    setIsEditing(true);

    try {
      await updateActivity(taskId, taskData)

      console.log('Task editing with ID:', task);
      alert('Task editing successfully!');
      router.push(`/mainpage/activity?userId=${userId}&childId=${childId}`);

    } catch (error) {
      console.error('Error editing task:', error);
      setError("Failed to update task");
      alert('Failed to edit the task. Please try again.');

    } finally {
      setIsEditing(false);
    }
  };

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
            <span className="label-text">Activity</span>
          </label>
          <input
            id="taskName"
            type="text"
            placeholder="Task"
            className="input input-bordered input-md bg-white w-full max-w-xs"
            value={taskData.title}
            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="date" className="label">
            <span className='label-text'>Due Date</span>
          </label>
          <textarea
            id="duedate"
            type="date"
            className="w-full p-2 border rounded"
            value={taskData.dueDate}
            onChange={(e) => setTaskData({...taskData, dueDate:e.target.value})}
          />
        </div>

        <div className="form-control">
          <label className="block mb-2">Status</label>
          <select
            value={taskData.status}
            onChange={(e) => setTaskData({...taskData, status: e.target.value})}
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
            className={`btn w-full ${isEditing ? 'loading' : ''}`}
            disabled={isEditing}
          >
            {isEditing ? 'Editing...' : 'Save Task'}
          </button>

          <Link href="/mainpage" className="w-full">
            <button type="button" className='btn btn-md btn-neutral w-full'>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}