'use client'

import { handleBuyprod } from '@/lib/actions'
import { toast } from 'sonner'

export default function BuyButton({ prodId }: { prodId: number }) {
  return (
    <div className="relative">
      <button
        onClick={async () => {
          const res = await handleBuyprod(prodId)
          if (res == 1) {
            toast.success('Product added to your cart with Success')
          } else if (res == 0) {
            toast.error('An Error occurred! Please try again later.')
          }
        }}
        className="px-4 py-3 border border-zinc-800 rounded-lg text-lg font-medium absolute bottom-1 bg-white active:bottom-0 transition-all duration-100"
      >
        Add to the Cart
      </button>
      <div className="px-4 py-3 border border-zinc-800 rounded-lg text-lg font-medium bottom-1 bg-zinc-800 text-zinc-800">
        Add to the Cart
      </div>
    </div>
  )
}
