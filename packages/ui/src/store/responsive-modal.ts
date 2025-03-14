import { create } from "zustand"

export type ResponsiveModalData = {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  content?: React.ReactNode
  showClose?: boolean
  isDestructive?: boolean
  isLoading?: boolean
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}

type ResponsiveModalStore = ResponsiveModalData & {
  isOpen: boolean
  setResponsiveModal: (data: ResponsiveModalData) => void
  closeResponsiveModal: () => void
}

const defaultResponsiveModalData: ResponsiveModalData = {
  title: "",
  description: "",
  confirmLabel: "Confirm",
  cancelLabel: "Cancel",
  content: null,
  isDestructive: false,
  isLoading: false,
  onConfirm: () => Promise.resolve(),
  onCancel: () => {},
}

export const useResponsiveModal = create<ResponsiveModalStore>((set) => ({
  ...defaultResponsiveModalData,
  isOpen: false,
  setResponsiveModal: (data) => set({ isOpen: true, ...data }),
  closeResponsiveModal: () =>
    set({
      isOpen: false,
      ...defaultResponsiveModalData,
    }),
}))
