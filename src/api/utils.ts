export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `http://172.20.174.21:8011/v1${url}`
    : `http://127.0.0.1:3000/${url}`;
