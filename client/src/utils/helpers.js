import { ROLE } from "../constants/enum";

const helpers = {
  isJsonString: (data) => {
    try {
      JSON.parse(data);
    } catch (error) {
      return false;
    }
    return true;
  },
  convertSalary: (min, max) => {
    if (isNaN(min) || isNaN(max)) return "Invalid salary";

    if (min === max) {
      return helpers.numberFormat(min); // Nếu min = max, chỉ hiển thị 1 giá trị
    }

    return `${helpers.numberFormat(min)} - ${helpers.numberFormat(max)}`;
},

  convertTime: (month) => {
    const checkRound = month % 12 === 0;
    const year = month / 12;
    if (checkRound && year > 1) {
      return `${year} năm kinh nghiệm`;
    }
    return month;
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
        (value === Math.floor(value) ? value.toFixed(0) : value.toFixed(2)) +
        " tỉ"
      );
    } else if (number >= 1_000_000) {
      const value = number / 1_000_000;
      return (
        (value === Math.floor(value) ? value.toFixed(0) : value.toFixed(2)) +
        " triệu"
      );
    } else if (number >= 1_000) {
      const value = number / 1_000;
      return (
        (value === Math.floor(value) ? value.toFixed(0) : value.toFixed(2)) +
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
