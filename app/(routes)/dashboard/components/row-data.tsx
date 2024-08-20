"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { parseISO } from "date-fns";

interface Pantry {
  id: string;
  name: string;
  date: string;
  quantity: number;
  category: string;
}

interface RowDataProps {
  data: Pantry[];
  loading: boolean;
}

const RowData = ({ data, loading }: RowDataProps) => {
  if (loading) {
    return (
      <>
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
      </>
    );
  }

  const today = new Date();

  return (
    <>
      {data.map((item) => {
        const itemDate = parseISO(item.date);
        const isExpired = itemDate < today;

        return (
          <TableRow key={item.id}>
            <TableCell>
              <div className="font-medium">{item.name}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {item.category}
              </div>
            </TableCell>
            <TableCell>
              <Badge className="text-xs" variant="default">
                {item.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </TableCell>
            <TableCell>
              {isExpired ? (
                <Badge className="text-xs" variant="destructive">
                  Expired
                </Badge>
              ) : (
                item.date
              )}
            </TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default RowData;
