'use client';
import SearchBar from '@components/common/SearchBar'
import Card from '@components/common/Card'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@redux/auth';
import { useDispatch } from 'react-redux';

const Brand = () => {
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
    <div className='container w-full my-4'>
      <div className="container w-full flex justify-between items-center">
        <h1 className='text-heading1 font-bold text-primary'>My Events</h1>
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

      <SearchBar/>
      <div className="container flex flex-wrap gap-4 my-4">
        <Card name='Kỷ niệm sinh nhật 10 năm thành lập' date='14/6/2024 - 30/7/2024' vouchers='200' status='pending' />
        <Card name='Chào mừng ngày tựu trường' date='14/6/2024 - 30/7/2024' vouchers='300' status='active' />
        <Card name='Black Friday - Ngày sale lớn nhất năm' date='14/6/2024 - 30/7/2024' vouchers='100000' status='active' />
        <Card name='Kỷ niệm sinh nhật 10 năm thành lập' date='14/6/2024 - 30/7/2024' vouchers='200' status='pending'/>
        <Card name='Kỷ niệm sinh nhật 10 năm thành lập' date='14/6/2024 - 30/7/2024' vouchers='200' status='done' />
        
      </div>
    </div>
  )
}

export default Brand