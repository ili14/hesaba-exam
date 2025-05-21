import axios from "axios";

const API_BASE_URL = "https://api.exconvert.com";
const ACCESS_KEY = "c5a10b86-a8d7b1ce-0cd2fd0e-39c2f680";

export interface RatesResponse {
  base: string;
  result: Record<string,number>|{
    GBP?: number;
    USD?: number;
    EUR?: number;
  };
  ms: number;
}

export const fetchExchangeRate = async (from: string, to: string): Promise<RatesResponse> => {
  const response = await axios.get<RatesResponse>(`${API_BASE_URL}/fetchOne`, {
    params: { access_key: ACCESS_KEY, from, to },
  });
  return response.data;
};
