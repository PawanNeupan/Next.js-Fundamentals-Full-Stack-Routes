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
    <div className="min-h-screen bg-gray-100 p-4 flex gap-4">
      
      {/* LEFT ASIDE */}
      <aside className=" w-1/2 space-y-2 flex flex-row">
        

        <div className="bg-white p-3 rounded shadow ">
          {feed}

          {sidebar}
        </div>
      </aside>

      {/* MAIN CONTENT */}
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
