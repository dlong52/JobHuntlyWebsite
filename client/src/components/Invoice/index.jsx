import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Logo from "../Logo";
import { logo } from "../../assets/images";
import { Button } from "../../ui";

const Invoice = ({ payment }) => {
  const invoiceRef = useRef();

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  // Lấy dữ liệu người dùng và gói đăng ký từ payment
  const {
    user_id,
    subscription_id,
    amount,
    payment_method,
    transaction_id,
    status,
    created_at,
  } = payment;
  const { profile } = user_id;
  const { package_id } = subscription_id;

  // Tính thuế, chiết khấu và tổng tiền
  const subTotal = amount;
  const taxRate = 0.1; // 10%
  const discountRate = package_id.discount / 100; // Chuyển % thành số thập phân
  const tax = subTotal * taxRate;
  const discount = subTotal * discountRate;
  const total = subTotal + tax - discount;

  // Tạo số hóa đơn
  const invoiceNumber = `#${transaction_id}${new Date(created_at)
    .getTime()
    .toString()
    .slice(-5)}`;

  // Hàm xuất PDF cải tiến với xử lý trang tốt hơn
  const exportPdf = async (filename = "hoadon.pdf") => {
    if (!invoiceRef?.current) {
      return;
    }

    try {
      // Tạo PDF với kích thước Letter
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter", // 215.9mm x 279.4mm
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // margin 10mm
      const contentWidth = pageWidth - margin * 2;

      // Chia hóa đơn thành các phần nhỏ để xử lý tốt hơn
      const sections = [
        document.querySelector("#invoice-header"),
        document.querySelector("#invoice-info"),
        document.querySelector("#invoice-order-details"),
        document.querySelector("#invoice-table"),
        document.querySelector("#invoice-summary"),
        document.querySelector("#invoice-terms"),
      ];

      let yPosition = margin;
      let isFirstSection = true;

      // Xử lý từng phần một
      for (const section of sections) {
        if (!section) continue;

        const canvas = await html2canvas(section, {
          useCORS: true,
          scale: 2,
          logging: false,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        // Kiểm tra nếu section không vừa với trang hiện tại, thêm trang mới
        if (!isFirstSection && yPosition + imgHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        // Thêm hình ảnh section vào PDF
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          yPosition,
          contentWidth,
          imgHeight
        );
        yPosition += imgHeight + 5; // thêm 5mm khoảng cách giữa các phần
        isFirstSection = false;
      }

      pdf.save(filename);
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
    }
  };

  // Xử lý khi nhấn nút xuất PDF
  const handleExportPdf = () => {
    exportPdf(`Hoadon_${transaction_id}.pdf`);
  };

  return (
    <div className="bg-white text-neutrals-100">
      <div
        id="invoice-container"
        ref={invoiceRef}
        className="border overflow-hidden rounded-md bg-white"
      >
        {/* Header */}
        <div
          id="invoice-header"
          className="flex justify-between items-center border-b p-4"
        >
          <h1 className="text-lg font-semibold text-gray-800">
            Hóa đơn {invoiceNumber}
          </h1>
          <img src={logo} alt="" />
        </div>

        {/* Thông tin công ty và khách hàng */}
        <div
          id="invoice-info"
          className="grid grid-cols-1 mt-5 px-4 md:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-3 text-[16px]">
              Công ty TNHH JobHuntly
            </h2>
            <div className="space-y-1 text-bg-neutrals-80">
              <p>Kim Giang, Dai Kim, Hoang Mai, Ha Noi, Viet Nam</p>
              <p className="flex items-center">
                <span className="font-medium mr-2 text-neutrals-100">
                  Email:
                </span>{" "}
                jobhuntly@company.com
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2 text-neutrals-100">SĐT:</span>{" "}
                (+84) 344 461 8185
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-3 text-[16px]">Khách Hàng</h2>
            <div className="space-y-1 text-bg-neutrals-80">
              <p className="font-medium text-neutrals-100">{profile.name}</p>
              <p>1063 Mandian Road, Columbia MO,</p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Email:</span> {user_id.email}
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">SĐT:</span>{" "}
                {profile.phone_number}
              </p>
            </div>
          </div>
        </div>

        {/* Chi tiết đơn hàng */}
        <div id="invoice-order-details" className="mb-8 p-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-bold text-gray-700 mb-3 text-lg">
              Chi Tiết Đơn Hàng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Ngày đặt hàng</p>
                <p className="font-medium">{formatDate(created_at)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Mã đơn hàng</p>
                <p className="font-medium">#{transaction_id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Trạng thái</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {status === "success" ? "Đã thanh toán" : status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bảng chi tiết các mục */}
        <div id="invoice-table" className="mb-8 p-4">
          <table className="w-full border rounded-md">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-3 text-nowrap text-left text-gray-600 text-sm font-medium">
                  Mô tả
                </th>
                <th className="p-3 text-nowrap text-right text-gray-600 text-sm font-medium">
                  Số lượng
                </th>
                <th className="p-3 text-nowrap text-right text-gray-600 text-sm font-medium">
                  Đơn giá
                </th>
                <th className="p-3 text-nowrap text-right text-gray-600 text-sm font-medium">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">
                  <div className="font-medium">Gói {package_id.name}</div>
                  <div className="text-sm text-gray-500">
                    {package_id.introduce}
                  </div>
                </td>
                <td className="p-3 text-right">1</td>
                <td className="p-3 text-right">
                  {amount.toLocaleString()} VNĐ
                </td>
                <td className="p-3 text-right font-medium">
                  {amount.toLocaleString()} VNĐ
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <div className="font-medium">
                    Tín dụng đăng tin tuyển dụng
                  </div>
                  <div className="text-sm text-gray-500">
                    Số tin đăng tuyển dụng có trong gói
                  </div>
                </td>
                <td className="p-3 text-right">{package_id.job_post_limit}</td>
                <td className="p-3 text-right">-</td>
                <td className="p-3 text-right text-gray-500 italic">
                  Đã bao gồm
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <div className="font-medium">Thời hạn đăng ký</div>
                  <div className="text-sm text-gray-500">
                    Có hiệu lực từ {formatDate(subscription_id.start_date)} đến{" "}
                    {formatDate(subscription_id.end_date)}
                  </div>
                </td>
                <td className="p-3 text-right">
                  {package_id.duration_in_days} ngày
                </td>
                <td className="p-3 text-right">-</td>
                <td className="p-3 text-right text-gray-500 italic">
                  Đã bao gồm
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tổng kết */}
        <div id="invoice-summary" className="flex justify-end mb-8">
          <div className="w-72 bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Tạm tính:</span>
              <span>{subTotal.toLocaleString()} VNĐ</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Thuế (10%):</span>
              <span>{tax.toLocaleString()} VNĐ</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Giảm giá ({package_id.discount}%):</span>
              <span>
                -{((amount * package_id.discount) / 100).toLocaleString()} VNĐ
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 text-blue-600">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString()} VNĐ</span>
            </div>
          </div>
        </div>

        {/* Điều khoản và điều kiện */}
        <div id="invoice-terms" className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-2">
            Điều Khoản và Điều Kiện:
          </h3>
          <p className="text-gray-600">
            Thanh toán cho dịch vụ đã cung cấp phải được thực hiện trong vòng 14
            ngày kể từ ngày xuất hóa đơn. Thanh toán trễ có thể phát sinh thêm
            phí. Tất cả các gói đăng ký đều tuân theo điều khoản dịch vụ của
            chúng tôi có trên trang web.
          </p>
        </div>
      </div>

      {/* Nút xuất PDF */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleExportPdf}
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          }
          className={"!bg-primary !text-white !normal-case !px-8 !py-3"}
        >
          Xuất PDF
        </Button>
      </div>
    </div>
  );
};

export default Invoice;
