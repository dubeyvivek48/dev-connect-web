import { useCallback, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

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
        let URL = BASE_URL + ApiKey;
        let res = await axios({
          url: URL,
          method,
          data: payload,
          withCredentials: true,
        });
        setIsSubmitting(false);
        onSuccess(res);
      } catch (err) {
        setIsSubmitting(false);
        onFailure(err?.response);
      }
    },
    []
  );

  return [isSubmitting, makeApiCall];
}
