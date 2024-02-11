import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export type Response = {
  detail: string;
  createdId?: number;
};

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: "https://stock-control-api-p80x.onrender.com",
  }),
);