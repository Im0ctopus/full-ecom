import { getAllCategories, getAllProducts } from '@/lib/queries'
import Prods from './prods'

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

type TCat = {
  id: number
  name: string
}

const Page = async () => {
  const prods = (await getAllProducts()) as TProd[]
  const cats = (await getAllCategories()) as TCat[]
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[1500px] gap-8 pt-8 mx-auto px-20">
      <h1 className="text-5xl font-bold">Our Products</h1>
      <Prods
        prods={prods.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
          else return -1
        })}
        cats={cats}
      />
    </div>
  )
}
export default Page
