
import Feed from "@components/Feed";
import Link from 'next/link'
 

const Home = () => {
  return (
    <section className="global_padding w-full flex-center flex-col">
        <h1 className="head_text orange_gradient text-center">
            Marketing with Real-time Games
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">VOU</span>
        </h1>
        <p className="desc text-center">
        Bạn đang muốn xây dựng chiến dịch Viral Marketing hiệu quả cho thương hiệu của mình? Bạn muốn tạo ra chiến dịch khuyến mãi dựa trên trò chơi thu hút hàng triệu lượt tham gia như Momo với trò chơi như Sưu Tập Linh Thú và Lắc Xì, Viettelpay với trò chơi Lắc Mana.
        Đăng ký ngay!!!
        </p>

        <Link href="/admin" className="black_btn mt-5">Go to Admin</Link>

        <Link href="/brand" className="black_btn mt-5">Go to Brands</Link>

        {/* <Feed className="mt-5" /> */}
    </section>
  )
}

export default Home