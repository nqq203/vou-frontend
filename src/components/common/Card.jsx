
const Card = ({name, date, vouchers,status}) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden min-w-[330px]">
    {status === 'pending' ? (<div className="absolute bg-pending px-1 rounded-sm text-white">Chưa diễn ra</div>)
        : (status === 'active' ? (<div className="absolute bg-active px-1 rounded-sm text-white">Đang diễn ra</div>)
            : (<div className="absolute bg-gray-500 px-1 rounded-sm text-white">Kết thúc</div>)
          )
    }
        
        <img
            className="h-[200px] w-full"
            src="https://placehold.co/330x200"
            alt="event image"
        />

        <div className="w-full flex gap-3 px-4 py-2">
            <div className="w-[200px] gap-2 flex flex-col">
                <h4 className="text-lg font-bold max-h-[60px] overflow-clip">{name}</h4>
                <span className="text-md text-gray-500">{date}</span>
            </div>

            <div className="w-[0.5px] h-[73px] bg-gray-500 "></div>

            <div className="flex flex-col items-center ">
                <h2 className="text-primary text-heading1">{vouchers}</h2>
                <span className="text-md text-gray-500">vouchers</span>
            </div>
        </div>
    </div>
  )
}

export default Card