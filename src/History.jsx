import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

const History = ({ time, distance, percent }) => {
  const historyRef = useRef([]);
  if (distance !== null) {
    historyRef.current.unshift({
      time,
      distance,
      percent,
      id: nanoid(),
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
          <tr key={h.id}>
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
