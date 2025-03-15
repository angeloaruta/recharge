"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@recharge/ui/components/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@recharge/ui/components/collapsible"
import type { NavigationMenu } from "@/types/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@recharge/ui/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
export function NavMain({ nav }: { nav: NavigationMenu }) {
  const { title, groups } = nav
  const path = usePathname()

  console.log(path)
  console.log(groups)

  const currentActiveGroup = () => {
    const activeGroup = groups.find((group) => {
      return group.items?.find((item) => {
        return item.url === path
      })
    })
    return activeGroup
  }

  const openCollapsible = (title: string) => {
    return currentActiveGroup()?.title === title ? true : false
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {groups.map((group) => (
          <Collapsible
            key={group.title}
            defaultOpen={openCollapsible(group.title)}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={group.title}>
                  {group.icon && <group.icon />}
                  <span>{group.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {group.items?.map((item) => (
                    <SidebarMenuSubItem
                      key={item.title}
                      className={cn(item.url === path && "bg-muted rounded-md")}
                    >
                      <SidebarMenuSubButton asChild>
                        <Link href={`${item.url}`}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
