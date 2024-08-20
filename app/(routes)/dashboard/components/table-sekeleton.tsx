import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component in your UI library

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CardSkeleton = () => {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-64 h-4" />
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Skeleton className="w-24 h-6" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-32 h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-32 h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-32 h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-32 h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Render multiple skeleton rows if needed */}
            <TableRow>
              <TableCell>
                <Skeleton className="w-32 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-32 h-4" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-24 h-4" />
              </TableCell>
            </TableRow>
            {/* Repeat TableRow skeletons as needed */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;