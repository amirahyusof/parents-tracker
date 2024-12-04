
import { useAuth } from "@/app/firebase/hook";
import ActivityCard from "@/app/interface/activityCard";
import AvatarChild from "@/app/interface/avatar";
import UpBar from "@/app/interface/navbar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const {currentUser, getChildData} = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if(currentUser){
        const data = await getUserDocument( currentUser.uid);
        const childData = await getChildData()
        setData(childData)
      }
    };
    fetchUserData()
  }, [currentUser, getChildData])

  return (
    <section>
      <UpBar />
      <AvatarChild ChildData={data} />
      <ActivityCard ChildData={data} />
    </section>
  )
}

export default Dashboard