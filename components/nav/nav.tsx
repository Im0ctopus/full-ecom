'use client'

import Cart_btn from './cart_btn'
import { useSession } from 'next-auth/react'
import More_button from './more_button'
import { getRole } from '@/lib/queries'
import { useEffect, useState } from 'react'

const Nav = () => {
  const { data: session } = useSession()
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    const getR = async () => {
      setRole(await getRole())
    }
    getR()
  }, [])

  return (
    <div className="h-20 w-full fixed flex justify-between items-center px-10 backdrop-blur-sm z-30">
      <More_button logged={session?.user ? true : false} role={role} />
      <a href={'/#top'} className="text-3xl font-black text-">
        The Store
      </a>
      <Cart_btn logged={session?.user ? true : false} />
    </div>
  )
}
export default Nav
