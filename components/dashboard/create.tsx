'use client'

import { handleAddForm } from '@/lib/actions'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

const Create = ({ categories }: { categories: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const initialState = {
    message: '',
  }
  const [state, formAction] = useFormState(handleAddForm, initialState)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden')
      }, 250)
    }
  }, [isOpen])

  useEffect(() => {
    if (state.message == 'Success') {
      setIsOpen(false)
      toast.success('Product added with Success')
    } else if (state.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    } else if (state.message == 'Missing') {
      toast.error('Please fill all the obligatory inputs!')
    } else if (state.message == 'Bigger') {
      toast.error("The discount can't be bigger than the product price!")
    }
  }, [state])

  return (
    <>
      <div className="-mb-9 w-full flex justify-end items-center pr-[13%]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-zinc-200 rounded-lg px-2 py-1 hover:bg-zinc-300 duration-300 transition-all flex justify-center items-center gap-1"
        >
          <Plus size={20} />
          <p>Add Product</p>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/60 inset-0 fixed z-40"
            ></motion.div>
            <motion.form
              action={formAction}
              initial={{ opacity: 0, scale: 0.8, y: 100, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, y: 100, filter: 'blur(4px)' }}
              className="fixed inset-y-0 h-fit my-auto flex flex-col justify-center items-center w-[1000px] min-h-10 z-50 bg-white border-2 border-black rounded-lg py-5 gap-5"
            >
              <h1 className="text-2xl font-bold mb-5">Adding Product</h1>
              <div className="flex justify-center items-center gap-10">
                <div className="flex flex-col justify-center items-start">
                  <label>Name:</label>
                  <input
                    autoComplete="off"
                    name="name"
                    type="text"
                    placeholder="Name of the Product"
                    className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <label>Category:</label>
                  <select
                    name="cat"
                    id=""
                    className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                  >
                    {categories ? (
                      categories.map((c: any, i: number) => (
                        <option key={i} value={c.id}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex flex-col justify-center items-start">
                  <label>Price:</label>
                  <input
                    name="price"
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="Price of the Product"
                    className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <label>Discount:</label>
                  <input
                    name="discount"
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="Make a discount"
                    className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                  />
                </div>
              </div>
              <div className="w-full flex justify-end px-10">
                <button className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 rounded-xl transition-all duration-300 hover:scale-105">
                  Save
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
