import '../../styles/global.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "VOU",
    description: "Xây dựng chiến dịch Viral Marketing hiệu quả cho thương hiệu"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"></div>
                </div>

                <main className='app'>
                    
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout