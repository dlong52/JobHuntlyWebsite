import React from "react";
import { EmploymentGrowthChart, JobBarChart } from "../Charts/index";
import moment from "moment";
const JobTrending = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-[#25324B] to-primary rounded-md overflow-hidden">
      <div className="text-white font-bold text-[25px] px-6 py-3 bg-gradient-to-r from-[#25324B] to-blue-800 ">
        Thị trường làm việc hôm nay{" "}
        <span className="text-blue-500">{moment().format("DD/MM/YYYY")}</span>
      </div>
      <div className="grid grid-cols-12 p-6 gap-8">
        <div className="col-span-6 rounded-md">
          <EmploymentGrowthChart />
        </div>
        <div className="col-span-6 rounded-md">
          <JobBarChart />
        </div>
      </div>
    </div>
  );
};

export default JobTrending;
