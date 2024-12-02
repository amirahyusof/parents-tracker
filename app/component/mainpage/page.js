
import ActivityCard from "@/app/interface/activityCard";
import AvatarChild from "@/app/interface/avatar";
import UpBar from "@/app/interface/navbar";

const page = () => {
  return (
    <section>
      <UpBar />
      <AvatarChild />
      <ActivityCard />
    </section>
  )
}

export default page