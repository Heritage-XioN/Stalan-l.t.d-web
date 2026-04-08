export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] content-visible">{children}</div>
}