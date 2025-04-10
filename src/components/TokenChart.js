"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TokenChart({ data }) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="symbol" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="current_price" fill="#00c2ff" name="Price (USD)" />
          <Bar
            dataKey="price_change_percentage_24h"
            fill="#e6007a"
            name="24h Change (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
