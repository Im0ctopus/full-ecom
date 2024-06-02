'use server'

import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const handleUser = async (email: string) => {
  const id = await sql`INSERT INTO Users (email, roleId)
    SELECT ${email}, 1
    WHERE NOT EXISTS (
    SELECT 1 FROM Users WHERE email = ${email}
    );
    `
}

export const getUserId = async () => {
  const session = await getServerSession()
  if (!session?.user) return null
  const id = await sql`SELECT id
    FROM Users
    WHERE email = ${session.user.email};
  `
  return id.rows[0].id
}

export const getRole = async () => {
  const session = await getServerSession()
  const role = await sql`SELECT Users.email, Role.name AS user_role
    FROM Users
    JOIN Role ON Users.roleId = Role.id
    WHERE Users.email = ${session?.user?.email};
  `
  if (!role.rows[0]) return ''
  return role.rows[0].user_role
}

export const getProductNumber = async () => {
  const number = await sql`SELECT COUNT(*) AS product_count
    FROM Product;
  `
  return number.rows[0].product_count
}

export const getSalesNumber = async () => {
  const sales = await sql`SELECT SUM(sales) AS total_sales
    FROM Product;
  `
  return sales.rows[0].total_sales
}

export const getAllProducts = async () => {
  const prods = await sql`SELECT *
    FROM Product;`
  return prods.rows
}

export const getAllCategories = async () => {
  const cats = await sql`SELECT *
    FROM Category;
  `
  return cats.rows
}

export const editProduct = async (
  prod_name: any,
  cat_id: any,
  price: any,
  discount: any,
  prod_id: any,
  main: boolean
) => {
  const id = await sql`UPDATE Product
    SET name = ${prod_name},
    category = ${cat_id},
    price = ${price},
    discount = ${discount},
    main = ${main}
    WHERE id = ${prod_id} RETURNING id;
  `
  return id.rows[0]
}

export const addProduct = async (
  prod_name: any,
  cat_id: any,
  price: any,
  discount: any
) => {
  const user_id = await getUserId()
  const id =
    await sql`INSERT INTO Product (userId, name, price, category, discount)
      VALUES (${user_id}, ${prod_name}, ${price}, ${cat_id}, ${discount})
      RETURNING id;
    `
  return id.rows[0]
}

export const deleteProd = async (prod_id: number) => {
  const id = await sql`DELETE FROM Product WHERE id = ${prod_id}
    RETURNING id;
  `
  return id.rows[0]
}

export const addImage = async (prod_id: any, image_name: any) => {
  const id = await sql`INSERT INTO Image (productId, name)
    VALUES (${prod_id}, ${image_name})
    RETURNING id;
  `
  return id.rows[0]
}

export const addSlide = async (image_name: any) => {
  const id = await sql`INSERT INTO slide (name)
    VALUES (${image_name})
    RETURNING id;
  `
  return id.rows[0]
}

export const getImages = async (prod_id: number) => {
  const images = await sql`SELECT *
    FROM Image
    WHERE productId = ${prod_id}
    ORDER by active;
  `
  return images.rows
}

export const delImg = async (img_id: number) => {
  const id = await sql`DELETE FROM Image
    WHERE id = ${img_id}
    RETURNING id;
  `
  return id.rows
}

export const delSlide = async (slideId: number) => {
  const id = await sql`DELETE FROM slide
    WHERE id = ${slideId}
    RETURNING id;
  `
  return id.rows
}

export const updateImage = async (img_id: number, pos: number) => {
  const id = await sql`UPDATE Image
    SET Active = ${pos}
    WHERE id = ${img_id}
    RETURNING id;
  `
  return id.rows[0]
}

export const getMainProds = async () => {
  const prods = await sql`SELECT *
    FROM Product
    WHERE Main = true;
  `
  return prods.rows
}

export const getAllUsers = async () => {
  const users = await sql`SELECT *
    FROM Users
    ORDER BY id;
  `
  return users.rows
}

export const getAllRoles = async () => {
  const role = await sql`SELECT *
    FROM Role
    ORDER BY id;
  `
  return role.rows
}

