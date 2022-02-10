import { useCallback, useState } from "react";

type ReqOptions = { url: string; body?: unknown; method?: string; headers?: { [keyof: string]: string } };

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (options: ReqOptions, onData: (...args: unknown[]) => unknown) => {
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
    } catch (err: unknown) {
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
