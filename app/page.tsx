import Link from "next/link"

export default async function HomePage() {
  // 1. Fetch from your internal API
  // Note: Localhost:3000 is required for server-side fetch
  const res = await fetch("http://localhost:3000/api/hello", {
    cache: "no-store", // Ensures you get fresh data
  });

  if (!res.ok) {
    return <div>Error loading message</div>;
  }

  const data = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Home Page</h1>
      {/* 2. Display the JSON message */}
      <p className="mt-4 p-4 bg-blue-100 rounded text-blue-800">
        {data.message}
      </p>
    </div>
  );
}