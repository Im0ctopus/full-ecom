import { getSlides } from '@/lib/queries'
import { Metadata } from 'next'
import Slides from './slides'

export const metadata: Metadata = {
  title: 'Slides | The Store',
}

type TSlide = {
  id: number
  name: string
  active: number
}

const Page = async () => {
  const slides: TSlide[] = await getSlides()
  return (
    <div className="flex flex-col gap-10 justify-center items-center pt-20">
      <h1 className="text-5xl font-medium">Slides in the SlideShow</h1>
      <Slides serverSlides={slides} />
    </div>
  )
}
export default Page
