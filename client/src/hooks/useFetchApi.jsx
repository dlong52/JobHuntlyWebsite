import { useState, useEffect } from 'react';

const useFetchApi = (fetchFunction, ...args) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFunction(...args);
        setData(result);
        setStatus('success');
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
        setStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, args]);

  return { data, isLoading, status, error };
};

export default useFetchApi;
