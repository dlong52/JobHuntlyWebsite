import React from "react";
import { EmploymentGrowthChart, JobBarChart } from "../Charts/index";
const JobTrending = () => {
  const jobGrowthData = [
    { date: "2024-10-01", jobs: 120 },
    { date: "2024-10-02", jobs: 130 },
    { date: "2024-10-03", jobs: 125 },
    { date: "2024-10-04", jobs: 140 },
    { date: "2024-10-05", jobs: 145 },
    { date: "2024-10-06", jobs: 150 },
    { date: "2024-10-07", jobs: 160 },
    { date: "2024-10-08", jobs: 170 },
    { date: "2024-10-09", jobs: 175 },
    { date: "2024-10-10", jobs: 180 },
  ];
  return (
    <div className="mt-8 bg-gradient-to-r from-[#25324B] to-[#4640DE] rounded-md overflow-hidden">
      <div className="text-white font-bold text-[25px] px-6 py-3 bg-gradient-to-r from-[#25324B] to-blue-800 ">
        Thị trường làm việc hôm nay{" "}
        <span className="text-blue-500">12/10/2024</span>
      </div>
      <div className="grid grid-cols-12 p-6 gap-8">
        <div className="col-span-6 rounded-md">
          <EmploymentGrowthChart data={jobGrowthData} />
        </div>
        <div className="col-span-6 rounded-md">
          <JobBarChart />
        </div>
      </div>
    </div>
  );
};

export default JobTrending;
