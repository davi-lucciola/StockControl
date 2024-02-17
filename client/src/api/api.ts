import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    validateStatus: (status: number) => {
      return status < 400;
    },
  }),
);
