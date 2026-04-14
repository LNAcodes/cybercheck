import Header from "./Header"
import FooterNav from "./FooterNav"

interface AppShellProps {
  children: React.ReactNode
  showGuestBanner?: boolean
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Header />
      <main className="pt-16 pb-16 min-h-screen">
        {children}
      </main>
      <FooterNav />
    </>
  )
}
