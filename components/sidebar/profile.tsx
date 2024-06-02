'use client'

import Image from 'next/image'
import Logout_button from '../nav/logout_button'
import { useSession } from 'next-auth/react'
import { getRole } from '@/lib/queries'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Profile = () => {
  const { data: session } = useSession()
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    const getR = async () => {
      setRole(await getRole())
    }
    getR()
  }, [])

  return (
    <div className="flex-grow flex-1 flex flex-col justify-end items-center pb-3 gap-6">
      <div className="flex justify-center items-center w-full gap-6">
        {session ? (
          <Image
            draggable={false}
            src={session?.user?.image!}
            width={50}
            height={50}
            alt={session?.user?.name ?? 'Loading...'}
            className="rounded-full select-none"
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          <h1 className="text-lg font-bold uppercase">{session?.user?.name}</h1>
          <p className="w-full text-center text-sm">{role}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Link
          className="text font-bold hover:scale-105 transition-all py-1 px-4 bg-zinc-900 rounded-3xl hover:bg-zinc-950"
          href={'/'}
        >
          Go to The Store
        </Link>
        <Logout_button />
      </div>
    </div>
  )
}
export default Profile
