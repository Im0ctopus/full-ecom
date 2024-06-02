import Image from 'next/image'
import DeleteImage from './deleteImg'
import { useEffect, useState } from 'react'
import { handlegetImages } from '@/lib/actions'

type TImage = {
  id: number
  productId: number
  name: string
  active: number | null
}

const ShowProdImages = ({
  prod_id,
  newImage,
}: {
  prod_id: number
  newImage: {
    message: string
  }
}) => {
  const [images, setImages] = useState<TImage[] | null>()
  const [del, setDel] = useState<boolean>(false)

  useEffect(() => {
    const fetchImages = async () => {
      const newImgs = await handlegetImages(prod_id)
      setImages(newImgs)
    }
    fetchImages()
  }, [newImage, del, prod_id])

  if (!images)
    return (
      <>
        <div className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl animate-skeleton"></div>
        <div className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl animate-skeleton"></div>
        <div className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl animate-skeleton"></div>
        <div className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl animate-skeleton"></div>
        <div className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl animate-skeleton"></div>
      </>
    )
  else if (images.length == 0) return <></>
  else {
    return (
      <>
        {images.map((img, index) => (
          <div
            key={index}
            className="h-32 w-32 shrink-0 bg-zinc-200 border-zinc-800 border-2 rounded-xl overflow-clip flex justify-center items-center relative"
          >
            <Image
              draggable={false}
              src={`/img/${img.id}.jpg`}
              width={300}
              height={300}
              alt="Picture of the author"
            />
            <div className="absolute top-1 right-1 flex flex-col justify-center items-end gap-2">
              <select
                defaultValue={img.active?.toString() ?? 'none'}
                name={`active${index}`}
                className="rounded-lg"
              >
                <option value="none">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <DeleteImage img_id={img.id} setDel={setDel} del={del} />
            </div>
          </div>
        ))}
      </>
    )
  }
}
export default ShowProdImages
