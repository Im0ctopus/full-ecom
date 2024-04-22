import { sql } from '@vercel/postgres'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const handleUser = async () => {
  const session = await getServerSession()
  if (!session?.user) return
  const id = await sql`INSERT INTO Users (email, roleId)
    SELECT ${session?.user?.email}, 1
    WHERE NOT EXISTS (
    SELECT 1 FROM Users WHERE email = ${session?.user?.email}
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
  prod_id: any
) => {
  const id = await sql`UPDATE Product
    SET name = ${prod_name},
    category = ${cat_id},
    price = ${price},
    discount = ${discount}
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

export const getImages = async (prod_id: number) => {
  const images = await sql`SELECT *
    FROM Image
    WHERE productId = ${prod_id};
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

export const updateImage = async (img_id: number, pos: number) => {
  const id = await sql`UPDATE Image
    SET Active = ${pos}
    WHERE id = ${img_id}
    RETURNING id;
  `
  return id.rows[0]
}
