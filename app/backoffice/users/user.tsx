'use client'

import { handleEditUserRole } from '@/lib/actions'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

type TUser = {
  id: number
  email: string
  roleid: number
}

type TRole = {
  id: number
  name: string
}

const User = ({
  index,
  roles,
  user,
  user_role,
}: {
  index: number
  user: TUser
  roles: TRole[]
  user_role: string
}) => {
  const initialState = {
    message: '',
  }
  const [state, formAction] = useFormState(handleEditUserRole, initialState)

  useEffect(() => {
    if (state.message == 'Success') {
      toast.success('Role updated with Success.')
    } else if (state.message == 'Error') {
      toast.error('An Error occurred! Please try again later.')
    } else if (state.message == '4') {
      toast.error("It's not possible to add anyone as an owner.")
    }
  }, [state])
  return (
    <form
      key={user.id}
      action={formAction}
      className={`flex justify-around w-full gap-6 items-center px-4 py-2 backdrop-blur-sm top-0 ${
        index % 2 != 0 && 'bg-zinc-100'
      }`}
    >
      <h1 className="flex-1 flex-grow">{user.email}</h1>
      <input
        name="id"
        type="number"
        value={user.id}
        className="hidden"
        onChange={() => console.log('nice try kek')}
      />
      <select
        disabled={user.roleid == 4 || user_role != 'Owner'}
        name="role"
        defaultValue={user.roleid}
        className="bg-zinc-200 py-1 active:border-b-zinc-300 rounded-lg w-28 disabled:hover:bg-zinc-200 hover:bg-zinc-300 transition-all duration-300 cursor-pointer disabled:cursor-default"
      >
        {roles.map((role, index) => {
          if (user.roleid != 4 && role.id != 4) {
            return (
              <option value={role.id} key={index}>
                {role.name}
              </option>
            )
          } else if (user.roleid == 4) {
            return (
              <option value={role.id} key={index}>
                {role.name}
              </option>
            )
          }
        })}
      </select>
      <button
        disabled={user.roleid == 4 || user_role != 'Owner'}
        className="w-20 py-1 bg-zinc-200 rounded-lg hover:bg-zinc-300 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-zinc-200"
      >
        Save
      </button>
    </form>
  )
}
export default User
