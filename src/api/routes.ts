import { http } from "@/utils/http";
import { baseUrlApi, ApiResult } from "./utils";

export const getAsyncRoutes = () => {
  return http.request<ApiResult>("get", baseUrlApi("/get_routers"));
};
