import type { ErrorResponse, MutationResponse, QueryResponse } from "@/types/common"
import type { Apppointment, ApppointmentCreateSchema } from "@/schemas/appointment"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getConfirmationCodeFromSearchParams } from "@/lib/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getIdFromPathname } from "@/lib/utils"
import type { AxiosError } from "axios"
import { http } from "@/lib/http"
import { toast } from "sonner"

export const useGetAppointment = () => {
  const searchParams = useSearchParams()
  const confirmationCode = getConfirmationCodeFromSearchParams(searchParams)
  const pathname = usePathname()
  const id = getIdFromPathname(pathname)

  return useQuery({
    queryKey: ["appointment", id, confirmationCode],
    queryFn: async () => {
      const response = await http.get<QueryResponse<Apppointment>>(
        `v1/appointment/${id}/confirmation/${confirmationCode}`,
      )
      return response.data.data
    },
    enabled: !!id && !!confirmationCode,
  })
}

export const useCreateAppointment = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: ApppointmentCreateSchema) => {
      const response = await http.post<MutationResponse<Apppointment>>("v1/appointment", data)
      return response.data
    },
    onSuccess: (data) => {
      const { data: appointment } = data
      router.push(
        `/booking/${appointment.id}/success?confirmationCode=${appointment.confirmationCode}`,
      )
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
