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
    const minSalary = Math.round(min / 1000000);
    const maxSalary = Math.round(max / 1000000);
    return `${minSalary} - ${maxSalary} triệu`;
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
