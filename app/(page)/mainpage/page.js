"use client"

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/firebase/hook";
import ActivityCard from "@/app/interface/activityCard-Undone";
import AvatarChild from "@/app/interface/avatar";

const Dashboard = () => {
  const { currentUser, userData, childData, loading} = useAuth();

  console.log("Current user:", currentUser);
  console.log("UserData:", userData);
  console.log("Child Data", childData);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#FFF9CA] h-screen">
      <AvatarChild
        childData={childData}
        user={currentUser || userData}
      />
      
      <ActivityCard
        childData={childData}
        user={currentUser || userData}
      />
     
    </section>
  );
};

export default Dashboard;