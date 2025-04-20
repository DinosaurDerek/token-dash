/** @jsxImportSource @emotion/react */
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import dayjs from "dayjs";

export default function TokenChart({ data }) {
  // Memoize transformed chart data for performance
  const chartData = useMemo(
    () =>
      data.map(({ timestamp, price }) => ({
        timestamp,
        time: dayjs(timestamp).format("MMM D"),
        price,
      })),
    [data]
  );
  // Filter to show each day only once on the X-axis
  const ticks = useMemo(() => {
    const seenDays = new Set();
    return data
      .filter(({ timestamp }) => {
        const day = dayjs(timestamp).format("MMM D");
        if (seenDays.has(day)) return false;
        seenDays.add(day);
        return true;
      })
      .map(({ timestamp }) => dayjs(timestamp).format("MMM D"));
  }, [data]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="time" ticks={ticks.slice(1)} />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(val) => `$${val.toFixed(0)}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              const dataPoint = payload?.[0]?.payload;

              if (!active || !dataPoint) return null;

              const dateAndTime = dayjs(dataPoint.timestamp).format(
                "MMM D, h:mm A"
              );

              return (
                <div css={styles.tooltip}>
                  <div>
                    <strong>{dateAndTime || label}</strong>
                  </div>
                  <div>Price: ${dataPoint.price.toFixed(2)}</div>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  tooltip: {
    background: "#1f2937",
    color: "#f9fafb",
    padding: "8px 12px",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    fontSize: 12,
  },
};
