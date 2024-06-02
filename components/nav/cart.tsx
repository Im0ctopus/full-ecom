import { AnimatePresence, motion } from 'framer-motion'
import { X, LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Login_button from './login_button'
import { getCartFromUser } from '@/lib/queries'
import Product from './product'
import Link from 'next/link'

type TCart = {
  id: number
  userid: number
  productid: number
  amount: number
}

const Cart = ({
  logged,
  isCartOpen,
  setIsCartOpen,
}: {
  logged: boolean
  isCartOpen: boolean
  setIsCartOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [cart, setCart] = useState<TCart[] | null>(null)

  async function getCart() {
    setCart(null)
    const cart = await getCartFromUser()
    setCart(cart)
  }

  useEffect(() => {
    getCart()
  }, [isCartOpen])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed bg-black/60 inset-0 w-screen h-screen z-40"
          ></motion.div>
          <motion.div
            initial={{ x: 390 }}
            animate={{ x: 10 }}
            exit={{ x: 390 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            className="z-50 w-96 h-screen fixed top-0 right-0 border-l border-black bg-white flex flex-col justify-start items-center p-5 pr-7"
          >
            <div className="flex justify-between w-full shrink-0">
              <h1 className="font-medium text-3xl">Your Cart</h1>
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:scale-110 transition-all"
              >
                <X size={40} strokeWidth={1} />
              </button>
            </div>
            {!logged ? (
              <div className="h-full w-full flex flex-col justify-center items-center gap-3">
                <h1 className="text-xl">Please log in first</h1>
                <Login_button />
              </div>
            ) : cart == null ? (
              <Loading />
            ) : cart.length == 0 ? (
              <div className="h-full w-full flex justify-center items-center">
                <h1 className="text-xl">Your cart is empty</h1>
              </div>
            ) : (
              <>
                <div className="flex flex-col flex-grow flex-1 justify-start overflow-y-auto items-center divide-y-2 divide-black p-4 w-full mt-10 ">
                  {cart.map((c) => (
                    <Product getCart={getCart} key={c.id} c={c} />
                  ))}
                </div>
                <Link
                  href={'/checkout'}
                  className="w-full bg-black text-white text-center py-5 text-lg font-bold active:scale-95 cursor-pointer"
                >
                  Check Out
                </Link>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
export default Cart

function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <LoaderCircle size={80} strokeWidth={1} className="animate-spin" />
    </div>
  )
}
