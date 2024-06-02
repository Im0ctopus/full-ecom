import { getAllProducts, getProd, getProdImages } from '@/lib/queries'
import Images from './images'
import BuyButton from './buyButton'

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

export const dynamicParams = true

export async function generateStaticParams() {
  const prods = (await getAllProducts()) as TProd[]

  return prods.map((prod) => ({
    id: prod.id.toString(),
  }))
}

export default async function Page({ params }: { params: { id: number } }) {
  const prod = await getProd(params.id)
  const images = await getProdImages(params.id)
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-10 flex-wrap max-w-[1300px] pt-8 mx-auto mb-20">
      <Images images={images} />
      <div className="flex flex-col justify-center items-center md:items-start gap-10 col-span-2">
        <h1 className="text-3xl font-bold">{prod.name}</h1>
        <div className="flex justify-start items-center w-fit gap-2 relative flex-wrap -mt-10">
          <div
            className={`relative ${
              prod.discount != 0 ? 'font-medium text-lg' : 'text-xl'
            }`}
          >
            {prod.discount != 0 && (
              <div className="bg-red-600 h-1 inset-0 my-auto absolute -rotate-6"></div>
            )}
            <h4>{prod.price}€</h4>
          </div>
          {prod.discount != 0 && (
            <h4 className="text-xl">
              {(prod.price - prod.discount!).toFixed(2)}€
            </h4>
          )}
        </div>
        <BuyButton prodId={prod.id} />
      </div>
    </div>
  )
}
