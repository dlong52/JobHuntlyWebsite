import axios from "axios";

const axiosJwt = axios.create();
const prefixUserApi = `${import.meta.env.VITE_API}/user`;

const getDetailUser = async (accessToken) => {
    try {
        const res = await axiosJwt.get(`${prefixUserApi}/details`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching user details:", error.response ? error.response.data : error.message);
        return res.error;
    }
};

export {
    getDetailUser
};
