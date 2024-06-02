import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../globals.css'
import SessionProvider from '@/components/session_provider'
import Sidebar from './sidebar'
// import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'
import { Toaster } from 'sonner'
// import { getRole } from '@/lib/queries'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Backoffice | The Store',
  description: 'The Store backoffice',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const session = await getServerSession()
  // const role = await getRole()
  // if (!session?.user || role == 'User') redirect('/')
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${poppins.className} relative h-full font-sans antialiased`}
      >
        <SessionProvider>
          <Toaster richColors />
          <main className="flex min-h-screen relative overflow-clip">
            <Sidebar />
            <div className="flex-grow flex-1 overflow-auto">{children}</div>
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
