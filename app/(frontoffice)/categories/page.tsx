import { getCategories } from '@/lib/queries'
import Link from 'next/link'

type TCat = {
  id: number
  name: string
}

const Page = async () => {
  const categories = (await getCategories()) as TCat[]
  return (
    <div className="pt-8 flex flex-col justify-center items-center w-full gap-8">
      <h1 className="text-5xl font-bold">Our Categories</h1>
      <div className="flex justify-center items-center w-full max-w-[1500px] flex-wrap gap-5">
        {categories.length == 0 ? (
          <h1>The Store as no current Categoies please check again later.</h1>
        ) : (
          categories.map((cat) => (
            <Link
              className="px-2 py-1 rounded-lg bg-zinc-200 hover:bg-zinc-300 transition-all duration-300 text-lg font-medium"
              key={cat.id}
              href={'/categories/' + cat.id}
            >
              {cat.name}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
export default Page
