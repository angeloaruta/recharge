"use client"

import { PageContainer } from "@/components/layout/page-container"
import { DataTable } from "@/components/table/data-table"
import { columns } from "./columns"

export default function Page() {
  return (
    <PageContainer>
      <DataTable columns={columns} data={[]} />
    </PageContainer>
  )
}
