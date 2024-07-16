import Nav from '@components/common/Nav';
import Provider from '@components/common/Provider';
import ScrollView from '@components/common/ScrollView';

// export const metadata = {
//     title: "VOU",
//     description: "Xây dựng chiến dịch Viral Marketing hiệu quả cho thương hiệu"
// }

const RootLayout = ({ children }) => {
    return (
        <div className='app'>
            <div className='fixed top-0 left-0 z-10 w-[250px] h-screen'>
                <Nav />
            </div>
            <div className='relative flex-1 pl-6 pr-6 ml-[250px] h-full'>
                {children}
            </div>
        </div>

    )
}

export default RootLayout