'use client'
import { signOut } from 'next-auth/react'

const Logout_button = () => {
  return (
    <button
      onClick={() => {
        signOut()
      }}
      className="text font-bold hover:scale-105 transition-all py-1 px-4 bg-red-400 rounded-3xl text-white"
    >
      Logout
    </button>
  )
}
export default Logout_button
