import ProdsList from '@/components/home/prodsList'
import SlideShow from '@/components/home/slideShow'
import { getActiveSlides, getBestProds, getLatestProds } from '@/lib/queries'

type TSlide = {
  id: number
  name: string
  active: number
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

const Page = async () => {
  const slides: TSlide[] = await getActiveSlides()
  const bestProds: TProd[] = (await getBestProds()) as TProd[]
  const latestProds: TProd[] = (await getLatestProds()) as TProd[]
  return (
    <div
      id="top"
      className="flex flex-col justify-center items-center gap-20 pb-10"
    >
      <SlideShow slides={slides} />
      <ProdsList prods={bestProds} title="Our Best Products" />
      <ProdsList prods={latestProds} title="Our Latest Products" />
    </div>
  )
}
export default Page
