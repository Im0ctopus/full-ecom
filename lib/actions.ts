'use server'

import { revalidatePath } from 'next/cache'
import {
  addImage,
  addProduct,
  deleteProd,
  editProduct,
  delImg,
  getImages,
  updateImage,
} from './queries'
import { writeFile } from 'fs/promises'

export const handleEditForm = async (prevState: any, formData: FormData) => {
  const id: number = formData.get('id') as unknown as number
  const name = formData.get('name')
  const cat = formData.get('cat')
  const price = formData.get('price')
  let discount: any = formData.get('discount')

  const newPositions = [
    formData.get('active0'),
    formData.get('active1'),
    formData.get('active2'),
    formData.get('active3'),
    formData.get('active4'),
  ]
  if (newPositions.includes('none'))
    return {
      message: 'None',
    }
  const positionSet = new Set(newPositions.filter((p) => p != null))
  const images = await getImages(id)
  if (positionSet.size != images.length)
    return {
      message: 'Repeated',
    }
  if (!discount) discount = 0
  if (name == '' || cat == '' || price == '')
    return {
      message: 'Missing',
    }
  if (parseFloat(price!.toString()) < parseFloat(discount)) {
    return {
      message: 'Bigger',
    }
  }
  for (let i = 0; i < images.length; i++) {
    const imres = await updateImage(
      images[i].id,
      newPositions[i] as unknown as number
    )
    if (!imres)
      return {
        message: 'Error',
      }
  }
  const res = await editProduct(name, cat, price, discount ?? 0, id)
  if (res) {
    revalidatePath('/backoffice')

    return {
      message: 'Success',
    }
  } else
    return {
      message: 'Error',
    }
}

export const handleImageForm = async (prevState: any, formData: FormData) => {
  const prod_id: number = formData.get('id') as unknown as number
  const existingImages = await getImages(prod_id)
  console.log(existingImages)
  if (existingImages.length >= 5)
    return {
      message: 'Too many',
    }
  const image: File | null = formData.get('image') as unknown as File
  if (image.size == 0) {
    return {
      message: 'No Image',
    }
  }
  const res = await addImage(prod_id, image.name)

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = 'public/img/' + res.id + '.jpg'
  await writeFile(path, buffer)
  return {
    message: 'Success',
  }
}

export const handleAddForm = async (prevState: any, formData: FormData) => {
  const name = formData.get('name')
  const cat = formData.get('cat')
  const price = formData.get('price')
  let discount: any = formData.get('discount')
  if (!discount) discount = 0
  if (name == '' || cat == '' || price == '')
    return {
      message: 'Missing',
    }
  if (parseFloat(price!.toString()) < parseFloat(discount)) {
    console.log('wtf')
    return {
      message: 'Bigger',
    }
  }
  const res = await addProduct(name, cat, price, discount)
  if (res) {
    revalidatePath('/backoffice')

    return {
      message: 'Success',
    }
  } else
    return {
      message: 'Error',
    }
}

export const handleDeleteProd = async (id: number) => {
  const res = await deleteProd(id)
  if (res) {
    revalidatePath('/backoffice')
    return {
      message: 'Success',
    }
  } else
    return {
      message: 'Error',
    }
}

export const handleDeleteImage = async (img_id: number) => {
  const res = await delImg(img_id)
  if (res) {
    revalidatePath('/backoffice')
    return {
      message: 'Success',
    }
  } else
    return {
      message: 'Error',
    }
}

type TImage = {
  id: number
  productId: number
  name: string
  active: number | null
}

export const handlegetImages = async (prod_id: number) => {
  const images: TImage[] = (await getImages(prod_id)) as TImage[]
  return images
}
