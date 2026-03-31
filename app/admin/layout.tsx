import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  // We moved the redirect logic to middleware.ts
  return <>{children}</>
}