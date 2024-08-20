'use client';
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { FaSackDollar } from 'react-icons/fa6'
import Image from 'next/image'
import AdminOverview from './AdminOverview/AdminOverview'
import AdminStatistic from './AdminStatistic/AdminStatistic'
import { useRouter } from 'next/router';
import { logout } from '@redux/auth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const Admin = () => {
  const overview = [
    {
      icon: <FaSackDollar size={32} />,
      name: 'My Balance',
      value: '12,750',
    }, 
    {
      icon: <FaHandHoldingDollar size={32} />,
      name: 'Income',
      value: '5,600',
    },
    {
      icon: <Image
              src="/icons/001-medical.svg"
              alt="EXPENSE"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Expense',
      value: '3,460',
    },
    {
      icon: <Image
              src="/icons/003-saving.svg"
              alt="total saving"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Total Saving',
      value: '7,920',
    }
  ]
  const settingOptions = ['Sign Out'];
  const router = useRouter();
  const dispatch = useDispatch();
  const [openCategory, setOpenCategory] = useState(false);

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
    <div className='container p-6 mx-auto'>
      <div className="container w-full flex justify-between items-center">
        <h1 className='text-heading1 font-bold text-primary'>Dashboard</h1>
        <div className="flex gap-4 overflow-hidden cursor-pointer" 
          onMouseEnter={handleMouseEnter}
        >
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                  <a href="#" key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
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

      <AdminOverview overview={overview}/>
      <AdminStatistic />
    </div>
  )
}

export default Admin