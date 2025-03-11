import { BASE_URL } from "./constants"
import axios from "axios"

export const http = axios.create({
  baseURL: `${BASE_URL}/api/public`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: true,
})

http.interceptors.request.use((config) => {
  config.headers["x-request-id"] = crypto.randomUUID()
  return config
})
