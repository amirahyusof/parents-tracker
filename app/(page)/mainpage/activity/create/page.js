"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/app/firebase/config';

export default function CreateActivityPage() {
  const router = useRouter();
  const { childId } = router.query; // Get the childId from the dynamic route

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!childId) return alert('Child ID is missing.');

    setIsSubmitting(true);

    try {
      // Add the task to the Firestore tasks collection
      const taskRef = await addDoc(collection(db, 'tasks'), {
        childId, // Reference to the specific child
        taskName,
        taskDescription,
        isCompleted: false, // Default state
        createdAt: serverTimestamp(),
      });

      console.log('Task created with ID:', taskRef.id);
      alert('Task created successfully!');
      router.push(`/activity?childId=${childId}`); // Redirect back to the activity page
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create the task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-6 h-screen">
      <h1 className="text-xl mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium">
            Task Name
          </label>
          <input
            id="taskName"
            type="text"
            className="input input-bordered w-full"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium">
            Task Description
          </label>
          <textarea
            id="taskDescription"
            className="textarea textarea-bordered w-full"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className={`btn w-full ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Task'}
          </button>
        </div>
      </form>
    </section>
  );
}
