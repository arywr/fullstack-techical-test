"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

const chartConfig = {
  total_men: {
    label: "Pria",
    color: "hsl(var(--chart-1))",
  },
  total_female: {
    label: "Perempuan",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function CitizenGenderChart() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:3005/api/citizens/genders')
    const data = await res.json();
    setData(data?.data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Grafik Penduduk berdasarkan Jenis Kelamin per Provinsi</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="province"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="total_men"
              stackId="a"
              fill="var(--color-total_men)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="total_female"
              stackId="a"
              fill="var(--color-total_female)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
