import PostForm from "./PostForm"
import { posts } from "./data"
import { deletePost } from "./actions"

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      <PostForm />

      <ul className="mt-6 space-y-3">
        {posts.length === 0 && (
          <p className="text-gray-600">No posts yet</p>
        )}

        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>{post.title}</span>

            {/* ✅ Delete Button */}
            <form action={deletePost.bind(null, post.id)}>
              <button
                type="submit"
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
