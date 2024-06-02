import {
  getProductNumber,
  getSalesNumber,
  getAllProducts,
  getAllCategories,
} from '@/lib/queries'
import Prod from '@/components/dashboard/prod'
import Guide from '@/components/dashboard/guide'
import Create from '@/components/dashboard/create'
import { Metadata } from 'next'
import Refresh from '@/components/dashboard/refresh'

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

export const metadata: Metadata = {
  title: 'Dashboard | The Store',
}

const Page = async () => {
  const prods: any = await getAllProducts()
  const categories = await getAllCategories()

  return (
    <div className="flex flex-col justify-start items-center pt-20 gap-10 h-screen overflow-clip">
      <div className="flex justify-around items-center px-10 w-full max-w-[1200px]">
        <div className="basis-1/2 max-w-96 py-12 text-center bg-zinc-200 rounded-xl border-2 border-zinc-700 text-xl font-medium">
          <span className="font-bold underline">
            {await getProductNumber()}
          </span>{' '}
          Store Products
        </div>
        <div className="basis-1/2 max-w-96 py-12 text-center bg-zinc-200 rounded-xl border-2 border-zinc-700 text-xl font-medium relative">
          <span className="font-bold underline">
            {(await getSalesNumber()) ?? 0}
          </span>{' '}
          Sales
          <Refresh />
        </div>
      </div>
      <h1 className="w-full text-center text-5xl font-medium pt-6">
        The Store Products
      </h1>
      <Create categories={categories} />
      <div className="border-4 border-zinc-700 w-3/4 rounded-lg h-full mb-10 overflow-auto flex flex-col justify-start items-center max-h-[550px] max-w-[1200px] relative">
        <Guide />
        {prods ? (
          prods.map((prod: TProd, index: number) => (
            <Prod
              prod={prod}
              key={prod.id}
              index={index}
              categories={categories}
            />
          ))
        ) : (
          <h1 className="w-full h-full flex justify-center items-center">
            The Store has no products
          </h1>
        )}
      </div>
    </div>
  )
}
export default Page
