import axios from 'axios';

const address = {
    fetchProvincesData: async () => {
        const provinces = "https://vapi.vnappmob.com/api/v2/province/";
        try {
            const response = await axios.get(provinces);
            return response.data.results;
        } catch (error) {
            console.error("Error fetching provinces data:", error);
            return [];
        }
    },
    fetchDistrictData: async (id) => {
        const district = `https://vapi.vnappmob.com/api/v2/province/district/${id}`;
        try {
            const response = await axios.get(district);
            return response.data.results;
        } catch (error) {
            console.error(`Error fetching district data for id ${id}:`, error);
            return [];
        }
    },
    fetchWardData: async (id) => {
        const ward = `https://vapi.vnappmob.com/api/v2/province/ward/${id}`;
        try {
            const response = await axios.get(ward);
            return response.data.results;
        } catch (error) {
            console.error(`Error fetching ward data for id ${id}:`, error);
            return [];
        }
    },
};

export default address;
