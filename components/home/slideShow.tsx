'use client'

import Image from 'next/image'
import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

type TSlide = {
  id: number
  name: string
  active: number
}

let dragAmount = 75

const SlideShow = ({ slides }: { slides: TSlide[] }) => {
  const x = useMotionValue(0)
  const [current, setCurrent] = useState<number>(0)

  const handleDragEnd = () => {
    console.log(current)
    let posX = x.get()
    console.log(posX)
    if (posX < -dragAmount && current + 1 < slides.length) {
      setCurrent(current + 1)
    } else if (posX > dragAmount && current - 1 >= 0) {
      setCurrent(current - 1)
    }
  }

  const timer = 5000
  useEffect(() => {
    const change = setInterval(() => {
      if (current + 1 >= slides.length) setCurrent(0)
      else setCurrent(current + 1)
    }, timer)
    return () => clearInterval(change)
  }, [current, slides.length])

  return (
    <div className="w-full flex flex-col justify-center items-center gap-1">
      <div className="w-full h-[500px] max-w-[1500px] overflow-clip">
        <motion.div
          onDragEnd={handleDragEnd}
          style={{ x }}
          drag={'x'}
          dragSnapToOrigin
          dragConstraints={{ left: -100, right: 100 }}
          animate={{ translateX: `-${current * 100}%` }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.2 }}
          dragMomentum={false}
          className="w-full h-full select-none flex justify-start items-center"
        >
          {slides.map((slide, index) => (
            <div
              draggable={false}
              key={index}
              className="w-full h-full shrink-0 relative cursor-grab active:cursor-grabbing"
            >
              <Image
                priority={index == current}
                draggable={false}
                fill
                src={`/slide/${slide.id}.jpg`}
                alt={slide.name}
                style={{ objectFit: 'fill' }}
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex w-fit gap-2 justify-center items-center hover:scale-125 transition-all duration-300 px-4 py-2">
        {slides.map((s, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className="relative w-3 h-3 rounded-full bg-zinc-300 cursor-pointer"
          >
            {current == index && (
              <motion.div
                layoutId="slide"
                transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
                className="bg-zinc-900 absolute inset-0 rounded-full z-10"
              ></motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default SlideShow
