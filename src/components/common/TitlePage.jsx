import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '@redux/auth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const TitlePage = ({title}) => {
    const settingOptions = ['Đăng xuất'];
    const router = useRouter();
    const dispatch = useDispatch();
    const [openCategory, setOpenCategory] = useState(false);
    const avatarUrl = useSelector(state => state.auth.avatarUrl);
  
    const signOut = () => {
      setOpenCategory(false);
      dispatch(logout());
      router.push('/signIn');
    }
  
    const handleMouseEnter = () => {
      setOpenCategory(true)
    };
  
    const handleMouseLeave = () => {
      setOpenCategory(false);
    };
    return (
        <div className="container w-full flex justify-between items-center" >
            <h1 className='text-heading1 font-bold text-primary'>{title}</h1>
            <div className="flex gap-4 overflow-hidden cursor-pointer" 
            onMouseEnter={handleMouseEnter} 
            >
                <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={avatarUrl || '/images/defaultAva.jpg'}
                    alt=""
                />
            </div>

            {openCategory ? 
            (
                <div 
                    className="absolute z-10 mt-[88px] w-[200px] right-4 rounded-sm bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none" 
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" 
                    onMouseLeave={handleMouseLeave}>
                <div className="py-1 " role="none">
                    {settingOptions.map((item) => (
                    <a key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 cursor-pointer" 
                        role="menuitem" value={item} onClick={signOut}
                    > 
                        {item}
                    </a>
                    ))}
                </div>
                </div>
            )
            : <></>
            }

        </div>
  )
}

export default TitlePage