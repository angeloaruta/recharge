"use client"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@recharge/ui/components/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@recharge/ui/components/dialog"
import { useResponsiveModal } from "@recharge/ui/store/responsive-modal"
import { ScrollArea } from "@recharge/ui/components/scroll-area"
import { Button } from "@recharge/ui/components/button"
import { useMediaQuery } from "usehooks-ts"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export const ResponsiveModal = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isPending, setIsPending] = useState(false)
  const { isOpen, closeResponsiveModal, ...data } = useResponsiveModal()
  const {
    onConfirm,
    onCancel,
    content,
    title,
    description,
    confirmLabel,
    cancelLabel,
    isDestructive,
  } = data

  const handleConfirm = async () => {
    setIsPending(true)
    await onConfirm?.()
    setIsPending(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setIsPending(false)
    closeResponsiveModal()
  }

  if (!data) return null

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={closeResponsiveModal}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} disabled={isPending}>
              {cancelLabel}
            </Button>
            <Button
              onClick={handleConfirm}
              variant={isDestructive ? "destructive" : "default"}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeResponsiveModal}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto p-4">{content}</ScrollArea>
        <DrawerFooter>
          <Button
            onClick={handleConfirm}
            variant={isDestructive ? "destructive" : "default"}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : confirmLabel}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleCancel} disabled={isPending}>
              {cancelLabel}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
