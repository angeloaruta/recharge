"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@recharge/ui/components/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
export function AppBreadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split("/").slice(1)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map(
          (path, index) =>
            path && (
              <Fragment key={path}>
                {index !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
