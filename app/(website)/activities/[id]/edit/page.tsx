import { notFound } from "next/navigation";
import EditForm  from "./edit-form";
import { activitiesData, Participants } from "@/lib/activities-data";


export default async function EditPage({ params }: { params: { id:Number } }) {
  const id = params.id;
  // const [activity, participants] = await Promise.all([
  //   fetchActivityById(id),
  //   fetchParticipants()
  // ])

  // if(!activity){
  //   notFound()
  // }

  return(
    <section>
      <EditForm activity={activitiesData} participants={Participants}/>
    </section>
  )
}
