'use client'

import Image from 'next/image'
import { Pencil, Trash2 } from 'lucide-react'
import Edit from './edit'
import { useEffect, useState } from 'react'
import { handleDeleteProd } from '@/lib/actions'
import { toast } from 'sonner'
import { getProdImage } from '@/lib/queries'

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

const Prod = ({
  prod,
  index,
  categories,
}: {
  prod: TProd
  index: number
  categories: any
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false)
  const [image, setImage] = useState<number | null>(null)

  const getImage = async () => {
    setImage(await getProdImage(prod.id))
  }

  useEffect(() => {
    getImage()
  }, [])

  return (
    <>
      <div
        className={`flex justify-around w-full gap-6 items-center px-4 py-2 ${
          index % 2 != 0 && 'bg-zinc-100'
        }`}
      >
        {image == null ? (
          <div className="aspect-square w-12"></div>
        ) : (
          <Image
            src={`/img/${image}.jpg`}
            width={50}
            height={50}
            alt={`Picture of ${prod.name}`}
            draggable={false}
            className="rounded-md"
          />
        )}
        <p className="flex-1 text-ellipsis text-nowrap overflow-hidden font-medium text-lg">
          {prod.name}
        </p>
        <p className="font-medium text-lg">{prod.price}€</p>
        <p className="font-medium text-lg">{prod.discount ?? '0.00'}€</p>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setIsopen(true)}
            className="rounded-xl hover:bg-zinc-200 p-2 transition-all duration-300"
          >
            <Pencil />
          </button>
          <button
            onClick={async () => {
              const res = await handleDeleteProd(prod.id)
              if (res.message == 'Success') {
                setIsopen(false)
                toast.success('Product Deleted with Success')
              } else if (res.message == 'Error') {
                toast.error('An Error occurred! Please try again later.')
              }
            }}
            className="rounded-xl bg-red-300 hover:bg-red-400 p-2 transition-all duration-300"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <Edit
        isOpen={isOpen}
        setIsopen={setIsopen}
        prod={prod}
        categories={categories}
        getImage={getImage}
      />
    </>
  )
}
export default Prod
