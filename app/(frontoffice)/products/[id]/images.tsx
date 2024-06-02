'use client'

import { useState } from 'react'
import Image from 'next/image'

type TImages = {
  id: number
  name: string
}

export default function Images({ images }: { images: TImages[] }) {
  const [active, setActive] = useState<number>(images[0].id)
  return (
    <div className="flex flex-col justify-center items-center gap-5 basis-1/2 m-4 px-10 md:col-span-3">
      <Image
        src={`/img/${active}.jpg`}
        width={500}
        height={500}
        alt="Main Image"
        draggable={false}
        className="aspect-square w-full rounded-md select-none"
        priority
      />
      <div className="flex justify-center items-center w-full gap-2">
        {images.map((image) => (
          <Image
            key={image.id}
            onClick={() => setActive(image.id)}
            src={`/img/${image.id}.jpg`}
            width={100}
            height={100}
            alt="Main Image"
            draggable={false}
            className="aspect-square rounded-md select-none cursor-pointer"
            priority
          />
        ))}
      </div>
    </div>
  )
}
