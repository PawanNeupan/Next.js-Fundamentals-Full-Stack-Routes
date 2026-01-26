import "./globals.css"
import Navbar from "./components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-gray-100 font-sans">
        
        <Navbar />

        {/* Main content */}
        <main className="p-6 pt-12">{children}</main>
      </body>
    </html>
  )
}
