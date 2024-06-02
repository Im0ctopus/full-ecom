import { getCategories } from '@/lib/queries'
import Create from './create'
import DelButton from './delButton'

type TCat = {
  id: number
  name: string
}

const Categories = async () => {
  const categories = (await getCategories()) as TCat[]
  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-20">
      <h1 className="text-5xl font-medium">Categories</h1>
      <div className="flex flex-col justify-center items-end w-full max-w-[1200px] gap-1">
        <Create />
        <div className="border-4 border-zinc-700 flex-grow flex-1 w-full rounded-lg max-w-[1200px] relative">
          <div className="flex justify-around w-full gap-6 items-center px-4 py-2 backdrop-blur-sm sticky top-0 bg-white/20 left-0 border-b-2 border-black">
            <h1 className="flex-1 flex-grow">Name</h1>
            <h1 className="w-20 text-center">Delete</h1>
          </div>
          {categories.length == 0 ? (
            <h1 className="w-full text-center py-2">
              There are currently no categories.
            </h1>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-around w-full gap-6 items-center px-4 py-2 backdrop-blur-sm sticky top-0 bg-white/20 left-0 border-b-2 border-black"
              >
                <h1 className="flex-1 flex-grow">{cat.name}</h1>
                <DelButton id={cat.id} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
export default Categories
