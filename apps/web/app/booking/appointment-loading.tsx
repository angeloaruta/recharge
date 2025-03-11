import { Card, CardContent, CardHeader } from "@recharge/ui/components/card"
import { PageContainer } from "@/components/layout/page-container"
import { Skeleton } from "@recharge/ui/components/skeleton"

export function AppointmentLoading() {
  return (
    <PageContainer containerClassName="max-w-md">
      <Card className="border-muted/40 bg-background ring-muted/30 before:from-muted/80 before:to-muted/20 rounded-none shadow-none ring-1 before:absolute before:inset-0 before:-z-10 before:translate-y-2 before:scale-[0.98] before:bg-gradient-to-b before:blur-xl before:content-['']">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center">
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          <Skeleton className="mx-auto h-7 w-3/5" />
          <Skeleton className="mx-auto mt-2 h-4 w-4/5" />
          <Skeleton className="mx-auto mt-1 h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6 px-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </PageContainer>
  )
}
