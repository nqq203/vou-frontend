'use client';
import SearchBar from '@components/common/SearchBar'
import Card from '@components/common/Card'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@redux/auth';
import { useDispatch } from 'react-redux';
import TitlePage from '@components/common/TitlePage';

const Brand = () => {
  const router = useRouter();


  return (
    <div className='container w-full my-4'>
      <TitlePage title={"Sự kiện của tôi"} />

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