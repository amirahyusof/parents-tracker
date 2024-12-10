import React from "react";
import { useRouter } from "next/navigation";

export default function ActivityCard({ undoneTask, childData, user }){
  const router = useRouter();

  const handleEditTask = (taskId, childId) => {
    router.push(`/activity/edit?taskId=${taskId}&childId=${childId}`);
  };

  return (
    <div>
      {undoneTask.length > 0 && (
        <div className="p-4 bg-[#FFB4B4] m-4 rounded">
          <h2 className="text-xl font-bold">Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {undoneTask.map(task => (
            <div key={task.id} className="bg-white p-3 rounded shadow">
              <h2 className="text-lg">{task.childName}</h2>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">
                Status: {task.status}
              </p>
              <button 
                onClick={() => handleEditTask(task.id, task.childId)}
                className="edit-button"
              >
                Edit Task
              </button>
            </div>
            ))}
          </div>
        </div>
        )
      }
    </div>
  );
};
