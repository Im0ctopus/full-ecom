import { AnimatePresence, motion } from 'framer-motion'
import { X, Diamond } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import Login_button from './login_button'
import Logout_button from './logout_button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const More = ({
  isOpen,
  setIsOpen,
  logged,
  role,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  logged: boolean
  role: string
}) => {
  const { data: session } = useSession()
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed bg-black/60 inset-0 w-screen h-screen z-40"
          ></motion.div>
          <motion.div
            initial={{ x: -290 }}
            animate={{ x: -10 }}
            exit={{ x: -290 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            className="z-50 w-72 h-screen fixed top-0 left-0 border-r border-black bg-white flex flex-col justify-start items-center p-5 pr-7 gap-5"
          >
            <div className="flex justify-end w-full">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:scale-110 transition-all"
              >
                <X size={40} strokeWidth={1} className="mt-1" />
              </button>
            </div>
            <div className="flex flex-col w-full justify-start items-start">
              <Link
                onClick={() => setIsOpen(false)}
                href={'/'}
                className="group flex justify-start items-center gap-2 pl-3 cursor-pointer hover:underline transition-all py-1"
              >
                <Diamond
                  size={20}
                  className="mt-[3px] group-hover:scale-125 transition-all group-hover:rotate-180"
                />
                <h3 className="text-xl font-medium transition-all group-hover:translate-x-5">
                  All Products
                </h3>
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href={'/'}
                className="group flex justify-start items-center gap-2 pl-3 cursor-pointer hover:underline transition-all py-1"
              >
                <Diamond
                  size={20}
                  className="mt-[3px] group-hover:scale-125 transition-all group-hover:rotate-180"
                />
                <h3 className="text-xl font-medium transition-all group-hover:translate-x-5">
                  Categories
                </h3>
              </Link>
              {(role == 'Admin' || role == 'Moderator') && (
                <Link
                  onClick={() => setIsOpen(false)}
                  href={'/backoffice'}
                  className="group flex justify-start items-center gap-2 pl-3 cursor-pointer hover:underline transition-all mt-20 decoration-orange-500 py-2"
                >
                  <Diamond
                    size={20}
                    color="rgb(249, 115, 22)"
                    className="mt-[3px] group-hover:scale-125 transition-all group-hover:rotate-180"
                  />
                  <h3 className="text-xl font-medium transition-all group-hover:translate-x-5 text-orange-500">
                    Edit the Store
                  </h3>
                </Link>
              )}
            </div>
            {!logged ? (
              <div className="flex-grow flex-1 flex justify-center items-end pb-10">
                <Login_button />
              </div>
            ) : (
              <div className="flex-grow flex-1 flex flex-col justify-end items-center pb-3 gap-6">
                <div className="flex justify-center items-center w-full gap-6">
                  <Image
                    draggable={false}
                    src={session?.user?.image!}
                    width={50}
                    height={50}
                    alt={session?.user?.name ?? 'Loading...'}
                    className="rounded-full select-none"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold uppercase">
                      {session?.user?.name}
                    </h1>
                    <p className="w-full text-center text-sm">{role}</p>
                  </div>
                </div>
                <Logout_button />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
export default More
