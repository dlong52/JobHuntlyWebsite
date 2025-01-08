import httpServices from "./httpServices";
const prefixAuthApi = `${import.meta.env.VITE_API}/job`;

const getAllPosts = async () => {
  try {
    const res = await httpServices.get(prefixAuthApi);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const createJob = async () => {
  try {
    const res = await httpServices.post(prefixAuthApi);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { getAllPosts, createJob };
