import Nav from '@components/common/Nav';
import Head from 'next/head';


const RootLayout = ({ children }) => {
    return (
        <div className='app'>
            <div className='fixed top-0 left-0 z-10 w-[240px] h-full'>
                <Nav />
            </div>
            <div className='relative flex-1 pl-6 pr-6 ml-[250px] h-full'>
                {children}
            </div>
        </div>
    )
}

export default RootLayout