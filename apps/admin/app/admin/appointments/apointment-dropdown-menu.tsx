import { useResponsiveModal } from "@recharge/ui/store/responsive-modal"
import { DropdownAction } from "@/components/table/dropdown-action"
import { Appointment } from "@recharge/db/schema/appointment"
import { Eye } from "lucide-react"

export function AppointmentDropdownMenu({ appointment }: { appointment: Appointment }) {
  const { setResponsiveModal } = useResponsiveModal()
  const items = [
    {
      label: "View Details",
      icon: Eye,
      onClick: () => {
        setResponsiveModal({
          title: "Appointment Details",
          content: <div>Appointment Details</div>,
        })
      },
    },
  ]
  return <DropdownAction items={items} />
}
