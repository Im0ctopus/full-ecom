import Profile from '@/components/sidebar/profile'
import Link from 'next/link'
import { Gauge as Dashboard, Images, Users, Filter } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="w-80 bg-zinc-800 text-white flex flex-col justify-start items-center px-2 py-10 gap-5">
      <Link
        href={'/backoffice'}
        className="flex flex-col gap-0 justify-center items-center shrink-0"
      >
        <h1 className="text-3xl font-black text-">The Store</h1>
        <p className="-mt-2 text-xs font-medium">Backoffice</p>
      </Link>
      <hr className="w-full border rounded-full" />
      <div className="flex flex-col justify-start items-center gap-2 w-full">
        <Link
          href={'/backoffice'}
          className="flex justify-start items-center gap-4 w-full max-w-52 px-2 py-1 hover:bg-zinc-700 rounded-lg transisiotn-all duration-300"
        >
          <Dashboard />
          <h3 className="text-lg font-medium">Dashboard</h3>
        </Link>
        <Link
          href={'/backoffice/users'}
          className="flex justify-start items-center gap-4 w-full max-w-52 px-2 py-1 hover:bg-zinc-700 rounded-lg transisiotn-all duration-300"
        >
          <Users />
          <h3 className="text-lg font-medium">Users</h3>
        </Link>
        <Link
          href={'/backoffice/slides'}
          className="flex justify-start items-center gap-4 w-full max-w-52 px-2 py-1 hover:bg-zinc-700 rounded-lg transisiotn-all duration-300"
        >
          <Images />
          <h3 className="text-lg font-medium">Slides</h3>
        </Link>
        <Link
          href={'/backoffice/categories'}
          className="flex justify-start items-center gap-4 w-full max-w-52 px-2 py-1 hover:bg-zinc-700 rounded-lg transisiotn-all duration-300"
        >
          <Filter />
          <h3 className="text-lg font-medium">Categories</h3>
        </Link>
      </div>
      <Profile />
    </div>
  )
}
export default Sidebar
