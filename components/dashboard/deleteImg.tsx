'use client'

import { handleDeleteImage } from '@/lib/actions'
import { Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

const DeleteImage = ({
  img_id,
  setDel,
  del,
}: {
  img_id: number
  setDel: Dispatch<SetStateAction<boolean>>
  del: boolean
}) => {
  return (
    <button
      type="button"
      onClick={async () => {
        const res = await handleDeleteImage(img_id)
        if (res.message == 'Success') {
          toast.success('Image deleted with Success')
          setDel(!del)
        } else if (res.message == 'Error') {
          toast.error('An Error occurred! Please try again later.')
        }
      }}
      className="aspect-square w-6 bg-red-400 hover:bg-red-500 transition-all duration-300 rounded-full flex justify-center items-center"
    >
      <Trash2 size={17} />
    </button>
  )
}
export default DeleteImage
