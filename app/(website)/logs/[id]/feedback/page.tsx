import { notFound } from "next/navigation";
import { activitiesData, Participants } from "@/lib/activities-data";
import FeedbackForm from "./feedback-form";


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
      <FeedbackForm activity={activitiesData} />
    </section>
  )
}