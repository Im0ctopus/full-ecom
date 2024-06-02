'use client'

import { handleDelSlide, handleSlideActive } from '@/lib/actions'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

type TSlide = {
  id: number
  name: string
  active: number
}

const Slide = ({
  slide,
  index,
  handleChange,
}: {
  slide: TSlide
  index: number
  handleChange: () => Promise<void>
}) => {
  const initialState = {
    message: '',
  }
  const [editState, editAction] = useFormState(handleSlideActive, initialState)
  useEffect(() => {
    if (editState.message == 'Success') {
      toast.success('Slide edited with Success')
      handleChange()
    } else if (editState.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    }
  }, [editState, handleChange])

  return (
    <form
      key={slide.id}
      action={editAction}
      className={`flex justify-around w-full gap-6 items-center px-4 py-2 backdrop-blur-sm sticky top-0 left-0 ${
        index % 2 == 0 ? 'bg-inherit' : 'bg-zinc-100'
      }`}
    >
      <Image
        src={`/slide/${slide.id}.jpg`}
        width={100}
        height={100}
        alt={slide.name}
        draggable={false}
      />
      <h1 className="flex-1 flex-grow max-w-full text-ellipsis overflow-hidden text-nowrap">
        {slide.name}
      </h1>
      <input
        name="id"
        type="number"
        value={slide.id}
        className="hidden"
        onChange={() => {}}
      />
      <select
        name="position"
        className="bg-zinc-200 active:border-b-zinc-300 rounded-lg w-20 py-1 disabled:hover:bg-zinc-200 hover:bg-zinc-300 transition-all duration-300 cursor-pointer disabled:cursor-default"
        defaultValue={slide.active}
      >
        <option value="none">None</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button className="px-2 py-1 bg-zinc-200 rounded-lg hover:bg-zinc-300 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-zinc-200">
        Save
      </button>
      <button
        onClick={async () => {
          const res = await handleDelSlide(slide.id)
          if (res == 1) {
            toast.success('Slide removed with Success')
            handleChange()
          } else if (res == 0) {
            toast.error('An Error occurred! Please try again later.')
          }
        }}
        className="w-8 h-8 bg-red-400 hover:bg-red-500 traansition-all duration-300 flex justify-center items-center rounded-lg"
        type="button"
      >
        <Trash2 size={20} />
      </button>
    </form>
  )
}
export default Slide
