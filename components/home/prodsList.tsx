import Prod from '../prod'

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

const ProdsList = async ({
  prods,
  title,
}: {
  prods: TProd[]
  title: string
}) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-start w-full max-w-[1500px] px-10">
      <h1 className="text-5xl font-bold">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {prods.length == 0 ? (
          <h1>There is no Products on this category</h1>
        ) : (
          prods.map((prod, index) => <Prod key={prod.id} prod={prod} />)
        )}
      </div>
    </div>
  )
}
export default ProdsList
