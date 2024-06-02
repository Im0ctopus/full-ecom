'use client'
import { updateSales } from '@/lib/queries'
import { RefreshCw } from 'lucide-react'

const Refresh = () => {
  return (
    <button
      onClick={() => updateSales()}
      className="absolute right-1 bottom-1 flex justify-center items-center my-auto gap-2 px-2 py-1 rounded-lg bg-zinc-100 text-sm group"
    >
      <RefreshCw size={20} className="group-hover:animate-spin" /> Refresh
    </button>
  )
}
export default Refresh
