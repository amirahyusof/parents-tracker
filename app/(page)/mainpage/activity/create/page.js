"use client"

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateActivityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const childId = searchParams.get('childId');

  const [taskData, setTaskData] = useState({
    symbol: "",
    title: "",
    dueDate: "", 
    status: 'undone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!childId) return alert('Child ID is misssing');

    setIsSubmitting(true);

    try {
      const task = await createTask({
        ...taskData,
        childId, 
        createdAt: new Date(),
      });

      console.log('Task created with ID:', task);
      alert('Task created successfully!');
      router.push(`/mainpage/activity?childId=${childId}`);

    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create the task. Please try again.');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-6 h-screen">
      <h1 className="text-xl mb-4">Create New Task</h1>
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
            onChange={(e) => setTaskData({...taskData, title:e.target.value})}
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

        <div className="mt-6 space-y-2">
          <button
            type="submit"
            className={`btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Task'}
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
