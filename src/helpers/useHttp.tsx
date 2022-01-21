import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (reqConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method || "GET",
        headers: reqConfig.headers || {},
        body: JSON.stringify(reqConfig.body) || null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err: unknown) {
      setError(err.message || "Something went wrong!");
    }
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
