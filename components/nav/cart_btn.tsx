'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import Cart from './cart'

const Cart_btn = ({ logged }: { logged: boolean }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden')
      }, 700)
    }
  }, [isCartOpen])

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="hover:scale-110 transition-all"
      >
        <ShoppingCart size={30} />
      </button>
      <Cart
        isCartOpen={isCartOpen}
        logged={logged}
        setIsCartOpen={setIsCartOpen}
      />
    </>
  )
}
export default Cart_btn
