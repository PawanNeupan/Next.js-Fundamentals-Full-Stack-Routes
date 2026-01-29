"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLinks() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/add", label: "Add Product" },
    { href: "/profile", label: "Profile" },
    { href: "/posts", label: "Posts" },
  ]

  const isActive = (href: string) => {
    // If it's the homepage, it must be an exact match
    if (href === "/") return pathname === "/"
    // For other routes, check if the current path starts with the link's href
    return pathname.startsWith(href)
  }

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors hover:bg-blue-700 ${
            isActive(link.href) ? "bg-blue-800" : "text-blue-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}