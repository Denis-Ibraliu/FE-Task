import { useEffect, useState } from "react";
import { serverBaseUrl } from "../settings";

interface Props {
  url: string;
  onSuccess?: (res: any) => void;
  onError?: () => void;
  onPrepareResponse?: (res: any) => any;
  deps?: any[];
}

export const useQuery = ({
  url,
  onSuccess,
  onError,
  onPrepareResponse,
  deps = [],
}: Props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUrl = serverBaseUrl + url;

  const dataFetch = async () => {
    setLoading(true);
    try {
      const data = await (await fetch(fetchUrl)).json();

      // set state when the data received
      if (onPrepareResponse) {
        setData(onPrepareResponse(data));
      } else {
        setData(data);
      }

      if (onSuccess) onSuccess(data);
    } catch (e) {
      if (onError) onError();

      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dataFetch();
  }, [...deps]);

  return {
    data,
    loading,
    fetchData: dataFetch,
  };
};
