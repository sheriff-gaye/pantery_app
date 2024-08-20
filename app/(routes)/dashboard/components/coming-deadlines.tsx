"use client";

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
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import RowData from "./row-data";
import {useAuth} from "@/hooks/auth";
import { firstFiveDeadlines, PantryItem } from "@/actions/pantries";
import CardSkeleton from "./table-sekeleton";

const ComingDeadlines = () => {
  const { user } = useAuth();
  const [data, setData] = React.useState<PantryItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      try {
        setLoading(true);
        const fetchedData = await firstFiveDeadlines(user.uid);
        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching expired data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <CardSkeleton/>;

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Pantries</CardTitle>
          <CardDescription>Upcoming Expiry Products</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/categories">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <RowData data={data} loading={loading} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ComingDeadlines;