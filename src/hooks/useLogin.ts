import { useLocalStorageState, useRequest } from "ahooks";
import { API } from "../providers/request";
import { useNavigate } from "react-router-dom";

export type LoginParams = {
  type: string;
  [key: string]: any;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorageState("my_access_token");

  const loginAsync = useRequest(
    async ({ type, ...rest }: LoginParams) => {
      if (type == "token") {
        setToken(rest.token);
        if (rest.redirectTo) {
          navigate(rest.redirectTo);
        }
        return {
          success: true,
          redirectTo: rest.redirectTo || "/",
        };
      }

      if (type == "phone") {
        const res = await API.post("/auth/login", {
          phone: rest.phone,
          password: rest.password,
        });

        if (res.status == 200) {
          setToken(res.data.token);
          return {
            success: true,
            redirectTo: rest.redirectTo || "/",
          };
        }
      }

      return {
        success: false,
        error: { message: "Invalid credentials" },
      };
    },
    {
      manual: true,
    }
  );

  return {
    mutate: loginAsync.run,
    isLoading: loginAsync.loading,
  };
};
