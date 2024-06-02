import { getAllRoles, getAllUsers, getRole } from '@/lib/queries'
import { Metadata } from 'next'
import Users from './users'

type TUser = {
  id: number
  email: string
  roleid: number
}

type TRole = {
  id: number
  name: string
}

export const metadata: Metadata = {
  title: 'Users | The Store',
}

const Page = async () => {
  const users: TUser[] = (await getAllUsers()) as TUser[]
  const roles: TRole[] = (await getAllRoles()) as TRole[]

  const user_role = (await getRole()) as string

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-start items-center p-10 pt-20">
      <h1 className="text-5xl font-medium">All Users</h1>
      <Users roles={roles} user_role={user_role} users={users} />
    </div>
  )
}
export default Page
