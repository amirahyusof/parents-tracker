import React from "react";
import { useRouter } from "next/navigation";

export default function ActivityCard({ childData }){
  const router = useRouter();

  const handleEditTask = (taskId, childId) => {
    router.push(`/activity/edit?taskId=${taskId}&childId=${childId}`);
  };

  return (
    <div>
      {childData.map(task => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button 
            onClick={() => handleEditTask(task.id, task.childId)}
            className="edit-button"
          >
            Edit Task
          </button>
        </div>
      ))}
    </div>
  );
};
