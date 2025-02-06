import httpServices from "./httpServices";
const prefixAuthApi = `${import.meta.env.VITE_API}/level`;

const getAllLevels = async () => {
  try {
    const res = await httpServices.get(prefixAuthApi);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const createLevel = async (payload) => {
  try {
    const res = await httpServices.post(prefixAuthApi, payload);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const levelService = { getAllLevels, createLevel };
