import Cart_btn from './cart_btn'
import { getServerSession } from 'next-auth'
import More_button from './more_button'
import Login_button from './login_button'
import { handleUser, getRole } from '@/lib/queries'
import Link from 'next/link'

type TCart = {
  userId: number
  productId: number
  sizeId?: number | null
  amount: number
}

const Nav = async () => {
  const session = await getServerSession()
  handleUser()
  const role = await getRole()
  const cart: TCart[] = []

  return (
    <div className="h-20 w-full fixed flex justify-between items-center px-10 backdrop-blur-sm z-30">
      <More_button logged={session?.user ? true : false} role={role} />
      <Link href={'/'} className="text-3xl font-black text-">
        The Store
      </Link>
      <Cart_btn logged={session?.user ? true : false} cart={cart} />
    </div>
  )
}
export default Nav
