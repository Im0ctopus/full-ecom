'use client'

import { AlignJustify } from 'lucide-react'
import { useEffect, useState } from 'react'
import More from './more'

const More_button = ({ logged, role }: { logged: boolean; role: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden')
      }, 700)
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:scale-110 transition-all"
      >
        <AlignJustify size={30} />
      </button>
      <More logged={logged} isOpen={isOpen} setIsOpen={setIsOpen} role={role} />
    </>
  )
}
export default More_button
