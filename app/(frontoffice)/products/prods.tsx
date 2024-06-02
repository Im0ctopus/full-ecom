'use client'

import ClientProd from '@/components/clientProd'
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

type TProd = {
  id: number
  userId: number
  name: string
  price: number
  category: number
  sales: number
  main: boolean
  discount: number | null
}

type TCat = {
  id: number
  name: string
}

const Prods = ({ prods, cats }: { prods: TProd[]; cats: TCat[] }) => {
  const [search, setSearch] = useState<string>('')
  const [cat, setCat] = useState<string>('All')
  const [order, setOrder] = useState<string>('Alphabetical')
  const [filteredProds, setFilteredProds] = useState<TProd[]>(prods)
  const [onSale, setOnSale] = useState<boolean>(false)

  useEffect(() => {
    let tempProds = [...prods]
    if (cat != 'All')
      tempProds = tempProds.filter((p) => p.category == parseInt(cat))
    if (order == '1')
      tempProds = tempProds.sort(
        (a, b) => a.price - a.discount! - (b.price - b.discount!)
      )
    else if (order == '2')
      tempProds = tempProds.sort(
        (a, b) => b.price - b.discount! - (a.price - a.discount!)
      )
    tempProds = tempProds.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    if (onSale) tempProds = tempProds.filter((p) => p.discount != 0)
    setFilteredProds(tempProds)
  }, [search, cat, order, onSale, prods])

  return (
    <div className="flex flex-col w-full justify-center items-center gap-3">
      <div className="flex w-full justify-between items-center flex-wrap gap-5">
        <input
          type="text"
          className="px-2 py-1 bg-zinc-200 rounded-lg"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <div className="flex justify-center items-center gap-1">
            <div
              onClick={() => setOnSale(!onSale)}
              className={`aspect-square w-5 rounded-full flex justify-center items-center cursor-pointer ${
                onSale ? 'bg-zinc-300' : 'bg-zinc-200'
              }`}
            >
              {onSale && <Check strokeWidth={3} size={15} />}
            </div>
            <label>On sale</label>
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="px-2 py-1 bg-zinc-200 rounded-lg w-36"
          >
            <option value={'All'}>All</option>
            {cats.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-2 py-1 bg-zinc-200 rounded-lg w-44"
          >
            <option value={'0'}>Alphabetical</option>
            <option value={'1'}>Price: Low-High</option>
            <option value={'2'}>Price: High-Low</option>
          </select>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredProds.map((prod) => (
          <ClientProd prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  )
}
export default Prods
