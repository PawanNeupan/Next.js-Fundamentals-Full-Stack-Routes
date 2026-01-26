export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="border border-gray-300 rounded p-4 mt-4">
      <h2 className="text-lg font-bold mb-2 text-gray-600">Dashboard Layout</h2>
      {children}
    </div>
  )
}
