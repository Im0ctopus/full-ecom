import {
  getProd,
  getProdImage,
  removeFromCart,
  updateCartProduct,
} from '@/lib/queries'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import { toast } from 'sonner'

type TCart = {
  id: number
  userid: number
  productid: number
  amount: number
}

type TProd = {
  id: number
  userId: number
  name: string
  price: number
  category: number
  sales: number
  main: boolean
  discount: number | null
}

export default function Product({
  c,
  getCart,
}: {
  c: TCart
  getCart(): Promise<void>
}) {
  const [product, setProduct] = useState<TProd | null>(null)
  const [productImg, setProductImg] = useState<number | null>(null)
  const [amount, setAmount] = useState<number>(c.amount)
  async function getProdInfo() {
    setProduct(await getProd(c.productid))
    setProductImg(await getProdImage(c.productid))
  }
  useEffect(() => {
    getProdInfo()
  }, [])
  if (product != null && productImg != null)
    return (
      <div key={c.id} className="grid grid-cols-3 gap-5 w-full px-2 py-3">
        <div className="flex justify-center items-center flex-col gap-2 w-full">
          <Image
            className="mx-auto w-full aspect-square select-none rounded-lg"
            draggable={false}
            src={`/img/${productImg}.jpg`}
            width={75}
            height={75}
            priority
            alt={product.name + 'Picture'}
          />
          <div className="flex justify-between w-full border-2 border-black rounded-lg overflow-clip">
            <button
              onClick={async () => {
                if (amount - 1 == 0) {
                  const res = await removeFromCart(product.id)
                  if (!res)
                    toast.success(
                      'Error removing your item, please try again later!'
                    )
                  getCart()
                } else {
                  setAmount(amount - 1)
                  const res = await updateCartProduct(product.id, amount - 1)
                  if (!res)
                    toast.success(
                      'Error updating your item, please try again later!'
                    )
                }
              }}
              className="flex basis-1/4 justify-center items-center hover:bg-zinc-200 transition-all"
            >
              <Minus size={15} />
            </button>
            <p className="text-xl basis-1/2 font-semibold text-center ">
              {amount}
            </p>
            <button
              onClick={async () => {
                setAmount(amount + 1)
                const res = await updateCartProduct(product.id, amount + 1)
                if (!res)
                  toast.success(
                    'Error updating your item, please try again later!'
                  )
              }}
              className="flex basis-1/4 justify-center items-center hover:bg-zinc-200 transition-all"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-start items-start w-fit py-2">
          <h1 className="text-lg font-medium">{product.name}</h1>
          <h2>{(product.price - product.discount!).toFixed(2)}€</h2>
        </div>
        <div className="flex flex-col gap-2 justify-start items-center w-full py-2">
          <h2 className="text-lg font-bold">
            {((product.price - product.discount!) * amount).toFixed(2)}€
          </h2>
          <button
            onClick={async () => {
              const res = await removeFromCart(product.id)
              if (!res)
                toast.success(
                  'Error removing your item, please try again later!'
                )
              getCart()
            }}
            className="bg-red-500 hover:bg-red-600 transition-all px-2 py-1 rounded-lg text-white"
          >
            Remove
          </button>
        </div>
      </div>
    )
  else return <div className="w-full h-36 animate-skeleton rounded-lg"></div>
}
