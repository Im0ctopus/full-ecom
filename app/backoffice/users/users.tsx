'use client'

import User from './user'
import Guide from './guide'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type TUser = {
  id: number
  email: string
  roleid: number
}

type TRole = {
  id: number
  name: string
}

const Users = ({
  users,
  roles,
  user_role,
}: {
  users: TUser[]
  roles: TRole[]
  user_role: string
}) => {
  const [filtredUsers, setFilteredUsers] = useState<TUser[]>(users)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setFilteredUsers(
      users.filter((u) => u.email.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, users])

  return (
    <div className="flex flex-col justify-center items-center w-full gap-2">
      <div className="w-full text-start max-w-[1200px] relative">
        <input
          type="text"
          placeholder="Search by User email"
          className="bg-zinc-200 rounded-lg px-2 py-1 font-medium w-56"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 my-auto left-48 w-8 rounded-r-lg"
          >
            <X />
          </button>
        )}
      </div>
      <div className="border-4 border-zinc-700 flex-grow flex-1 w-full rounded-lg max-w-[1200px] relative">
        <Guide />
        {filtredUsers.length == 0 ? (
          <h1 className="w-full text-center py-2">
            There are currently no users for the current filter
          </h1>
        ) : (
          filtredUsers.map((user, index) => (
            <User
              key={index}
              index={index}
              roles={roles}
              user={user}
              user_role={user_role}
            />
          ))
        )}
      </div>
    </div>
  )
}
export default Users
