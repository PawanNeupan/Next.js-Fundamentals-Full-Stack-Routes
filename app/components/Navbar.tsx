"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/posts", label: "Posts" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-2 flex justify-between items-center shadow z-50">
      <div className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded transition hover:bg-blue-700 ${
              isActive(link.href) ? "bg-blue-800" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
