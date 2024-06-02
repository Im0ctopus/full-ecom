'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddSlide from './addSlide'
import Slide from './slide'
import { getSlides } from '@/lib/queries'

type TSlide = {
  id: number
  name: string
  active: number
}

const Slides = ({ serverSlides }: { serverSlides: TSlide[] }) => {
  const [slides, setSlides] = useState<TSlide[]>(
    serverSlides.sort((a, b) => b.active - a.active)
  )

  const [filteredSlides, setFilteresSlides] = useState<TSlide[]>(slides)

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setFilteresSlides(
      slides.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, slides])

  const handleChange = async () => {
    let newSlides: TSlide[] = await getSlides()
    setSlides(newSlides)
    newSlides = newSlides.sort((a, b) => b.active - a.active)
    setFilteresSlides(
      newSlides.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  return (
    <div className="max-w-[1200px] w-full flex flex-col justify-center items-center gap-2">
      <div className="w-full relative flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Slide name"
          className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 my-auto left-48 w-8 rounded-r-lg"
          >
            <X />
          </button>
        )}
        <AddSlide handleChange={handleChange} />
      </div>
      <div className="w-full flex flex-col justify-center items-center border-4 border-zinc-700 rounded-lg relative">
        <div className="flex justify-around w-full gap-6 items-center px-4 py-2 backdrop-blur-sm sticky top-0 bg-white/20 left-0 border-b-2 border-black">
          <h1 className="w-28">Preview</h1>
          <h1 className="flex-1 flex-grow">Name</h1>
          <h1 className="w-24">Position</h1>
          <h1 className="w-24 text-center">Actions</h1>
        </div>
        {slides.length == 0 ? (
          <h1 className="w-full text-center py-2">
            There are currently no slides
          </h1>
        ) : filteredSlides.length == 0 ? (
          <h1 className="w-full text-center py-2">
            There are currently no slides for the current filter
          </h1>
        ) : (
          filteredSlides.map((s, index) => (
            <Slide
              key={index}
              slide={s}
              index={index}
              handleChange={handleChange}
            />
          ))
        )}
      </div>
    </div>
  )
}
export default Slides
