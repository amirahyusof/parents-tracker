"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/firebase/hook';

export default function CreateActivityPage() {
  const searchParams = useSearchParams();
  const childId = searchParams.get('childId');
  const [taskId, setTasId] = searchParams.get('taskId');
  const { getTaskById, updateTask } = useAuth();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'undone'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const task = await getTaskById(taskId);
          setTaskData(task);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch task');
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskId) return alert('Task ID is missing.');

    setIsEditing(true);

    try {
      await updateTask(taskId, taskData)

      console.log('Task editing with ID:', task);
      alert('Task editing successfully!');
      router.push(`/mainpage/activity?childId=${childId}`);

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
      <h1 className="text-xl mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label htmlFor="taskName" className="label">
            <span className="label-text">Task</span>
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