import React from "react";
import { useRouter } from "next/navigation";

export default function ActivityCard({ data }){
  const router = useRouter();

  const handleEditTask = (activityId, childId) => {
    router.push(`/mainpage/activity/edit?taskId=${activityId}&childId=${childId}`);
  };

  if(!data){
    return <div>Please add activity
    </div>
  }


  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold">Activities</h2>
      <div>
      {data.length > 0 && (
        <div className="p-4 bg-[#FFB4B4] m-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map(task => (
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
      
    </div>
  );
};
