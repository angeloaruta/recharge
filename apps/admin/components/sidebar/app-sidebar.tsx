"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@recharge/ui/components/sidebar"
import { TeamSwitcher } from "./team-switcher"

import { navs, user, teams } from "@/lib/navigation"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

export type AppSidebarProps = React.ComponentProps<typeof Sidebar>

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        {navs.map((nav) => (
          <NavMain key={nav.title} nav={nav} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
