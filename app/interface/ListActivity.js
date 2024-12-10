"use client"

import { Check, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from '../firebase/hook';

export default function ListActivity({childData}){
  const router = useRouter();
  const {deleteTask} = useAuth();
  const [deleteTaskId, setDeletingTaskId] = useState(null);

 const handleEditTask = (taskId, childId) => {
  router.push(`/mainpage/activity/edit?taskId=${taskId}&childId=${childId}`);
 };

 const handleDeleteTask = async (taskId) => {
  const confirmDelete = window.confirm('Are you sure want to delete this task?');

  if(confirmDelete){
    try {
      setDeletingTaskId(taskId);
      await deleteTask(taskId);
    } catch (error){
      console.error('Failed to delete task:', error)
      alert('Failed to delete task');
    } finally{
      setDeletingTaskId(null)
    }
  }
 };

  return (
    <section className='p-6'>
      <h1 className="text-xl mb-4">Activities <span>{childData.childName}</span></h1>
      <div className="flex flex-rows">
        {childData && childData.map((task, index) => {
          <div key={index} className='card w-40 shadow-xl border-2 border border-[#FFDEB4]'>
            <div className="card-body">
              <p>{task.title}</p>
              <div className='card-actions justify-end'>
                <button 
                  type='button' 
                  onClick={() => handleEditTask(child.id, task.id)}
                  className="btn btn-xs"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button 
                  type='button' 
                  onClick={() => handleDeleteTask(task.id)}
                  className={` bg-red-500 text-white px-3 py-1 rounded
                    ${deletingTaskId === task.id ? 'opcaity-50 cursor-not-allowed' : "hover:bg-red-600"}
                    `}
                >
                  <Trash2 className="h-4 w-4" />
                  {deletingTaskId === task.id? 'Deleting...' : 'Delete'}
                </button>
              </div> 
            </div> 
          </div>
        })}
      </div>
    </section>
  )
}

