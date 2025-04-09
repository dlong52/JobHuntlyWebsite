const Invoice = (invoice, companyName = "JobHuntly") => {
    // Trích xuất dữ liệu từ đối tượng invoice
    const { _id, user_id, subscription_id, amount, payment_method, transaction_id, status, created_at } = invoice
  
    // Định dạng ngày tháng
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
    }
  
    // Định dạng số tiền
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN").format(amount)
    }
  
    // Tạo mã hóa đơn
    const invoiceNumber = `INV-${_id}`
  
    // Thông tin khách hàng
    const customerName = user_id?.profile?.name || ''
    const customerEmail = user_id?.email || ''
    const customerPhone = user_id?.profile.phone_number || ''
    const customerCompany = user_id?.company?.name || ''
    const customerAvatar = user_id?.profile.avatar_url || ''
  
    // Thông tin gói dịch vụ
    const packageName = subscription_id?.package_id?.name || ''
    const packageDescription = subscription_id?.package_id.introduce    || ''
    const packagePrice = subscription_id?.package_id.price  || 0
    const packageJobLimit = subscription_id?.package_id.job_post_limit  || 0
    const packageDuration = subscription_id?.package_id.duration_in_days    || 0
  
    // Thông tin thời hạn
    const startDate = formatDate(subscription_id?.start_date) || ""
    const endDate = formatDate(subscription_id?.end_date) || ""
  
    // Thông tin thanh toán
    const paymentDate = formatDate(created_at) || ""
    const paymentMethod = payment_method || ""
    const paymentStatus = status === "success" ? "Thành công" : "Thất bại" || ""
    const statusClass = status === "success" ? "status-success" : "status-failed" || ""
  
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          body {
              background-color: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
          }
          
          .invoice-container {
              background-color: white;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              width: 100%;
              max-width: 800px;
              padding: 40px;
          }
          
          .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
          }
          
          .logo-container {
              display: flex;
              align-items: center;
          }
          
          .logo {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              object-fit: cover;
              margin-right: 15px;
          }
          
          .company-name {
              font-size: 24px;
              font-weight: 700;
              color: #333;
          }
          
          .invoice-title {
              text-align: right;
          }
          
          .invoice-title h1 {
              font-size: 28px;
              color: #2563eb;
              margin-bottom: 5px;
          }
          
          .invoice-number {
              color: #666;
              font-size: 14px;
          }
          
          .invoice-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
          }
          
          .client-details, .payment-details {
              flex: 1;
          }
          
          .client-details {
              padding-right: 20px;
          }
          
          .payment-details {
              padding-left: 20px;
              border-left: 1px solid #eee;
          }
          
          .detail-title {
              font-weight: 600;
              color: #666;
              margin-bottom: 15px;
              font-size: 16px;
          }
          
          .detail-item {
              margin-bottom: 8px;
              display: flex;
          }
          
          .detail-label {
              width: 140px;
              color: #666;
              font-size: 14px;
          }
          
          .detail-value {
              font-weight: 500;
              color: #333;
              font-size: 14px;
          }
          
          .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
          }
          
          .invoice-table th {
              background-color: #f8f9fa;
              padding: 12px 15px;
              text-align: left;
              font-weight: 600;
              color: #555;
              font-size: 14px;
              border-bottom: 1px solid #eee;
          }
          
          .invoice-table td {
              padding: 15px;
              border-bottom: 1px solid #eee;
              color: #333;
              font-size: 14px;
          }
          
          .invoice-table .description {
              width: 50%;
          }
          
          .invoice-total {
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
          }
          
          .total-container {
              width: 300px;
          }
          
          .total-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
          }
          
          .total-row.final {
              border-bottom: none;
              font-weight: 700;
              font-size: 18px;
              color: #2563eb;
              padding-top: 15px;
          }
          
          .status-badge {
              display: inline-block;
              padding: 5px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
          }
          
          .status-success {
              background-color: #dcfce7;
              color: #166534;
          }
          
          .status-failed {
              background-color: #fee2e2;
              color: #b91c1c;
          }
          
          .invoice-footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #eee;
              padding-top: 20px;
          }
          
          @media (max-width: 768px) {
              .invoice-container {
                  padding: 20px;
              }
              
              .invoice-header, .invoice-details {
                  flex-direction: column;
              }
              
              .invoice-title {
                  text-align: left;
                  margin-top: 20px;
              }
              
              .payment-details {
                  border-left: none;
                  padding-left: 0;
                  margin-top: 20px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
              }
              
              .client-details {
                  padding-right: 0;
              }
          }
      </style>
  </head>
  <body>
      <div class="invoice-container">
          <div class="invoice-header">
              <div class="logo-container">
                  <img src="${customerAvatar}" alt="Company Logo" class="logo">
                  <div class="company-name">${companyName = "JobHuntly"}</div>
              </div>
              <div class="invoice-title">
                  <h1>HÓA ĐƠN</h1>
                  <div class="invoice-number">Mã hóa đơn: ${invoiceNumber}</div>
              </div>
          </div>
          
          <div class="invoice-details">
              <div class="client-details">
                  <div class="detail-title">Thông tin khách hàng</div>
                  <div class="detail-item">
                      <div class="detail-label">Tên:</div>
                      <div class="detail-value">${customerName}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Email:</div>
                      <div class="detail-value">${customerEmail}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Số điện thoại:</div>
                      <div class="detail-value">${customerPhone}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Công ty:</div>
                      <div class="detail-value">${customerCompany}</div>
                  </div>
              </div>
              
              <div class="payment-details">
                  <div class="detail-title">Thông tin thanh toán</div>
                  <div class="detail-item">
                      <div class="detail-label">Ngày thanh toán:</div>
                      <div class="detail-value">${paymentDate}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Phương thức:</div>
                      <div class="detail-value">${paymentMethod}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Mã giao dịch:</div>
                      <div class="detail-value">${transaction_id}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Trạng thái:</div>
                      <div class="detail-value">
                          <span class="status-badge ${statusClass}">${paymentStatus}</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <table class="invoice-table">
              <thead>
                  <tr>
                      <th>Gói dịch vụ</th>
                      <th>Thời hạn</th>
                      <th>Số lượng tin</th>
                      <th>Đơn giá</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="description">
                          <strong>${packageName}</strong><br>
                          ${packageDescription}
                      </td>
                      <td>${startDate} - ${endDate}<br>(${packageDuration} ngày)</td>
                      <td>${packageJobLimit} tin</td>
                      <td>${formatCurrency(packagePrice)} VND</td>
                  </tr>
              </tbody>
          </table>
          
          <div class="invoice-total">
              <div class="total-container">
                  <div class="total-row">
                      <div>Tạm tính:</div>
                      <div>${formatCurrency(amount)} VND</div>
                  </div>
                  <div class="total-row">
                      <div>Giảm giá:</div>
                      <div>0 VND</div>
                  </div>
                  <div class="total-row final">
                      <div>Tổng cộng:</div>
                      <div>${formatCurrency(amount)} VND</div>
                  </div>
              </div>
          </div>
          
          <div class="invoice-footer">
              <p>Cảm ơn bạn đã sử dụng dịch vụ của ${companyName}!</p>
              <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email: support@jobhuntly.com</p>
          </div>
      </div>
  </body>
  </html>
    `
  }
  
  module.exports = Invoice
  