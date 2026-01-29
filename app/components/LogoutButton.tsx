import { signout } from '@/app/login/actions'

export default function LogoutButton() {
  return (
    <form action={signout}>
      <button 
        type="submit" 
        className="px-4 py-2 text-sm font-medium text-white bg-blue-300 hover:bg-blue-400 rounded transition"
      >
        Sign Out
      </button>
    </form>
  )
}