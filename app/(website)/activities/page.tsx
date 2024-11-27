import React from "react"
import { ActivitiesDataTable } from "./activities-dataTable"
import { ActivityColumns } from "./activities-column"
import { activitiesData } from '@/lib/activities-data';
import { CreateTask } from "@/components/ui/activity/activities-button";



export default async function Activities(){
  const data = activitiesData;

  return (
    <section>
      <div>
        <h1 className="text-2xl">Manage Activities</h1>
        <p className="font-medium mb-6">Create, view and manage family activities</p>
      </div>

      <div className="absolute top-28 right-0 mb-2 mr-4">
        <CreateTask />
      </div>

      <div className="mt-10">
        <ActivitiesDataTable
          columns={ActivityColumns}
          data = {data}
        />
      </div>
      
    </section>
  )
}