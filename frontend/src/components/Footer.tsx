export const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          MernHolidays.com
        </span>
        <span className="text-white font-bold tracking-tigth flex gap-4">
          <span className="cursor-pointer">Privacy Policy</span>
          <span className="cursor-pointer">Terms of Service</span>
        </span>
      </div>
    </div>
  )
}
