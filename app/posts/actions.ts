"use server"

import { revalidatePath } from "next/cache"
import { posts } from "./data"

export async function addPost(
  prevState: { error?: string },
  formData: FormData
) {
  const title = formData.get("title")?.toString()

  if (!title || title.trim() === "") {
    return { error: "Title is required" }
  }

  posts.push({
    id: Date.now(),
    title,
  })

  revalidatePath("/posts")
  return { error: "" }
}

// ✅ DELETE ACTION
export async function deletePost(id: number) {
  const index = posts.findIndex((p) => p.id === id)

  if (index !== -1) {
    posts.splice(index, 1)
  }

  revalidatePath("/posts")
}
