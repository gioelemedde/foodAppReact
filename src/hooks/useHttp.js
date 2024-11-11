import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, confing) {
  const response = await fetch(url, confing);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }
  return resData;
}

export default function useHttp(url, confing, initialState) {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  function clearData() {
    setData(initialState);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...confing, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setLoading(false);
    },
    [url, confing]
  );

  useEffect(() => {
    // Controlla se 'confing' è definito e se il metodo è 'GET' o non è specificato
    if (
      (confing && (confing.method === "GET" || !confing.method)) ||
      !confing
    ) {
      sendRequest();
    }
    // Se 'confing' non è definito, invia comunque la richiesta
  }, [sendRequest]);

  return { data, error, loading, sendRequest, clearData };
}
