"use client";

import { DataTableColumnHeader } from "@/components/column-header";
import { ColumnDef } from "@tanstack/react-table";


type Display = {
  id: number
  status: string
  activity: string
  type: string
  createdAt: string
  completedAt: string
}

export const DisplayColumns: ColumnDef<Display>[] = [
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
]