export const editUserRole = async (role: number, id: number) => {
  const user_role = await getRole()
  if (user_role != 'Owner') return
  const role_id = await sql`UPDATE Users
    SET roleId = ${role}
    WHERE id = ${id}
    RETURNING id;
  `
  return role_id.rows[0]
}

type TSlide = {
  id: number
  name: string
  active: number
}

export const getSlides = async () => {
  const slides = await sql`SELECT * FROM slide`
  return slides.rows as TSlide[]
}

export const getActiveSlides = async () => {
  const slides = await sql`SELECT * FROM Slide
    WHERE active IS NOT NULL
    ORDER BY active;
  `
  return slides.rows as TSlide[]
}

export const editSlideActive = async (slideId: number, position: string) => {
  const pos = position == 'none' ? null : position
  const id = await sql`
  UPDATE slide
  SET active = ${pos}
  WHERE id = ${slideId}
  RETURNING id;`
  return id.rows[0]
}

export const updateSales = () => {
  revalidatePath('/backoffice')
}

export const getProdImage = async (prodId: number) => {
  const id = await sql`SELECT id
      FROM Image
      WHERE productId = ${prodId}
      ORDER BY Active ASC
      LIMIT 1;
    `
  if (id.rows[0]) return id.rows[0].id as number
  else return null
}

export const getBestProds = async () => {
  const prods = await sql`SELECT *
      FROM Product
      WHERE Main = true
      ORDER BY sales DESC
      LIMIT 8;
    `
  return prods.rows
}

export const getLatestProds = async () => {
  const prods = await sql`SELECT *
      FROM Product
      ORDER BY id DESC
      LIMIT 6;
    `
  return prods.rows
}

export const getCategories = async () => {
  const cats = await sql`SELECT *
      FROM Category;`
  return cats.rows
}

export const createCat = async (name: string) => {
  const res = await sql`INSERT INTO Category (name)
      VALUES (${name})
      RETURNING id;`
  return res.rows[0]
}

export const delCat = async (id: number) => {
  const res = await sql`DELETE FROM Category
      WHERE id = ${id}
      RETURNING id;
  `
  console.log(res)
  if (res.rows[0]) {
    revalidatePath('/backoffice/categories')
    revalidatePath('/backoffice')
    revalidatePath('/categories')
    return true
  } else return false
}

export async function getCategory(id: number) {
  const cat = await sql`SELECT * FROM category WHERE id=${id}`
  return cat.rows[0] as { id: number; name: string }
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

export async function getCateProds(id: number) {
  const prods = await sql`SELECT * FROM product WHERE category = ${id}`
  return prods.rows as TProd[]
}

export async function getProd(prodId: number) {
  const prod = await sql`SELECT * FROM product WHERE id = ${prodId}`
  return prod.rows[0] as TProd
}

type TImages = {
  id: number
  name: string
}

export async function getProdImages(prodId: number) {
  const images =
    await sql`SELECT * FROM image WHERE productid = ${prodId} AND active IS NOT NULL ORDER BY active;`
  return images.rows as TImages[]
}

type TCart = {
  id: number
  userid: number
  productid: number
  amount: number
}

export async function getCartFromUser() {
  const userId: number = await getUserId()
  const cart = await sql`SELECT * FROM cart WHERE userid = ${userId}`
  return cart.rows as TCart[]
}

export async function updateCartProduct(productId: number, amount: number) {
  const userId = await getUserId()
  const res = await sql`UPDATE Cart
    SET amount = ${amount}
    WHERE productId = ${productId} AND userid = ${userId}
    RETURNING id;
  `
  return res.rows[0]
}

export async function createCart(prodId: number) {
  const userId = await getUserId()
  const res = await sql`INSERT INTO Cart (userId, productId, amount)
    VALUES (${userId}, ${prodId}, 1)
    RETURNING id;
  `
  return res.rows[0]
}

export async function removeFromCart(prodId: number) {
  const userId = await getUserId()
  const res = await sql`DELETE FROM Cart
    WHERE productId = ${prodId}
    AND userId = ${userId}
    RETURNING id;
  `
  return res.rows[0]
}
