
import React from "react";
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter = (value) => `${value}`,
  className,
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="font-medium">{label}</div>
                    {payload.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {categories[index]}:
                          </span>
                        </div>
                        <div className="text-sm font-medium">
                          {valueFormatter(item.value as number)}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
