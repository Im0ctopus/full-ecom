'use client'
import { signIn } from 'next-auth/react'

const Login_button = () => {
  return (
    <button
      onClick={() => {
        signIn('google')
      }}
      className="text-xl font-bold hover:scale-105 transition-all py-1 px-4 bg-black/20 rounded-3xl"
    >
      Login
    </button>
  )
}
export default Login_button
