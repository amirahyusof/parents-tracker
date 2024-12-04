"use client"

import { useAuth } from "@/app/firebase/hook";
import ActivityCard from "@/app/interface/activityCard";
import AvatarChild from "@/app/interface/avatar";
import UpBar from "@/app/interface/navbar";

const Dashboard = () => {
  const { currentUser, userData, childData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <UpBar />
      <AvatarChild ChildData={childData} />
      <ActivityCard ChildData={childData} />
    </section>
  )
}

export default Dashboard