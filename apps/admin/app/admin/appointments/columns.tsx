import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { RowSelectionHeader } from "@/components/table/row-selection-header"
import { RowSelectionCell } from "@/components/table/row-selection-cell"
import { AppointmentDropdownMenu } from "./apointment-dropdown-menu"
import { DropdownAction } from "@/components/table/dropdown-action"
import { Appointment } from "@recharge/db/schema/appointment"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Badge } from "@recharge/ui/components/badge"
export const columns: ColumnDef<Appointment>[] = [
  {
    id: "select",
    header: ({ table }) => <RowSelectionHeader table={table} />,
    cell: ({ row }) => <RowSelectionCell row={row} />,
  },
  {
    id: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    accessorKey: "name",
  },
  {
    id: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    accessorKey: "date",
  },
  {
    id: "time",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Time" />,
    accessorKey: "time",
  },
  {
    id: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    accessorKey: "status",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: "confirmationCode",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Confirmation Code" />,
    accessorKey: "confirmationCode",
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <AppointmentDropdownMenu appointment={row.original} />,
  },
]

export const StatusCell = ({ row }: { row: Row<Appointment> }) => {
  const status = row.original.status
  const statusVariant = () => {
    switch (status) {
      case "cancelled":
        return "destructive"
      case "pending":
        return "warning"
      case "completed":
        return "success"
      default:
        return "info"
    }
  }
  return <Badge variant={statusVariant()}>{status}</Badge>
}
