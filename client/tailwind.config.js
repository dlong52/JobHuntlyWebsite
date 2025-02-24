/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          200: "var(--primary-200)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          200: "var(--secondary-200)",
          dark: "var(--secondary-dark)",
        },
        neutrals: {
          100: "var(--neutrals-100)",
          80: "var(--neutrals-80)",
          60: "var(--neutrals-60)",
          40: "var(--neutrals-40)",
          20: "var(--neutrals-20)",
          10: "var(--neutrals-10)",
          0: "var(--neutrals-0)",
        },
        accent: {
          yellow: "var(--accent-yellow)",
          green: "var(--accent-green)",
          red: "var(--accent-red)",
          blue: "var(--accent-blue)",
          purple: "var(--accent-purple)",
        },
        footer: "#202430",

        active: "#4640DE",
      },

      fontFamily: {
        RedHatDisplay: ["RedHatDisplay", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        MonumentExtended: ["MonumentExtended", "sans-serif"],
        Epilogue: ["Epilogue", "sans-serif"],
        ClashDisplay: ["ClashDisplay", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      spacing: {
        "header": "75px",
        "header-hr": "80px",
      },
      margin: {
        "content-admin": "273px",
        header: "75px",
        "header-hr": "80px",
      },
      width: {
        sidebar: "273px",
        "content-hr": "calc(100% - 273px)",
      },
      height: {
        header: "75px",
        banner: "calc(100% -75px)",
        "header-hr": "80px",
      },
      backgroundImage: {
        banner: "url(./src/assets/images/background/banner.png)",
        grid: "url(./src/assets/images/background/bg_grid_auth.svg)",
        "banner-child": "url(./src/assets/images/background/banner_0.png)",
        "test-cv":
          "url(https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/experts.png?v=1.0.6)",
      },
      boxShadow: {
        hover: "20px 20px 60px #3c36bd, -20px -20px 60px #514aff",
        border:
          "var(--primary-light) 0px 1px 2px 0px, var(--primary-light) 0px 2px 6px 2px",
      },
    },
  },
  plugins: [],
};
