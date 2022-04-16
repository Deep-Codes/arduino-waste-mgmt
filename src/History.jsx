import React, { useState, useRef } from 'react';

const History = ({ time, distance, percent }) => {
  const historyRef = useRef([]);
  if (distance !== null) {
    historyRef.current.push({
      time,
      distance,
      percent,
    });
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Percent</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>
        {historyRef.current.map((h, i) => (
          <tr key={h.time}>
            <td>{h.time}</td>
            <td>{h.percent.toFixed(2)}%</td>
            <td>{h.distance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default History;
