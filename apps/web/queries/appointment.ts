import type { ApppointmentCreateSchema } from "@/schemas/appointment"
import { useMutation } from "@tanstack/react-query"
import type { ErrorResponse } from "@/types/common"
import { useRouter } from "next/navigation"
import type { AxiosError } from "axios"
import { http } from "@/lib/http"
import { toast } from "sonner"

export const useCreateAppointment = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ApppointmentCreateSchema) => http.post("/appointment", data),
    onSuccess: () => {
      router.push("/success")
    },
    onError: (error) => {
      const message = (error as AxiosError<ErrorResponse>).response?.data.message
      const requestId = (error as AxiosError<ErrorResponse>).response?.data.requestId
      toast.error(message, {
        description: `Request ID: ${requestId}`,
      })
    },
  })
}
