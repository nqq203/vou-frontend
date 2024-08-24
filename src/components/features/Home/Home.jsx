
import Feed from '@components/common/Feed'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className="w-screen mt-[100px] flex flex-col justify-center items-center">
        <div className="flex-col justify-center items-center">
          <h1 className="head_text orange_gradient text-center">
              Marketing with Real-time Games
              <br className="max-md:hidden" />
              <span className="orange_gradient text-center">VOU</span>
          </h1>

          <div className='mx-[120px] my-[30px] text-center flex justify-center font-montserrat text-heading3_regular items-center'>
            Bạn đang muốn xây dựng chiến dịch Viral Marketing hiệu quả cho thương hiệu của mình? Bạn muốn tạo ra chiến dịch khuyến mãi dựa trên trò chơi thu hút hàng triệu lượt tham gia như Momo với trò chơi như Sưu Tập Linh Thú và Lắc Xì, Viettelpay với trò chơi Lắc Mana.
            Đăng ký ngay!!!
          </div>
        </div>

        <div className="sm:flex hidden mt-4">
            <Link href={'/signIn'} className="primary_btn w-[200px]">
                Đăng nhập
            </Link>
        </div>
        <div className="sm:flex hidden mt-4">
            <Link href={'/signUp'} className="outline_btn w-[200px]">
                Đăng ký
            </Link>
        </div>
    </div>
  )
}

export default Home