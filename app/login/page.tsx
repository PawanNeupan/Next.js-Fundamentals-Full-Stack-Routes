import { login, signup } from './actions'

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-80 max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h1>
        
        {/* Success/Error Messages from URL */}
        {searchParams.error && <p className="text-red-500 text-sm text-center mb-4">{searchParams.error}</p>}
        {searchParams.message && <p className="text-green-600 text-sm text-center mb-4">{searchParams.message}</p>}

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          
          <div className="pt-4">
            <button 
              formAction={login} 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Log In
            </button>
          </div>
          
          <div className="text-center pt-2">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <button 
              formAction={signup} 
              className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}