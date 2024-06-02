'use client'

import { Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormState } from 'react-dom'
import { handleSlideForm } from '@/lib/actions'
import { toast } from 'sonner'

const AddSlide = ({ handleChange }: { handleChange: () => Promise<void> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const initialState = {
    message: '',
  }
  const [slideState, slideFormAction] = useFormState(
    handleSlideForm,
    initialState
  )

  useEffect(() => {
    if (slideState.message == 'Success') {
      toast.success('Image uploaded with Success')
      handleChange()
      setIsOpen(false)
    } else if (slideState.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    } else if (slideState.message == 'No Image') {
      toast.error('You need to choose an Image first.')
    }
  }, [slideState, handleChange])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-zinc-200 rounded-lg px-2 py-1 hover:bg-zinc-300 duration-300 transition-all flex justify-center items-center gap-1"
      >
        <Plus size={20} />
        <p>Add Slide</p>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
              className="bg-black/60 inset-0 z-40 fixed"
            ></motion.div>
            <motion.form
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
              action={slideFormAction}
              className="flex flex-col justify-center items-center gap-10 fixed bottom-10 inset-x-0 mx-auto z-50 w-fit bg-white px-14 py-10 rounded-xl border-zinc-800 border-2"
            >
              <div className="flex flex-col justify-center items-start">
                <label>Upload Slide:</label>
                <input
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg"
                  placeholder="Upload an Image"
                  className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <button className="bg-zinc-200 px-14 py-3 rounded-lg hover:bg-zinc-300">
                  Upload Slide
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:bg-zinc-200 p-1 absolute top-3 rounded-full right-3 transition-all duration-300"
              >
                <X />
              </button>
            </motion.form>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
export default AddSlide
