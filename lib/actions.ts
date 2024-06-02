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
  getMainProds,
  editUserRole,
  addSlide,
  delSlide,
  editSlideActive,
  createCat,
  getCartFromUser,
  updateCartProduct,
  createCart,
} from './queries'
import { writeFile } from 'fs/promises'

export const handleEditForm = async (prevState: any, formData: FormData) => {
  const id: number = formData.get('id') as unknown as number
  const name = formData.get('name')
  const cat = formData.get('cat')
  const price = formData.get('price')
  const main = formData.get('main')
  let discount: any = formData.get('discount')
  const newPositions = [
    formData.get('active0'),
    formData.get('active1'),
    formData.get('active2'),
    formData.get('active3'),
    formData.get('active4'),
  ]
  const mainProds = await getMainProds()
  if (mainProds.filter((p) => p.id == id).length == 0) {
    if (main && mainProds.length > 6) {
      return {
        message: 'Too many',
      }
    }
  }
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
  const res = await editProduct(
    name,
    cat,
    price,
    discount ?? 0,
    id,
    main ? true : false
  )
  if (res) {
    revalidatePath('/backoffice')
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath('/products/' + id)
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

export const handleSlideForm = async (prevState: any, formData: FormData) => {
  const image: File | null = formData.get('image') as unknown as File
  if (image.size == 0) {
    return {
      message: 'No Image',
    }
  }
  const res = await addSlide(image.name)

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = 'public/slide/' + res.id + '.jpg'
  await writeFile(path, buffer)
  revalidatePath('/backoffice/slides')
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

export const handleEditUserRole = async (
  prevState: any,
  formData: FormData
) => {
  const role: number = formData.get('role') as unknown as number
  const user_id: number = formData.get('id') as unknown as number
  if (role == 4) {
    return {
      message: '4',
    }
  }
  const res = await editUserRole(role, user_id)
  if (res) {
    revalidatePath('/backoffice/users')
    return {
      message: 'Success',
    }
  } else {
    return {
      message: 'Error',
    }
  }
}

export const handleDelSlide = async (slideId: number) => {
  const res = await delSlide(slideId)
  if (res) {
    revalidatePath('/backoffice/slides')
    revalidatePath('/')
    return 1
  } else return 0
}

export const handleSlideActive = async (prevState: any, formData: FormData) => {
  const slideId: number = formData.get('id') as unknown as number
  const position: string = formData.get('position') as string
  const res = await editSlideActive(slideId, position)
  if (res) {
    revalidatePath('/backoffice/slides')
    revalidatePath('/')
    return {
      message: 'Success',
    }
  } else {
    return {
      message: 'Error',
    }
  }
}

export const handleCreateCat = async (prevState: any, formData: FormData) => {
  const name: string = formData.get('name') as string
  const res = await createCat(name)
  if (res) {
    revalidatePath('/backoffice/categories')
    revalidatePath('/backoffice')
    revalidatePath('/categories')
    return {
      message: 'Success',
    }
  } else {
    return {
      message: 'Error',
    }
  }
}

export async function handleBuyprod(prodId: number) {
  //verify if the product is already on the cart
  const cart = await getCartFromUser()
  const filteredCart = cart.filter((c) => c.productid == prodId)
  if (filteredCart.length > 0) {
    //The product is already on the cart, updating it
    const res = await updateCartProduct(prodId, filteredCart[0].amount + 1)
    if (res) return 1
    else return 0
  } else {
    //The product is not on the cart, creating it
    const res = await createCart(prodId)
    if (res) return 1
    else return 0
  }
}
