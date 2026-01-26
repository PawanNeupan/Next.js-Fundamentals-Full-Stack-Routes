import { Suspense } from "react"
import UserList from "./UserList"
import Loading from "./loading"
export default function ProfilePage() {
  return (
    <div className="mt-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-600">Profile Page</h2>

      {/* Custom Suspense */}
      <Suspense
        fallback={
          <h1 className="text-blue-600 animate-pulse">
            <Loading />
          </h1>
        }
      >
        <UserList />
      </Suspense>
    </div>
  )
}
