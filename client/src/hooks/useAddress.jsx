import { useState, useEffect } from "react";
import address from "../api/locationApi";

const useAddress = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch provinces
    const fetchProvinces = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await address.fetchProvincesData();
            setProvinces(data);
        } catch (err) {
            setError("Failed to fetch provinces.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch districts based on province ID
    const fetchDistricts = async (provinceId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await address.fetchDistrictData(provinceId);
            setDistricts(data);
        } catch (err) {
            setError(`Failed to fetch districts for province ID: ${provinceId}`);
        } finally {
            setLoading(false);
        }
    };

    // Fetch wards based on district ID
    const fetchWards = async (districtId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await address.fetchWardData(districtId);
            setWards(data);
        } catch (err) {
            setError(`Failed to fetch wards for district ID: ${districtId}`);
        } finally {
            setLoading(false);
        }
    };

    // Automatically fetch provinces on mount
    useEffect(() => {
        fetchProvinces();
    }, []);

    return {
        provinces,
        districts,
        wards,
        loading,
        error,
        fetchDistricts,
        fetchWards,
    };
};

export default useAddress;
