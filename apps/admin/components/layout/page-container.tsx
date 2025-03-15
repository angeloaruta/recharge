export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <div className="flex flex-col gap-4 py-4">{children}</div>
    </div>
  )
}
