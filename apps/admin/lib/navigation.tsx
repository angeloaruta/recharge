import { Calendar, Building2, Settings2, Users, CreditCard } from "lucide-react"
import { NavigationMenus } from "@/types/navigation"
import { Teams } from "@/types/team"
import { ROUTES } from "./routes"

export const navs: NavigationMenus = [
  {
    title: "Worker",
    groups: [
      {
        title: "Schedule",
        icon: Calendar,
        items: [
          {
            title: "Appointments",
            url: ROUTES.WORKER.APPOINTMENTS,
          },
          {
            title: "Availability",
            url: ROUTES.WORKER.AVAILABILITY,
          },
        ],
      },
      {
        title: "Payments",
        icon: CreditCard,
        items: [
          {
            title: "Disbursements",
            url: ROUTES.WORKER.DISBURSEMENTS,
          },
        ],
      },
    ],
  },
  {
    title: "Admin",
    groups: [
      {
        title: "Appointments",
        icon: Calendar,
        items: [
          {
            title: "Overview",
            url: ROUTES.ADMIN.APPOINTMENTS,
          },
        ],
      },
      {
        title: "Members",
        icon: Users,
        items: [
          {
            title: "Overview",
            url: ROUTES.ADMIN.MEMBERS,
          },
        ],
      },
      {
        title: "Payments",
        icon: CreditCard,
        items: [
          {
            title: "Invoices",
            url: ROUTES.ADMIN.INVOICES,
          },
          {
            title: "Disbursements",
            url: ROUTES.ADMIN.DISBURSEMENTS,
          },
        ],
      },
      {
        title: "Settings",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: ROUTES.ADMIN.SETTINGS,
          },
        ],
      },
    ],
  },
]
export const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  image: "https://example.com/image.png",
}

export const teams: Teams = [
  {
    name: "Metro Manila",
    logo: Building2,
    slug: "metro-manila",
  },
]
