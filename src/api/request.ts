import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type AxiosData<T> = {
  data: T;
};

const baseURL = getApiUrl().toString();
export const client = axios.create({ baseURL, withCredentials: true });

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await client(config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return {} as T;
  }
};

function getApiUrl() {
  const devApi = new URL("http://localhost:3000/api/v1");
  const prodApi = new URL("http://13.40.158.3//api/v1");

  switch (import.meta.env.MODE) {
    case "prod":
      return prodApi;
    case "dev":
      return devApi;
    default:
      return import.meta.env.PROD ? prodApi : devApi;
  }
}
