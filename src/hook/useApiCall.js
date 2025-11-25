import { useCallback, useState } from "react";
import axios from "axios";

export default function useApiCall() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const makeApiCall = useCallback(
    async ({
      ApiKey,
      method,
      payload = {},
      onSuccess = () => {},
      onFailure = () => {},
    }) => {
      try {
        setIsSubmitting(true);
        let res = await axios({
          url: `http://localhost:3000/${ApiKey}`,
          method,
          data: payload,
          withCredentials: true,
        });
        setIsSubmitting(false);
        onSuccess(res);
      } catch (err) {
        setIsSubmitting(false);
        console.log({ err });
        onFailure(err.response?.data || err.message);
      }
    },
    []
  );

  return [isSubmitting, makeApiCall];
}
