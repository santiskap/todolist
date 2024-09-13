import './globals.css'
import { Inter } from 'next/font/google'
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Listado de tareas',
  description: 'Generado por Santiago Tula',
}

function ChacraProvider(props: { children: ReactNode }) {
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
  )
}
