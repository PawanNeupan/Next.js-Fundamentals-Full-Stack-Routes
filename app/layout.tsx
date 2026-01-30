import "./globals.css"
import Navbar from "./components/Navbar"
import { Inter } from "next/font/google" // Import the font loader

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents invisible text during loading
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* 1. inter.className applies the font family and prevents layout shift.
          2. antialiased makes the font look smoother on modern screens.
      */}
      <body className={`${inter.className} antialiased min-h-screen w-full bg-gray-100`}>
        
        <Navbar />

        {/* Main content */}
        <main className="p-6 pt-12">{children}</main>
      </body>
    </html>
  )
}