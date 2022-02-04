import { useCallback, useState } from "react";

type ReqOptions = { url: string; body?: any; method?: string; headers?: { [keyof: string]: string } };

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (options: ReqOptions, onData: (...args: any[]) => any) => {
    const { method, url, body, headers } = options;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: method || "GET",
        headers: headers || {},
        body: JSON.stringify(body) || null,
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(() => message || "Something went wrong!");

        throw new Error(message);
      }

      setIsLoading(false);

      const data = await response.json();
      onData(data);
    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
