export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground text-center text-sm">
          &copy; {new Date().getFullYear()} Recharge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
