import { activitiesData } from "@/lib/activities-data";
import Calender from "./calender";
import { CreateTask } from "@/components/ui/activity/activities-button";
import Display from "./display";

export default async function Schedule(){
  const dataDate = activitiesData

  return(
    <section>
      <div>
        <h1 className="text-2xl">Activity Schedule</h1>
        <p className="font-medium mb-6">View and manage your family activity calender</p>
      </div>

 
      <div className="absolute top-28 right-0 mb-2 mr-4">
        <CreateTask />
      </div>
      
      <div className="w-full flex flex-row gap-8">
        <div className="basis-1/2"> 
          <Calender /> 
        </div>
        <div className="basis-1/2"> 
          <Display />
        </div>
      </div>
      
      
    </section>
  )
}