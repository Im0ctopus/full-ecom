const Guide = () => {
  return (
    <div className="flex justify-around w-full gap-6 items-center px-4 py-2 backdrop-blur-sm sticky top-0 bg-white/20 left-0 border-b-2 border-black">
      <p>Image</p>
      <p className="flex-1">Product Name</p>
      <p className="text-start w-12">Price</p>
      <p className="text-start">Discount</p>
      <p className="text-start w-20">Actions</p>
    </div>
  )
}
export default Guide
