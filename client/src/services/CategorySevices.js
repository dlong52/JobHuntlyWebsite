import httpServices from "./httpServices";
const prefixAuthApi = `${import.meta.env.VITE_API}/category`;

const getAllCategories = async () => {
  try {
    const res = await httpServices.get(prefixAuthApi);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { getAllCategories };
