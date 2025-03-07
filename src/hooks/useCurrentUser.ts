import { useLocalStorageState } from "ahooks";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export interface CurrentUserResult {
  id?: string;
}

export const useCurrentUser = (): [CurrentUserResult?, string?] => {
  const [token] = useLocalStorageState<string>("my_access_token");

  const user = useMemo(() => {
    try {
      const i = jwtDecode(token || "") as any;
      return {
        id: i.sub || i.id,
      };
    } catch (err) {
      //
    }

    return undefined;
  }, [token]);

  return [user, token];
};
