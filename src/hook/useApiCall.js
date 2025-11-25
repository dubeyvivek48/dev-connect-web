import { useCallback, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function useApiCall() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const makeApiCall = useCallback(
    async ({
      ApiKey,
      method,
      payload = {},
      onSuccess = () => {},
      onFailure = () => {},
    }) => {
      try {
        setLoader(true);
        let URL = BASE_URL + ApiKey;
        let res = await axios({
          url: URL,
          method,
          data: payload,
          withCredentials: true,
        });
        setLoader(false);
        onSuccess(res);
      } catch (err) {
        console.log({ err });
        if (err.status === 401) {
          navigate("/login");
        }
        // navigate("/login");
        setLoader(false);
        onFailure(err?.response);
      }
    },
    []
  );

  return [loader, makeApiCall];
}
