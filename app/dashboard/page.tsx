"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

const mockData = {
  daily: [
    { name: "Smell", value: 30 },
    { name: "Cleanliness", value: 25 },
    { name: "Supplies", value: 20 },
    { name: "Cleaning", value: 15 },
  ],
  weekly: [
    {
      day: "Mon",
      smell: 4,
      cleanliness: 3,
      supplies: 2,
      cleaning: 1,
    },
    {
      day: "Tue",
      smell: 3,
      cleanliness: 4,
      supplies: 2,
      cleaning: 2,
    },
    // Add more days...
  ],
  monthly: [
    {
      day: "Week 1",
      smell: 20,
      cleanliness: 15,
      supplies: 10,
      cleaning: 5,
    },
    {
      day: "Week 2",
      smell: 15,
      cleanliness: 20,
      supplies: 12,
      cleaning: 8,
    },
    // Add more weeks...
  ],
};

export default function Dashboard() {
  const [period, setPeriod] = useState("daily");

  return (
    <div className="container p-4 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Tabs value={period} onValueChange={setPeriod}>
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Overview</h2>
            <div className="w-full flex justify-center">
              <PieChart width={400} height={400}>
                <Pie
                  data={mockData.daily}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {mockData.daily.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
            <div className="w-full overflow-x-auto">
              <BarChart
                width={600}
                height={400}
                data={mockData.weekly}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="smell" fill={COLORS[0]} />
                <Bar dataKey="cleanliness" fill={COLORS[1]} />
                <Bar dataKey="supplies" fill={COLORS[2]} />
                <Bar dataKey="cleaning" fill={COLORS[3]} />
              </BarChart>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
            <div className="w-full overflow-x-auto">
              <BarChart
                width={600}
                height={400}
                data={mockData.monthly}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="smell" fill={COLORS[0]} />
                <Bar dataKey="cleanliness" fill={COLORS[1]} />
                <Bar dataKey="supplies" fill={COLORS[2]} />
                <Bar dataKey="cleaning" fill={COLORS[3]} />
              </BarChart>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}