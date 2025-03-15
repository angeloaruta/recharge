import { Checkbox } from "@recharge/ui/components/checkbox"
import { Table } from "@tanstack/react-table"

export type RowSelectionHeaderProps<TData> = {
  table: Table<TData>
}
export function RowSelectionHeader<TData>({ table }: RowSelectionHeaderProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    </div>
  )
}
