import React from 'react'

const Tag = ({status}) => {
  return (
    <div className='w-auto'>
        {status === 'pending' ? (<div className="  bg-pending px-2 rounded-sm text-white">Chưa diễn ra</div>)
            : (status === 'active' ? (<div className=" bg-active px-2 rounded-sm text-white">Đang diễn ra</div>)
                : (<div className=" bg-gray-500 px-2 rounded-sm text-white">Kết thúc</div>)
            )
        }
    </div>
  )
}

export default Tag