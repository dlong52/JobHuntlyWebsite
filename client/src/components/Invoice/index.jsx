import React from "react";

const Invoice = ({ payment }) => {
  if (!payment) {
    return <p className="text-center text-gray-500">Không có dữ liệu thanh toán.</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-bold text-center mb-4">Hóa đơn thanh toán</h2>
      
      {/* Thông tin Người dùng */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Người dùng:</p>
        <p className="text-gray-900">{payment.user?.profile?.name || "N/A"}</p>
      </div>

      {/* Gói đăng ký */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Gói đăng ký:</p>
        <p className="text-gray-900">{payment.subscription?.package_id?.name || "Không rõ"}</p>
      </div>

      {/* Thời gian đăng ký */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Thời gian:</p>
        <p className="text-gray-900">
          {new Date(payment.subscription?.start_date).toLocaleDateString()} -{" "}
          {new Date(payment.subscription?.end_date).toLocaleDateString()}
        </p>
      </div>

      {/* Số tiền thanh toán */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Số tiền:</p>
        <p className="text-green-600 font-bold text-lg">{payment.amount.toLocaleString()} VNĐ</p>
      </div>

      {/* Phương thức thanh toán */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Phương thức:</p>
        <p className="text-gray-900">{payment.payment_method}</p>
      </div>

      {/* Trạng thái thanh toán */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Trạng thái:</p>
        <span
          className={`px-3 py-1 rounded-md text-white text-sm ${
            payment.status === "success" ? "bg-green-500" :
            payment.status === "pending" ? "bg-yellow-500" : "bg-red-500"
          }`}
        >
          {payment.status.toUpperCase()}
        </span>
      </div>

      {/* Mã giao dịch */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Mã giao dịch:</p>
        <p className="text-gray-900">{payment.transaction_id}</p>
      </div>

      {/* Ngày tạo */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">Ngày tạo:</p>
        <p className="text-gray-900">{new Date(payment.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Invoice;
