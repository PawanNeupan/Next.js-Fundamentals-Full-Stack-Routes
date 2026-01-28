"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Breadcrumbs() {
  const pathname = usePathname() // e.g., /dashboard/1
  const segments = pathname.split("/").filter(Boolean) // ["dashboard", "1"]

  return (
    <nav className="text-gray-600 text-sm mb-4">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <span key={href}>
            {isLast ? (
              <span className="font-semibold">{label}</span>
            ) : (
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            )}
            {!isLast && " / "}
          </span>
        )
      })}
    </nav>
  )
}
