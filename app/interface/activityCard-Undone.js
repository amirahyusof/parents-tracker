import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilePenLine, Pencil } from "lucide-react";


export default function ActivityCard({ data, loading }){
  const router = useRouter();
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')


  const handleEditTask = (userId, childId, activityId) => {
    router.push(`/mainpage/activity/edit?userId=${userId}&childId=${childId}&activityId=${activityId}`);
  };

  if(loading){
    return <div>Loading...</div>
  } 

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold">Activities</h2>
  
      {(!data || data.length === 0) ? (
        <div className="text-left p-6 bg-[#FFB4B4] text-black rounded-lg">
          <p className="text-gray-700">No activities yet. Let's add some by clicking child's profile! </p>
        </div>
        ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((activity) => (
          <div key={activity.id} className="bg-[#FFB4B4] p-4 m-2 rounded shadow rounded space-y-2">
            <h2 className="text-2xl text-white font-semibold">{activity.childName}</h2>
            <h3 className="font-semibold text-gray-600">
              Activity: {" "}
              <span className="text-white capitalize text-sm">{activity.name}</span>
            </h3>
            <p className="text-sm text-gray-600">
              Status: <span className="capitalize">{activity.status}</span>
            </p>

            <div className="card-actions justify-end">
              <button 
                onClick={() => handleEditTask(userId, activity.childId, activity.id)}
                className="edit-button mt-2 bg-[#FFD1D1] text-black px-3 py-1 border-2 rounded hover:bg-[#FF9494] transition text-sm"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            
          </div>
          ))}
        </div>
      )}
    </div>
  );
};
