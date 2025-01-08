import React from "react";

const cvModel = {
  profile: {
    name: "Đức Long Nguyễn",
    email: "duong.work23@gmail.com",
    phone_number: "0123.456.789",
    address: "Quận A, thành phố Hà Nội",
  },
  objective: "Phấn đấu trở thành chuyên gia trong lĩnh vực lập trình và phát triển phần mềm, không ngừng học hỏi và nâng cao kỹ năng, đóng góp cho sự phát triển của công ty.",
  work_experiences: [
    {
      company: "Công ty TNHH Công Nghệ ABC",
      from_date: "01/2020",
      to_date: "12/2022",
      position: "Lập trình viên Fullstack",
      experience_des: "Tham gia phát triển và bảo trì hệ thống quản lý nội bộ, cải thiện hiệu suất của ứng dụng và tối ưu hóa giao diện người dùng.",
    },
  ],
  projects: [
    {
      project_name: "Hệ thống quản lý tài liệu",
      from_date: "03/2021",
      to_date: "11/2021",
      customer_name: "Công ty XYZ",
      team_size: "5",
      position_project: "Backend Developer",
      tecnology_des: "Sử dụng Node.js, Express.js, MongoDB và Docker trong quá trình phát triển backend cho hệ thống quản lý tài liệu.",
    },
  ],
  education: [
    {
      school_name: "Đại học Bách Khoa Hà Nội",
      from_date: "09/2016",
      to_date: "06/2020",
      courses: "Kỹ thuật phần mềm",
      education_des: "Hoàn thành chương trình cử nhân với chuyên ngành kỹ thuật phần mềm, tham gia nhiều dự án nhóm và đạt thành tích xuất sắc.",
    },
  ],
  skills: [
    {
      skill_name: "Lập trình Fullstack",
      skill_des: "Thành thạo JavaScript, Node.js, Express.js, React, và MongoDB.",
    },
  ],
  interests: "Thích đọc sách công nghệ, chơi cờ vua, và tham gia các câu lạc bộ lập trình.",
  references: [
    {
      references_des: "Nguyễn Văn A - Quản lý dự án tại Công ty TNHH Công Nghệ ABC - 0123.456.789",
    },
  ],
  activities: [
    {
      organization_name: "Câu lạc bộ lập trình Đại học Bách Khoa",
      from_date: "09/2017",
      to_date: "06/2020",
      position: "Trưởng nhóm kỹ thuật",
      activity_des: "Tổ chức các buổi chia sẻ kiến thức, giám sát và hỗ trợ các dự án của câu lạc bộ.",
    },
  ],
  certifications: [
    {
      time: "03/2020",
      certification_name: "Chứng chỉ Lập trình viên Quốc tế",
    },
  ],
  honors_awards: [
    {
      time: "05/2020",
      award_name: "Giải nhất cuộc thi lập trình cấp trường",
    },
  ],
  additional_information: [
    "Có thể làm việc dưới áp lực cao, kỹ năng giao tiếp tốt, và luôn chủ động học hỏi kiến thức mới."
  ],
};

const CVModel1 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">{cvModel.profile.name}</h1>
          <p className="text-gray-700 font-semibold">Vị trí ứng tuyển</p>
        </div>
        <div className="flex flex-col items-start text-gray-600 gap-y-1 border-l-4 border-blue-800 px-4">
          <span>{cvModel.profile.phone_number}</span>
          <span>{cvModel.profile.email}</span>
          <span>{cvModel.profile.address}</span>
        </div>  
      </div>

      {/* Objective */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Mục tiêu nghề nghiệp</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        <p className="text-gray-700">{cvModel.objective}</p>
      </section>

      {/* Work Experiences */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Kinh nghiệm làm việc</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        {cvModel.work_experiences.map((exp, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm mb-4 bg-white">
            <p className="font-semibold text-blue-700">{exp.company}</p>
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
        <h2 className="text-lg font-bold text-blue-800">Dự án</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        {cvModel.projects.map((project, index) => (
          <div key={index} className="border-2 border-blue-200 p-4 rounded-md shadow-sm mb-4">
            <p className="font-semibold text-blue-700">{project.project_name}</p>
            <p className="text-gray-600">
              {project.from_date} - {project.to_date}
            </p>
            <p>Khách hàng: {project.customer_name}</p>
            <p>Số lượng người tham gia: {project.team_size}</p>
            <p>Vị trí: {project.position_project}</p>
            <p className="italic text-gray-700">Công nghệ: {project.tecnology_des}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Học vấn</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        {cvModel.education.map((edu, index) => (
          <div key={index} className="bg-white p-4 shadow-sm mb-4 rounded-md">
            <p className="font-semibold text-blue-700">{edu.school_name}</p>
            <p>{edu.from_date} - {edu.to_date}</p>
            <p>{edu.courses}</p>
            <p>{edu.education_des}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Các kỹ năng</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        {cvModel.skills.map((skill, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{skill.skill_name}</p>
            <p>{skill.skill_des}</p>
          </div>
        ))}
      </section>

      {/* Honors & Awards */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Danh hiệu và giải thưởng</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        {cvModel.honors_awards.map((award, index) => (
          <div key={index} className="mb-2">
            <p>{award.time}</p>
            <p>{award.award_name}</p>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Chứng chỉ</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        {cvModel.certifications.map((cert, index) => (
          <div key={index} className="mb-2">
            <p>{cert.time}</p>
            <p>{cert.certification_name}</p>
          </div>
        ))}
      </section>
      
      {/* Interests */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-blue-800">Sở thích</h2>
        <hr className="border-t-2 border-blue-800 my-2" />
        <p>{cvModel.interests}</p>
      </section>
    </div>
  );
};

export default CVModel1;
