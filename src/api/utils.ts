export interface ApiResult {
  code: number;
  msg?: string;
  data?: any;
}

export const baseUrlApi = (url: string): string => {
  return process.env.NODE_ENV === "development"
    ? `http://172.20.174.21:8020/v1${url}`
    : `http://172.20.174.21:8020/v1${url}`;
};
