import axios from "axios";

export type Response = {
  detail: string;
  createdId?: number;
};

export const api = axios.create({
  baseURL: "https://stock-control-api-p80x.onrender.com",
});
