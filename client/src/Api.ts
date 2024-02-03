import axios from "axios";


export const api = axios.create({
  baseURL: 'https://stock-control-api-p80x.onrender.com'
})