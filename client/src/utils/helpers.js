import { EmploymentType, exps, ROLE } from "../constants/enum";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import moment from "moment";
const helpers = {
  isJsonString: (data) => {
    try {
      JSON.parse(data);
    } catch (error) {
      return false;
    }
    return true;
  },
  exportToExcel: (data, fileName = "data.xlsx") => {
    if (!data || data.length === 0) {
      console.error("Không có dữ liệu để xuất!");
      return;
    }
  
    // 1. Chuyển dữ liệu JSON thành sheet
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // 2. Thêm style cho header (in đậm + tô màu)
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { patternType: "solid", fgColor: { rgb: "4472C4" } }, // Màu xanh Microsoft
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "B4B4B4" } },
        bottom: { style: "thin", color: { rgb: "B4B4B4" } },
        left: { style: "thin", color: { rgb: "B4B4B4" } },
        right: { style: "thin", color: { rgb: "B4B4B4" } }
      }
    };
  
    // Style cho các ô dữ liệu
    const dataStyle = {
      font: { color: { rgb: "000000" } },
      alignment: { horizontal: "left", vertical: "center", wrapText: true },
      border: {
        top: { style: "thin", color: { rgb: "D9D9D9" } },
        bottom: { style: "thin", color: { rgb: "D9D9D9" } },
        left: { style: "thin", color: { rgb: "D9D9D9" } },
        right: { style: "thin", color: { rgb: "D9D9D9" } }
      }
    };
  
    // Style riêng cho hàng chẵn (tô màu xen kẽ)
    const alternateRowStyle = {
      ...dataStyle,
      fill: { patternType: "solid", fgColor: { rgb: "F2F2F2" } }
    };
  
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    
    // Áp dụng style cho header
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { v: "", t: "s" };
      }
      worksheet[cellAddress].s = headerStyle;
    }
  
    // Áp dụng style cho các ô dữ liệu với hàng chẵn tô màu xen kẽ
    for (let R = range.s.r + 1; R <= range.e.r; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellAddress]) {
          worksheet[cellAddress] = { v: "", t: "s" };
        }
        worksheet[cellAddress].s = R % 2 === 0 ? alternateRowStyle : dataStyle;
      }
    }
  
    // 3. Tự động căn chỉnh cột dựa trên nội dung
    const columnWidths = [];
    for (let C = range.s.c; C <= range.e.c; C++) {
      let maxLength = 10; // Độ rộng tối thiểu
      
      // Lấy độ dài tiêu đề
      const headerCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
      if (headerCell && headerCell.v) {
        maxLength = Math.max(maxLength, String(headerCell.v).length * 1.2);
      }
      
      // Tìm độ dài tối đa cho mỗi cột dựa trên nội dung
      for (let R = range.s.r + 1; R <= range.e.r; R++) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell && cell.v) {
          maxLength = Math.max(maxLength, String(cell.v).length * 1.1);
        }
      }
      
      // Giới hạn độ rộng tối đa
      columnWidths.push({ wch: Math.min(maxLength, 50) });
    }
    
    worksheet["!cols"] = columnWidths;
  
    // Thêm chiều cao cho hàng header
    worksheet["!rows"] = [{ hpt: 25 }]; // Header cao hơn
    
    // 4. Tạo workbook và ghi file
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    // Thêm thuộc tính cho workbook
    workbook.Props = {
      Title: fileName.replace(".xlsx", ""),
      Subject: "Dữ liệu xuất",
      Author: "Hệ thống",
      CreatedDate: new Date()
    };
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array", bookSST: false });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    saveAs(fileData, fileName);
  },
  convertSalary: (min, max) => {
    if (!min && !max) return "Thỏa thuận";
    if (!min && !!max) return `Tối thiểu ${helpers.numberFormat(min)}`;
    if (!!min && !max) return `Lên đến ${helpers.numberFormat(max)}`;
    if (min === max) return helpers.numberFormat(min);

    return `${helpers.numberFormat(min)} - ${helpers.numberFormat(max)}`;
  },
  convertStaffQuantity: (min, max) => {
    if (!min && !max) return "";
    if (!min && !!max) return max;
    if (!!min && !max) return `${min}+`;
    if (min === max) return min;
    return `${min} - ${max}`;
  },
  convertEpmT: (epmT) => {
    if (epmT === EmploymentType.FULL_TIME) {
      return "Toàn thời gian";
    }
    if (epmT === EmploymentType.INTERN) {
      return "Thực tập";
    }
    if (epmT === EmploymentType.PART_TIME) {
      return "Bán thời gian";
    }
  },
  checkExp: (exp) => {
    if (exp === exps.NOT_REQUIRE) {
      return {
        min_experience: "0",
        max_experience: "0",
      };
    }
    if (exp === exps.UNDER_ONE_YEAR) {
      return {
        min_experience: 1,
        max_experience: 11,
      };
    }
    if (exp === exps.ONE_YEAR) {
      return {
        min_experience: 12,
        max_experience: 12,
      };
    }
    if (exp === exps.TWO_YEAR) {
      return {
        min_experience: 12 * 2,
        max_experience: 12 * 2,
      };
    }
    if (exp === exps.THREE_YEAR) {
      return {
        min_experience: 12 * 3,
        max_experience: 12 * 3,
      };
    }
    if (exp === exps.FOUR_YEAR) {
      return {
        min_experience: 12 * 4,
        max_experience: 12 * 4,
      };
    }
    if (exp === exps.FIVE_YEAR) {
      return {
        min_experience: 12 * 5,
        max_experience: 12 * 5,
      };
    }
    if (exp === exps.OVER_FIVE_YEAR) {
      return {
        min_experience: 5 * 12,
        max_experience: null,
      };
    }
  },
  convertTime: (month) => {
    const checkRound = month % 12 === 0;
    const year = month / 12;
    if (!month) {
      return "Không yêu cầu";
    }
    if (checkRound && year > 1) {
      return `${year} năm kinh nghiệm`;
    }
    return month;
  },
  isExpired: (endDate) => {
    return moment().isAfter(moment(endDate));
  },
  exportPdf: async (contentRef, filename = "document.pdf") => {
    if (!contentRef?.current) {
      return;
    }
    const content = contentRef.current;
    try {
      const canvas = await html2canvas(content, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
    }
  },
  convertRole: (role) => {
    if (role === ROLE.ADMIN) {
      return "Quản trị viên";
    }
    if (role === ROLE.CANDIDATE) {
      return "Ứng viên";
    }
    if (role === ROLE.EMPLOYER) {
      return "Nhà tuyển dụng";
    }
  },
  numberFormat: (number) => {
    if (isNaN(number)) return "Invalid number";

    if (number >= 1_000_000_000) {
      const value = number / 1_000_000_000;
      return (
        (value === Math.floor(value) ? value.toFixed(0) : value.toFixed(1)) +
        " tỉ"
      );
    } else if (number >= 1_000_000) {
      const value = number / 1_000_000;
      return (
        (value === Math.floor(value) ? value.toFixed(0) : value.toFixed(1)) +
        " triệu"
      );
    } else if (number >= 1_000) {
      const value = number / 1_000;
      return (
        (value === Math.floor(value) ? value.toFixed(0) : value.toFixed(1)) +
        " nghìn"
      );
    } else {
      return number + " đồng";
    }
  },
  roundNumber: (number) => {
    return Math.floor(number / 1000) * 1000;
  },
  maskEmail: (email) => {
    const [localPart, domain] = email.split("@");

    const firstChar = localPart[0];
    const lastTwoChars = localPart.slice(-2);

    const maskedLocalPart = firstChar + "*********" + lastTwoChars;

    return maskedLocalPart + "@" + domain;
  },
  validatePhoneNumber: (phoneNumber) => {
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
    return phoneRegex.test(phoneNumber);
  },
  sleepTime: (ms) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, ms);
    });
  },
};
export default helpers;
