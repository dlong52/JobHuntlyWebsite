import { EmploymentType, exps, ROLE } from "../constants/enum";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
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
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

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
  exportPdf: async (contentRef, filename = "document.pdf") => {
    if (!contentRef?.current) return;

    const content = contentRef.current;

    try {
      const canvas = await html2canvas(content);
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
