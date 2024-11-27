"use client";

import { DataTableColumnHeader } from "@/components/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteButton, EditButton, ViewButton } from "@/components/ui/activity/activities-button";

type Activity = {
  id: number
  status: string
  activity: string
  type: string
  createdAt: string
  completedAt: string
}

export const ActivityColumns: ColumnDef<Activity>[] = [
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
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    accessorKey: "completedAt",
    header: "Completed Date"
  }, 
  {
    accessorKey: "action", 
    header: "Action",
    cell: ({ row }) => {
      return(
        <div className="flex mx-auto justify-center gap-4">
          <ViewButton />
          <EditButton />
          <DeleteButton />
        </div>
      )
    }
  }
]