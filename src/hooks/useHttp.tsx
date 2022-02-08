import { useEffect, useState } from "react";

type ReqOptions = {
  body?: RequestInit;
  method?: string;
  headers?: { [keyof: string]: string };
};

const useHttp = (url: string, options: ReqOptions) => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        setResponse(() => json);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { response, error };
};

export default useHttp;
