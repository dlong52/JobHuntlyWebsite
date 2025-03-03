import { CommonIcon } from "../../../ui";
import React, { forwardRef } from "react";
const CVModel1 = forwardRef(({ values, show = true }, ref) => {
  return (
    <div
      ref={ref}
      className={`${
        show ? "" : "absolute left-[-999999999999999px]"
      } flex flex-col md:flex-row max-w-6xl mx-auto bg-white shadow-lg`}
    >
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 bg-[#e6f7fa] p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#00b8d4]">Nguyễn Mai Anh</h1>
          <p className="text-gray-700">Quản Lý Phòng Hành Chính</p>

          <div className="mt-4 flex justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-[#00b8d4] overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern_6_v2-zmd6EEoc3DVIqg5c2XPTYafNsqzacH.webp"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#00b8d4] mb-4">
            Thông tin cá nhân
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CommonIcon.CalendarMonth className="w-5 h-5 text-[#00b8d4]" />
              <span>13/06/1997</span>
            </li>
            <li className="flex items-center gap-2">
              <CommonIcon.Person className="w-5 h-5 text-[#00b8d4]" />
              <span>Nữ</span>
            </li>
            <li className="flex items-center gap-2">
              <CommonIcon.Phone className="w-5 h-5 text-[#00b8d4]" />
              <span>(024) 6680 5588</span>
            </li>
            <li className="flex items-center gap-2">
              <CommonIcon.Email className="w-5 h-5 text-[#00b8d4]" />
              <span>hotro@topcv.vn</span>
            </li>
            <li className="flex items-center gap-2">
              <CommonIcon.East className="w-5 h-5 text-[#00b8d4]" />
              <span>be.net/trungus</span>
            </li>
            <li className="flex items-center gap-2">
              <CommonIcon.Map className="w-5 h-5 text-[#00b8d4]" />
              <span>Quận A, Hà Nội</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#00b8d4] mb-4">Các kỹ năng</h2>
          <ul className="space-y-2">
            <li className="py-1.5 px-1 hover:bg-[#d0f0f7] transition-colors">
              Điều hành và phân công nhiệm vụ
            </li>
            <li className="py-1.5 px-1 hover:bg-[#d0f0f7] transition-colors">
              Kiểm soát chi phí hành chính
            </li>
            <li className="py-1.5 px-1 hover:bg-[#d0f0f7] transition-colors">
              Mua sắm trang thiết bị đúng yêu cầu
            </li>
            <li className="py-1.5 px-1 hover:bg-[#d0f0f7] transition-colors">
              Làm việc với nhiều nhà cung cấp
            </li>
            <li className="py-1.5 px-1 hover:bg-[#d0f0f7] transition-colors">
              Làm việc với cơ quan ban ngành nhà nước
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#00b8d4] mb-4">Sở thích</h2>
          <p className="text-gray-700">
            Teambuilding, tham gia các câu lạc bộ, ca hát, văn nghệ, chơi thể
            thao
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#00b8d4] mb-3">
            Mục tiêu nghề nghiệp
          </h2>
          <div className="border-b-2 border-[#00b8d4] mb-4"></div>
          <p className="text-gray-700">
            8 năm thực hiện các công việc hỗ trợ khách hàng và các phòng ban
            trong công ty tại Công ty A và công ty B. Là người có thế mạnh về
            nghiệp vụ hành chính, xây dựng mối quan hệ tốt với nhà cung cấp và
            các cơ quan ban ngày, có năng lực lãnh đạo và quản lý đội nhóm tốt.
            Mong muốn ứng tuyển vị trí Quản lý phòng hành chính để nâng cao chất
            lượng hoạt động nội bộ của công ty.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#00b8d4] mb-3">Học vấn</h2>
          <div className="border-b-2 border-[#00b8d4] mb-4"></div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Gitiho</h3>
              <span className="text-gray-500">2021 - 2021</span>
            </div>
            <p>Khoá học Kỹ năng hành chính nhân sự</p>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Đại học TopCV</h3>
              <span className="text-gray-500">2010 - 2013</span>
            </div>
            <p>Chuyên ngành Quản trị Kinh Doanh</p>
            <p>Tốt nghiệp loại Giỏi</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#00b8d4] mb-3">
            Kinh nghiệm làm việc
          </h2>
          <div className="border-b-2 border-[#00b8d4] mb-4"></div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Trưởng Nhóm Chăm Sóc Khách Hàng
              </h3>
              <span className="text-gray-500">08/2016 - 08/2022</span>
            </div>
            <p className="text-gray-600 mb-2">Công ty ABC</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>
                Quản trị và tối ưu chu trình trải nghiệm của khách hàng (từ đầu
                đến cuối chu trình)
              </li>
              <li>
                Tiếp nhận sự cố về các lỗi vận hành từ khách hàng và nội bộ
              </li>
              <li>Đảm bảo các bộ phận cải thiện sự cố</li>
              <li>
                Lan tỏa và lôi cuốn các bộ phận nội bộ tối ưu trải nghiệm khách
                hàng
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Trợ Lý Giám Sát Nhận Hàng
              </h3>
              <span className="text-gray-500">08/2014 - 07/2016</span>
            </div>
            <p className="text-gray-600 mb-2">Công ty BCD</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>
                Hỗ trợ cho Giám Sát Bộ Phận điều hành toàn bộ hoạt động nhận
                hàng và chịu trách nhiệm về tính chính xác của số lượng lẫn chất
                lượng hàng nhận đúng theo mục tiêu kinh doanh
              </li>
              <li>Triển khai và đảm bảo việc nhận hàng theo đúng qui trình.</li>
              <li>
                Quản lý kho hàng đủ và đúng số lượng, chất lượng lẫn sự sắp xếp
                hợp lý.
              </li>
              <li>Sắp xếp và điều động nhân sự một cách hiệu quả.</li>
              <li>
                Đào tạo và phát triển nhân sự đáp ứng theo yêu cầu công việc.
              </li>
              <li>
                Hỗ trợ các ngành hàng và các bộ phận khác trong việc quản lý và
                luân chuyển hàng hóa.
              </li>
              <li>Chuyển và nhận hàng nội bộ giữa các kho đúng qui định.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CVModel1;
