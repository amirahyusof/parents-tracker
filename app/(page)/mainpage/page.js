"use client"

import React, {useState, useEffect} from "react";
import { useAuth } from "@/app/firebase/hook";
import ActivityCard from "@/app/interface/activityCard-Undone";
import AvatarChild from "@/app/interface/avatar";
import UpBar from "@/app/interface/navbar";

const Dashboard = () => {
  const { currentUser, userData, childData, loading } = useAuth();
  const [undoneTasks, setUndoneTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  console.log("Current user:", currentUser);
  console.log("UserData:", userData);
  console.log("Child Data", childData);

  const UndoneTasks = async () => {
    if (currentUser) {
      try {
        setTasksLoading(true);
        const tasks = await getAllUndoneTasks(currentUser.uid);
        setUndoneTasks(tasks);
      } catch (error) {
        console.error('Error fetching undone tasks:', error);
      } finally {
        setTasksLoading(false);
      }
    }
  };

  useEffect(() => {
    UndoneTasks();
  }, [currentUser]);

  if (loading || tasksLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#FFF9CA] h-screen">
      <AvatarChild 
        childData={childData} 
        user={currentUser || userData} 
      />
      <ActivityCard 
        childData = {childData}
        undoneTask={undoneTasks} 
        user={currentUser || userData}
      />
    </section>
  )
}

export default Dashboard