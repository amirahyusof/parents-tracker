import { activitiesData } from "@/lib/activities-data";
import { LogsDataTable } from "./log-datatable";
import { LogsColumns } from "./log-column";

export default async function Logs(){
  const dataLog = activitiesData

  return (
    <section>
      <div>
        <h1 className="text-2xl">Activity Logs</h1>
        <p className="font-medium mb-6">Keep track of past activities and feedback</p>  
      </div>

      <div>
        <LogsDataTable
          data={dataLog}
          columns={LogsColumns}
        />
      </div>
    </section>
  )
}