import Link from "next/link"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { signout } from '@/app/login/actions'
import NavLinks from './NavLinks'

export default async function Navbar() {
  const cookieStore = cookies()
  
  // Initialize Supabase for Server Component
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) { return (await cookieStore).get(name)?.value },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-2 flex justify-between items-center shadow z-50">
      <div className="flex gap-4 items-center">
        {/* Client component for the links */}
        <NavLinks />
      </div>

      <div className="flex items-center gap-4 px-3">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-80 hidden md:block">{user.email}</span>
            <form action={signout}>
              <button 
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-400 px-4 py-1 rounded text-sm font-medium transition"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-1 rounded text-sm font-medium transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}