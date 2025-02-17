"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { useGetStatisticsByReligionQuery } from "@/service"

const chartConfig = {
  jumlah: {
    label: "Jumlah",
  },
  islam: {
    label: "Islam",
    color: "hsl(var(--chart-1))",
  },
  protestan: {
    label: "Kristen Protestan",
    color: "hsl(var(--chart-2))",
  },
  kepercayaan: {
    label: "Kepercayaan",
    color: "hsl(var(--chart-3))",
  },
  buddha: {
    label: "buddha",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function CitizenReligionChart() {
  const [stats, setStats] = useState([]);

  const { data, isLoading } = useGetStatisticsByReligionQuery({})

  useEffect(() => {
    if (data && data?.data?.length) {
      const temp = [];
  
      for (let index = 0; index < data?.data?.length; index++) {
        let fill = "hsl(var(--chart-5))";
        const item = data?.data[index];
        // @ts-ignore
        if (item?.religion === "Islam") fill = "hsl(var(--chart-1))";
        if (item?.religion === "Kristen Protestan") fill = "hsl(var(--chart-2))";
        if (item?.religion === "Buddha") fill = "hsl(var(--chart-3))";
        if (item?.religion === "Hindu") fill = "hsl(var(--chart-4))";

        temp.push({ ...item, fill });
      }
  
      // @ts-ignore
      setStats(temp);
    }
  }, [data]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Grafik Penduduk berdasarkan Agama</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={stats}
              dataKey="jumlah"
              nameKey="religion"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
