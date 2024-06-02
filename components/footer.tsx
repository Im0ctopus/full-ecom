const Footer = () => {
  return (
    <div className="w-full min-h-52 bg-zinc-800">
      <div className="w-full h-full mx-auto max-w-[1000px] flex justify-between items-center py-10 text-white font-light flex-wrap gap-4">
        <div className="flex flex-col gap-0 justify-center items-start">
          <h1 className="text-lg font-bold pb-3">OUR SERVICES</h1>
          <p className="hover:underline cursor-pointer">About Us</p>
          <p className="hover:underline cursor-pointer">FaQ</p>
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Random Policy</p>
        </div>
        <div className="flex flex-col gap-0 justify-center items-start">
          <h1 className="text-lg font-bold pb-3">CONTACT US</h1>
          <p className="">Tel: (+351) 985 784 666</p>
          <p className="">
            Emai:{' '}
            <a className="hover:underline" href="mailto:team@thestore.pt">
              team@thestore.pt
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Footer
