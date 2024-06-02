'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useFormState } from 'react-dom'
import { handleCreateCat } from '@/lib/actions'
import { toast } from 'sonner'

const Create = () => {
  const initialState = {
    message: '',
  }
  const [state, formAction] = useFormState(handleCreateCat, initialState)

  useEffect(() => {
    if (state.message == 'Success') {
      setIsOpen(false)
      toast.success('Category created with Success')
    } else if (state.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    }
  }, [state])

  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-zinc-200 rounded-lg px-2 py-1 hover:bg-zinc-300 duration-300 transition-all flex justify-center items-center gap-1"
      >
        <Plus size={20} />
        <p>Create new Category</p>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed z-40 inset-0 bg-black/60"
            ></motion.div>
            <motion.form
              action={formAction}
              initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
              className="bg-white p-6 rounded-xl border-zinc-800 z-50 border-2 flex flex-col gap-3 justify-center items-center fixed w-fit h-fit inset-0 m-auto"
            >
              <h1 className="text-lg font-bold">Creting new Category</h1>
              <div className="flex justify-center items-center gap-2">
                <label>Category name:</label>
                <input
                  autoComplete="off"
                  name="name"
                  type="text"
                  className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                />
              </div>
              <div className="w-full text-end">
                <button className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 rounded-xl transition-all duration-300">
                  Create
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
export default Create
