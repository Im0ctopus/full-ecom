import ClientProd from '@/components/clientProd'
import { getCateProds, getCategories, getCategory } from '@/lib/queries'

type TCat = {
  id: number
  name: string
}

export const dynamicParams = true

export async function generateStaticParams() {
  const cats = (await getCategories()) as TCat[]

  return cats.map((cat) => ({
    id: cat.id.toString(),
  }))
}

type TParams = {
  id: number
}

export default async function Page({ params }: { params: TParams }) {
  const cat = await getCategory(params.id)
  const prods = await getCateProds(params.id)
  return (
    <div className="flex justify-center items-center flex-col gap-8 pt-8 w-full max-w-[1500px] mx-auto px-10">
      <h1 className="text-5xl font-bold">Products marked as {cat.name}</h1>
      {prods.length > 0 ? (
        <div className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {prods.map((prod) => (
            <ClientProd prod={prod} key={prod.id} />
          ))}
        </div>
      ) : (
        <h1 className="text-xl font-medium">This category has no Products</h1>
      )}
    </div>
  )
}
