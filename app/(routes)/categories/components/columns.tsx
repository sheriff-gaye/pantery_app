"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Payment = {
  id: string
  status: "pending" | "processing" | "success" | "failed"
  category: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
]
