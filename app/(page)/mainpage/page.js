"use client"

import React, {useState, useEffect} from "react";
import ActivityCard from "@/app/interface/activityCard-Undone";
import AvatarChild from "@/app/interface/avatar";
import { routeDB } from "@/app/firebase/api/route";
import { useAuth } from "@/app/firebase/hook";
import { useSearchParams } from "next/navigation";

export default function Dashboard(){
  const { user, loading } = useAuth();
  const searchParams = useSearchParams()
  const userIdFromParams = searchParams.get('userId')
  const { getChildData, getAllUndoneActivities} = routeDB();
  const [childData, setChildData] = useState([]);
  const [activityUndoneData, setActivityUndoneData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = userIdFromParams || user?.uid;

      if(userId) {
        try {
          const children = await getChildData(userId);
          const undoneActivities = await getAllUndoneActivities(userId);
          
          setChildData(children);
          setActivityUndoneData(undoneActivities);
         } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [userIdFromParams, user]);

  if(loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#FFF9CA]">
      <AvatarChild
        childData={childData}
      />
      
      <ActivityCard
        data={activityUndoneData}
        loading = {loading}
      />
    </section>
  );
};
