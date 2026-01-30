import Link from "next/link"

// This is the logic that used to be inside your /api/hello/route.ts
// Moving it to a function allows us to call it directly on the server.
async function getHelloData() {
  // In a real app, you might fetch from Supabase here
  return {
    message: "Welcome to the Dashboard! Data loaded successfully on the server."
  };
}

export default async function HomePage() {
  // Instead of fetch("http://localhost:3000..."), call the function directly
  // This avoids the ECONNREFUSED error on Vercel.
  const data = await getHelloData();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl font-black text-slate-800">Home Page</h1>
        
        {/* Display the message safely */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-blue-700 font-medium">
            {data.message}
          </p>
        </div>

        <div className="mt-8">
          <Link 
            href="/dashboard" 
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}