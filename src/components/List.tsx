"use client";

import { useState, useRef } from "react";
import { TeacherProps } from "@/app/types";

const List = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const xRangeRef = useRef<HTMLInputElement>(null);
  const yRangeRef = useRef<HTMLInputElement>(null);

  const handleChangeRange = () => {
    console.log(xRangeRef.current?.valueAsNumber, yRangeRef.current?.valueAsNumber);
    setX(xRangeRef.current?.valueAsNumber ?? 0);
    setY(yRangeRef.current?.valueAsNumber ?? 0);
  };
  const teachers: TeacherProps[] = [
    {
      id: 1,
      name: "Jane Doe",
      totalRatingValue: 400,
      numberOfVotes: 200,
      subject: "Physics",
      university: "MIT",
      graphX: x,
      graphY: y,
      timestamp: Date.now(),
    },
  ];
  return (
    <div className="bg-gray-200 p-4 flex flex-row gap-4">
      <h1 className="text-2xl font-bold">List</h1>
      {teachers.map((teacher) => (
        <div key={teacher.id} className="h-96 w-64 bg-white p-5">
          <h2 className="text-xl font-bold">{teacher.name}</h2>
          <p>Rating: {(teacher.totalRatingValue / teacher.numberOfVotes).toFixed(1)}☆ </p>
          <p>Number of votes: {teacher.numberOfVotes}</p>
          <p>Subject: {teacher.subject}</p>
          <p>University: {teacher.university}</p>
          <div className="w-full aspect-square bg-gray-200 relative">
            {teacher.graphX !== null && teacher.graphY !== null ? (
              <div
                className="absolute w-2 h-2 bg-red-500 rounded-full"
                style={{ left: `${(teacher.graphX ?? 0) - 2}%`, bottom: `${(teacher.graphY ?? 0) - 2}%` }}
              ></div>
            ) : null}
          </div>
          {teacher.graphX !== null && teacher.graphY !== null ? (
            <p>
              X: {teacher.graphX} Y: {teacher.graphY}
            </p>
          ) : null}
          <input type="range" name="X" ref={xRangeRef} onChange={handleChangeRange} />
          <input type="range" name="Y" ref={yRangeRef} onChange={handleChangeRange} />
        </div>
      ))}
    </div>
  );
};

export default List;
