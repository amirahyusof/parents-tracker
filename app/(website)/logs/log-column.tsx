"use client";

import { DataTableColumnHeader } from "@/components/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { FeedbackButton } from "@/components/ui/activity/activities-button";

type Activity = {
  id: number
  status: string
  activity: string
  type: string
  createdAt: string
}

export const LogsColumns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    id: "activity",
    accessorKey: "activity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activity" />
    ),
    // cell: ({ row }) => {
    //   return <div className="text-right font-medium"> {row.getValue()}</div>
    // }
  },
  { id: "participants",
    accessorKey:"Participants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Participants" />
    ),

  },
  {
    accessorKey: "status",
    header: "Activity Status"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "time",
    header: "Time"
  },
  {
    accessorKey: "feedback&note",
    header: "Feedback & Note"
  },
  {
    accessorKey: "option", 
    header: "Options",
    cell: ({ row }) => {
      return(
        <div className="flex mx-auto justify-center gap-4">
          <FeedbackButton />
        </div>
      )
    }
  }

]