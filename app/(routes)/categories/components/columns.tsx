"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    id: "quantity",
    header:"Quantity"
 
  },
];
