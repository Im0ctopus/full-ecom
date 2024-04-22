'use client'

import { AlignJustify } from 'lucide-react'
import { useState } from 'react'
import More from './more'

const More_button = ({ logged, role }: { logged: boolean; role: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
