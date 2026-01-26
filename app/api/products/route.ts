import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data"; // adjust path as needed

export async function GET(req: NextRequest) {
  // --- Challenge: Security Header ---
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== "12345") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Task 3: Query Params ---
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("search")?.toLowerCase();

  if (searchTerm) {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
    return NextResponse.json(filtered);
  }

  
  return NextResponse.json(products);
}