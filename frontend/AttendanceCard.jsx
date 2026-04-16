import React from "react";

export default function AttendanceCard({ title, value }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <h2>{value}</h2>
    </div>
  );
}