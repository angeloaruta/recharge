import type { LucideIcon } from "lucide-react"

export type NavigationItem = {
  title: string
  url: string
}

export type NavigationGroup = {
  title: string
  icon: LucideIcon
  items: NavigationItem[]
}

export type NavigationMenu = {
  title: string
  groups: NavigationGroup[]
}

export type NavigationMenus = NavigationMenu[]
