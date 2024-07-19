import SearchBar from '@components/common/SearchBar'
import Card from '@components/common/Card'

const Brand = () => {
  return (
    <div className='container w-full mt-4'>
      <div className="container w-full flex justify-between items-center">
        <h1 className='text-heading1 font-bold text-primary'>My Events</h1>
        <div className="flex gap-4 overflow-hidden">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>

      <SearchBar/>
      <div className="container flex flex-wrap  gap-4 my-4">
        <Card name='Kỷ niệm sinh nhật 10 năm thành lập' date='14/6/2024 - 30/7/2024' vouchers='200' status='pending' />
        <Card name='Chào mừng ngày tựu trường' date='14/6/2024 - 30/7/2024' vouchers='300' status='active' />
        <Card name='Black Friday - Ngày sale lớn nhất năm' date='14/6/2024 - 30/7/2024' vouchers='1000' status='active' />
        <Card name='Kỷ niệm sinh nhật 10 năm thành lập' date='14/6/2024 - 30/7/2024' vouchers='200' status='pending'/>
        <Card name='Kỷ niệm sinh nhật 10 năm thành lập' date='14/6/2024 - 30/7/2024' vouchers='200' status='done' />
        
      </div>
    </div>
  )
}

export default Brand