"use client"

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
  CardFooter } from '@/components/ui/card';
  import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    Pie,
    PieChart
  } from "recharts";
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";

  const chartData = [
    {month: "January", progress: 50},
    {month: "February", progress: 100},
    {month: "March", progress: 75}, 
    {month: "June", progress: 15}, 
    {month: "July", progress: 30}, 
  ]

  const chartConfig = {
    desktop: {
        label: "Progress",
        color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const dataChart = [
    { day: "Sun", progress: 100, fill:"var(--color-sun)" },
    { day: "Mon", progress: 80, fill: "var(--color-mon)" },
    { day: "Tue", progress: 90, fill: "var(--color-tue)" },
    { day: "Wed", progress: 75, fill: "var(--color-wed)" },
    { day: "Thu", progress: 85, fill: "var(--color-thu)" }, 
  ]

  const dataConfig = {
    sun: {
        label: "Sun",
        color: "hsl(var(--chart-1))",
    },
    mon: {
        label: "Mon",
        color: "hsl(var(--chart-2))",
    },
    tue: {
        label: "Tue",
        color: "hsl(var(--chart-3))",
    },
    wed: {
        label: "Wed",
        color: "hsl(var(--chart-4))",
    },
    thu: {
        label: "Thu",
        color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  function DisplayCharts(){

  return (
    <div className="grid lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Monthly Progress</CardTitle>
          <CardDescription>January - July 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0,3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="progress" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                      position="top"
                      offset={12}
                      className='fill-foreground'
                      fontSize={12}
                    />
                </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        </Card>

        <Card className="col-span-1">
            <CardHeader className="pb-0">
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>
                    Activity progress over the past week
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={dataConfig}
                    className='mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground'
                >
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent  nameKey="progress" hideLabel />} />
                    <Pie data={dataChart} dataKey="progress" label nameKey="day" />
                </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-1">
                <CardDescription>
                    Average progress:{" "}
                <span className="font-medium text-foreground">85%</span>
                </CardDescription>
            </CardFooter>
        </Card>
    </div>
  )
}

export default DisplayCharts