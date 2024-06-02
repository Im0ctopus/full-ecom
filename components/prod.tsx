import { getProdImage } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

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

const Prod = async ({ prod }: { prod: TProd }) => {
  const image = await getProdImage(prod.id)
  return (
    <Link
      href={`/products/${prod.id}`}
      key={prod.id}
      className="w-full flex flex-col justify-end items-start gap-2 shadow-md hover:z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg p-4 relative"
    >
      <Image
        className="mx-auto max-h-[300px] select-none"
        draggable={false}
        src={`/img/${image}.jpg`}
        width={300}
        height={300}
        alt={prod.name + 'Picture'}
      />
      <h3 className="text-lg font-medium">{prod.name}</h3>
      <div className="flex justify-start items-center w-fit gap-2 relative flex-wrap">
        <div
          className={`relative ${
            prod.discount != 0 ? 'font-medium' : 'text-lg'
          }`}
        >
          {prod.discount != 0 && (
            <div className="bg-red-600 h-1 inset-0 my-auto absolute -rotate-6"></div>
          )}
          <h4>{prod.price}€</h4>
        </div>
        {prod.discount != 0 && (
          <h4 className="text-lg">
            {(prod.price - prod.discount!).toFixed(2)}€
          </h4>
        )}
      </div>
      {prod.discount != 0 && (
        <div className="bg-red-600 text-white px-2 py-1 rounded-xl absolute -right-5 top-1 rotate-45 z-10">
          On Sale
        </div>
      )}
    </Link>
  )
}
export default Prod
