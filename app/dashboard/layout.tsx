export default function DashboardLayout({
  children,
  feed,
  sidebar,
  modal,
}: {
  children: React.ReactNode
  feed?: React.ReactNode
  sidebar?: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex space-x-4">
      
      {/* FIXED ASIDE: Changed w-1/2 to w-64 (or w-auto) */}
      <aside className="w-64 shrink-0"> 
        <div className="bg-white p-3 rounded shadow space-y-4">
          {feed}
          <hr className="border-gray-100" />
          {sidebar}
        </div>
      </aside>

      {/* MAIN CONTENT: flex-1 will now fill the rest of the space properly */}
      <main className="flex-1 bg-white p-4 rounded shadow">
        {children}
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {modal}
        </div>
      )}
    </div>
  )
}