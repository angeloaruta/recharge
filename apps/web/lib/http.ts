import { env } from "@recharge/utils/env"
import axios from "axios"

export const http = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
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

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("error", error)
    return Promise.reject(error)
  },
)
