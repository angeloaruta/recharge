import {
  type Appointment,
  type CreateAppointment,
  AppointmentStatus,
  appointmentStatusEnum,
  UpdateAppointment,
} from "@recharge/utilities/schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { MutationResponse, QueryResponse } from "@/types/common"
import { getConfirmationCodeFromSearchParams } from "@/lib/utils"
import { queryErrorHandler } from "@/lib/error-handler"
import { getIdFromPathname } from "@/lib/utils"
import { http } from "@/lib/http"
import { toast } from "sonner"

const APPOINTMENT_QUERY_KEY = "appointment-query-key"

export const useGetAppointment = () => {
  const searchParams = useSearchParams()
  const confirmationCode = getConfirmationCodeFromSearchParams(searchParams!)
  const pathname = usePathname()
  const id = getIdFromPathname(pathname!)

  return useQuery({
    queryKey: [APPOINTMENT_QUERY_KEY, id, confirmationCode],
    queryFn: async () => {
      const response = await http.get<QueryResponse<Appointment>>(
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
    mutationFn: async (data: CreateAppointment) => {
      const response = await http.post<MutationResponse<Appointment>>("v1/appointment", data)
      return response.data
    },
    onSuccess: (data) => {
      const { data: appointment } = data
      router.push(
        `/booking/${appointment.id}/success?confirmation_code=${appointment.confirmationCode}`,
      )
    },
    onError: (error) => {
      const { message, description } = queryErrorHandler(error)
      toast.error(message, {
        description,
      })
    },
  })
}

export const useCancelAppointment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { id: string; confirmationCode: string }) => {
      const response = await http.put<MutationResponse<Appointment>>(
        `v1/appointment/${data.id}/confirmation/${data.confirmationCode}/cancel`,
        {
          status: appointmentStatusEnum.Enum.cancelled,
        },
      )

      return response.data
    },
    onSuccess: (data) => {
      const { data: appointment } = data
      toast.success("Appointment Cancelled!")
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENT_QUERY_KEY, appointment.id, appointment.confirmationCode],
      })
    },
    onError: (error) => {
      const { message, description } = queryErrorHandler(error)
      toast.error(message, {
        description,
      })
    },
  })
}

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      id: string
      confirmationCode: string
      payload: UpdateAppointment
    }) => {
      const response = await http.put<MutationResponse<Appointment>>(
        `v1/appointment/${data.id}/confirmation/${data.confirmationCode}`,
        data.payload,
      )

      return response.data
    },
    onSuccess: (data) => {
      const { data: appointment } = data
      toast.success("Appointment Updated!")
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENT_QUERY_KEY, appointment.id, appointment.confirmationCode],
      })
    },
    onError: (error) => {
      const { message, description } = queryErrorHandler(error)
      toast.error(message, {
        description,
      })
    },
  })
}
