import React from 'react'
import { activitiesData } from '@/lib/activities-data';
import { ActivitiesDataTable } from "@/app/(website)/activities/activities-dataTable"
import { DisplayColumns } from './display-column';


const Display = () => {
  const data = activitiesData;
  return (
    <div>
      <ActivitiesDataTable
          columns={DisplayColumns}
          data = {data}
        />
    </div>
  )
}

export default Display