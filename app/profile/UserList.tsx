type User = {
  id: number
  name: string
  email: string
}

async function getUsers(): Promise<User[]> {
  // ⏳ Artificial delay
  await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    { cache: "no-store" }
  )

  return res.json()
}

// ✅ Server Component
export default async function UserList() {
  const users = await getUsers()

  return (
    <ul className="space-y-2">
      {users.map(user => (
        <li
          key={user.id}
          className="p-3 border rounded bg-gray-50"
        >
          <p className="font-medium text-gray-600">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </li>
      ))}
    </ul>
  )
}
