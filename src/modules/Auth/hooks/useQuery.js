import { useState, useCallback } from "react";
import api from "../../lib/axios";

export const useQuery = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, options);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useMutation = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (data, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(url, data, options);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Mutation failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { loading, error, mutate };
};