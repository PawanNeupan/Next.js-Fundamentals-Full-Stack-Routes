"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { addPost } from "./actions"

const initialState = { error: "" }

export default function PostForm() {
  const [state, formAction] = useActionState(addPost, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="title"
        placeholder="Post title"
        className="w-full border p-2 rounded"
      />

      {state.error && (
        <p className="text-red-600 text-sm">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {pending ? "Posting..." : "Add Post"}
    </button>
  )
}
