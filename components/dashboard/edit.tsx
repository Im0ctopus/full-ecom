import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { handleEditForm } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { handleImageForm } from '@/lib/actions'
import ShowProdImages from './showImage'

type TProd = {
  id: number
  userId: number
  name: string
  price: number
  category: number
  sales: number
  main: number | null
  discount: number | null
}

const Edit = ({
  prod,
  isOpen,
  setIsopen,
  categories,
}: {
  prod: TProd
  isOpen: boolean
  setIsopen: Dispatch<SetStateAction<boolean>>
  categories: any
}) => {
  const initialState = {
    message: '',
  }
  const [state, formAction] = useFormState(handleEditForm, initialState)
  const [imageState, imageFormAction] = useFormState(
    handleImageForm,
    initialState
  )
  const [newImage, setNewImage] = useState<boolean>(false)

  useEffect(() => {
    if (state.message == 'Success') {
      setIsopen(false)
      toast.success('Product edited with Success')
    } else if (state.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    } else if (state.message == 'Missing') {
      toast.error('Please fill all the obligatory inputs!')
    } else if (state.message == 'Bigger') {
      toast.error("The discount can't be bigger than the product's price!")
    } else if (state.message == 'None') {
      toast.error(
        "Ensure that no image is in the 'none' position before proceeding."
      )
    } else if (state.message == 'Repeated') {
      toast.error(
        'Please ensure that each image has a distinct position assigned.'
      )
    }
  }, [state])

  useEffect(() => {
    if (imageState.message == 'Success') {
      toast.success('Image uploaded with Success')
      setNewImage(false)
    } else if (imageState.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    } else if (imageState.message == 'Too many') {
      toast.error(
        'You may only include up to 5 images per product. Please remove one image before attempting to upload again.'
      )
    }
  }, [imageState])

  useEffect(() => {
    setNewImage(false)
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden')
      }, 250)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsopen(false)}
            className="fixed bg-black/60 inset-0 z-40"
          ></motion.div>
          <motion.form
            action={formAction}
            initial={{ opacity: 0, scale: 0.8, y: 100, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 100, filter: 'blur(4px)' }}
            className="fixed inset-y-0 my-auto h-fit flex flex-col justify-center items-center w-[1000px] min-h-10 z-50 bg-white border-2 border-black rounded-lg py-5 gap-5"
          >
            <h1 className="text-2xl font-bold mb-5">Editing {prod.name}</h1>
            <input
              type="number"
              name="id"
              value={prod.id}
              onChange={() => {}}
              className="hidden"
            />
            <div className="flex justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-start">
                <label>Name:</label>
                <input
                  name="name"
                  autoComplete="off"
                  type="text"
                  placeholder="Name of the Product"
                  defaultValue={prod.name}
                  className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <label>Category:</label>
                <select
                  name="cat"
                  id=""
                  className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                  defaultValue={prod.category}
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
                  defaultValue={prod.price}
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
                  defaultValue={prod.discount ?? ''}
                  className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                />
              </div>
            </div>
            <div className="text-center w-10/12">
              <div className="flex flex-col justify-center items-start mx-auto max-w-full w-fit">
                <label>Product images:</label>
                <div className="flex justify-start items-center max-w-full overflow-x-auto gap-2">
                  <button
                    onClick={() => setNewImage(true)}
                    type="button"
                    className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl hover:bg-zinc-300 transition-all flex justify-center items-center text-zinc-800"
                  >
                    <Plus size={75} strokeWidth={1.5} />
                  </button>
                  <ShowProdImages prod_id={prod.id} newImage={imageState} />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end px-10">
              <button className="bg-zinc-200 hover:bg-zinc-300 px-2 py-1 rounded-xl transition-all duration-300 hover:scale-105">
                Save
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsopen(false)
              }}
              className="hover:bg-zinc-200 p-1 absolute top-3 rounded-full right-3 transition-all duration-300"
            >
              <X />
            </button>
          </motion.form>
          <AnimatePresence>
            {newImage && (
              <motion.form
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                action={imageFormAction}
                className="flex flex-col justify-center items-center gap-10 fixed bottom-10 z-50 bg-white px-14 py-10 rounded-xl border-zinc-800 border-2"
              >
                <div className="flex flex-col justify-center items-start">
                  <label>Upload Product Images:</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg"
                    placeholder="Upload an Image"
                    className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
                  />
                </div>
                <div className="flex flex-col justify-center items-start">
                  <input
                    type="number"
                    name="id"
                    value={prod.id}
                    className="hidden"
                    onChange={() => {}}
                  />
                  <button className="bg-zinc-200 px-14 py-3 rounded-lg hover:bg-zinc-300">
                    Upload Image
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setNewImage(false)}
                  className="hover:bg-zinc-200 p-1 absolute top-3 rounded-full right-3 transition-all duration-300"
                >
                  <X />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
export default Edit
