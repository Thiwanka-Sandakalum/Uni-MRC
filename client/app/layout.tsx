import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const inter = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mrc Uni Members',
  description: 'uni members',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <footer className='w-full p-5 bg-stone-800 flex items-center justify-center'>
        <p className='font-semibold text-stone-200 tracking-wider'>Nipuna Nishan | Thiwanka Sandajalum</p>
      </footer>
      </body>
      
    </html>
  )
}
