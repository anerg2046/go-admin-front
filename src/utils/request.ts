import { ApiResult } from "@/api/utils";
import { AxiosError } from "axios";
import { message } from "./message";

export const requestHook = async (fn: Promise<ApiResult>) => {
  try {
    const { code, msg, data } = await fn;
    if (code !== 0) {
      message(msg, { type: "error" });
      return;
    }
    return { code: code, msg: msg, data: data };
  } catch (e) {
    if ((e as AxiosError)?.response?.status !== 200) {
      const msg = e.response?.data?.msg ?? e;
      message(msg, { type: "error" });
    } else {
      message(e, { type: "error" });
    }
    return {
      code: -1,
      msg: "error",
      data: null
    };
  }
};
