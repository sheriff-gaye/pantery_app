"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type Category = {
  id: string;
  category: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
