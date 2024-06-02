'use client'

import { delCat } from '@/lib/queries'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

const DelButton = ({ id }: { id: number }) => {
  function setDel(arg0: boolean) {
    throw new Error('Function not implemented.')
  }

  return (
    <button
      type="button"
      onClick={async () => {
        const res: boolean = await delCat(id)
        if (res) {
          toast.success('Category deleted with Success')
        } else {
          toast.error('An Error occurred! Please try again later.')
        }
      }}
      className="h-6 w-16 bg-red-400 hover:bg-red-500 transition-all duration-300 rounded-full flex justify-center items-center"
    >
      <Trash2 size={17} />
    </button>
  )
}
export default DelButton
