import { PageContainer } from "@/components/layout/page-container"
import { Button } from "@recharge/ui/components/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <PageContainer
      className="min-h-[calc(100vh-8rem)]"
      containerClassName="max-w-md flex flex-col items-center text-center"
    >
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h2>
      <p className="text-muted-foreground mt-6 text-lg">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
        deleted.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </PageContainer>
  )
}
