"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
import { useGetStatisticByEducationQuery } from "@/service"

const chartConfig = {
  jumlah: {
    label: "Jumlah",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CitizenEducationChart() {
   const { data } = useGetStatisticByEducationQuery({})
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Grafik Penduduk berdasarkan Tingkat Pendidikan</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data?.data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="jumlah" hide />
            <YAxis
              dataKey="education_level"
              type="category"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
              interval={0}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="jumlah" fill="var(--color-jumlah)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}