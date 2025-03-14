import { ErrorResponse } from "@/types/common"
import { AxiosError } from "axios"

export const queryErrorHandler = (error: unknown) => {
  const message = (error as AxiosError<ErrorResponse>).response?.data.message
  const requestId = (error as AxiosError<ErrorResponse>).response?.data.requestId
  return {
    message,
    description: `Request ID: ${requestId}`,
  }
}
