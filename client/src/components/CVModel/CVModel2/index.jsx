import React from "react";
import { cvModel } from "../../../mocs/cvModel";
import HtmlContent from "../../../ui/HtmlContent";

const CVModel2 = ({values}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-red-800">
            {values?.profile.name}
          </h1>
          <p className="text-gray-700 font-semibold">{values?.position}</p>
        </div>
        <div className="flex flex-col items-start text-gray-600 gap-y-1 border-l-4 border-red-800 px-4">
          <span>{values?.profile.phone_number}</span>
          <span>{values?.profile.email}</span>
          <span>{values?.profile.address}</span>
        </div>
      </div>

      {/* Objective */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">
          Mục tiêu nghề nghiệp
        </h2>
        <hr className="border-t-2 border-red-800 my-2" />
        <p className="text-gray-700">{values?.objective}</p>
      </section>

      {/* Work Experiences */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">
          Kinh nghiệm làm việc
        </h2>
        <hr className="border-t-2 border-red-800 my-2" />
        {values?.work_experiences.map((exp, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-sm mb-4 bg-white"
          >
            <p className="font-semibold text-red-700">{exp.company}</p>
            <p className="text-gray-600">
              {exp.from_date} - {exp.to_date}
            </p>
            <p className="text-gray-700">{exp.position}</p>
            <p>{exp.experience_des}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">Dự án</h2>
        <hr className="border-t-2 border-red-800 my-2" />
        {values?.projects.map((project, index) => (
          <div
            key={index}
            className="border-2 border-red-200 p-4 rounded-md shadow-sm mb-4"
          >
            <p className="font-semibold text-red-700">
              {project.project_name}
            </p>
            <p className="text-gray-600">
              {project.from_date} - {project.to_date}
            </p>
            <p>Khách hàng: {project.customer_name}</p>
            <p>Số lượng người tham gia: {project.team_size}</p>
            <p>Vị trí: {project.position_project}</p>
            <p className="italic text-gray-700">
              Công nghệ: {project.technology_des}
            </p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">Học vấn</h2>
        <hr className="border-t-2 border-red-800 my-2" />
        {values?.education.map((edu, index) => (
          <div key={index} className="bg-white p-4 shadow-sm mb-4 rounded-md">
            <p className="font-semibold text-red-700">{edu.school_name}</p>
            <p>
              {edu.from_date} - {edu.to_date}
            </p>
            <p>{edu.courses}</p>
            <p>{edu.education_des}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">Các kỹ năng</h2>
        <hr className="border-t-2 border-red-800 my-2" />
        {values?.skills.map((skill, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{skill.skill_name}</p>
            <p>{skill.skill_des}</p>
          </div>
        ))}
      </section>

      {/* Honors & Awards */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">
          Danh hiệu và giải thưởng
        </h2>
        <hr className="border-t-2 border-red-800 my-2" />
        {values?.honors_awards.map((award, index) => (
          <div key={index} className="mb-2">
            <p>{award.time}</p>
            <p>{award.award_name}</p>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">Chứng chỉ</h2>
        <hr className="border-t-2 border-red-800 my-2" />
        {values?.certifications.map((cert, index) => (
          <div key={index} className="mb-2">
            <p>{cert.time}</p>
            <p>{cert.certification_name}</p>
          </div>
        ))}
      </section>

      {/* Interests */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-red-800">Sở thích</h2>
        <hr className="border-t-2 border-red-800 my-2" />
        <HtmlContent string={values?.interests}/>
        {/* <p>{values?.interests}</p> */}
      </section>
    </div>
  );
};

export default CVModel2;
