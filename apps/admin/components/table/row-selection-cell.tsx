import { Checkbox } from "@recharge/ui/components/checkbox"
import { Row } from "@tanstack/react-table"

export type RowSelectionCellProps<TData> = {
  row: Row<TData>
}
export function RowSelectionCell<TData>({ row }: RowSelectionCellProps<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  )
}
