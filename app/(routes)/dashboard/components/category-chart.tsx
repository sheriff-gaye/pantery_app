"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { getCategoryChartData } from "@/actions/pantries";
import { useAuth } from "@/hooks/auth";
import { CategoryChartSkeleton } from "./skeleton";

const chartConfig: any = {
  Proteins: {
    color: "hsl(var(--chart-1))"
  },
  Vegetable: {
    color: "hsl(var(--chart-2))"
  },
  Carbohydrates: {
    color: "hsl(var(--chart-3))"
  },
  Minerals: {
    color: "hsl(var(--chart-4))"
  },
  Fiber: {
    color: "hsl(var(--chart-5))"
  },
  Fats: {
    color: "hsl(var(--chart-6))"
  }
} satisfies ChartConfig;

const CategoryChart = () => {
  const [data, setData] = React.useState<
    { name: string; value: number; fill?: string }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchData = async () => {
      const userId: string | undefined = user?.uid;

      if (!userId) {
        setError("User ID is not available");
        setLoading(false);
        return;
      }

      try {
        const result = await getCategoryChartData(userId);
        if (result && Array.isArray(result)) {
          const updatedData = result.map((item) => ({
            ...item,
            fill: chartConfig[item.name]?.color || "gray"
          }));
          setData(updatedData);
        } else {
          setError("No data available");
        }
      } catch (error) {
        console.error("Error fetching category chart data:", error);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.uid]);

  if (loading) return <CategoryChartSkeleton />;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Chart</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie data={data} dataKey="value" scale={33}>
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: any) => chartConfig[value]?.label || value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Pantry categories distribution for inventory 
        </div>
      </CardFooter>
    </Card>
  );
};

export default CategoryChart;
