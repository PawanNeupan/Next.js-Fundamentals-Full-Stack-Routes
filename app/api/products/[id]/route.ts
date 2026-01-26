import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Security Challenge
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== "12345") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Await the dynamic ID
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}