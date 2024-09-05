'use client'
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { FaSackDollar } from 'react-icons/fa6'
import { IoChevronBackCircle } from "react-icons/io5";

import Image from 'next/image'
import AdminOverview from '@components/features/Admin/AdminOverview/AdminOverview'
import AdminStatistic from '@components/features/Admin/AdminStatistic/AdminStatistic'

const EventDashboard = () => {
  const router = useRouter();

  const overview = [
    {
      icon: <FaSackDollar size={32} />,
      name: 'Tổng số người tham gia',
      value: '12,750',
    }, 
    {
      icon: <FaHandHoldingDollar size={32} />,
      name: 'Số voucher đã đổi',
      value: '5,600',
    },
    {
      icon: <Image
              src="../../../../../../icons/001-medical.svg"
              alt="EXPENSE"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Số voucher còn lại',
      value: '3,460',
    },
    {
      icon: <Image
              src="../../../../../../icons/003-saving.svg"
              alt="total saving"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Số vật phẩm rơi ra',
      value: '7,920',
    }
  ]

  const goBackToDetailPage = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className='container p-6 mx-auto'>
      <div className="flex gap-2 items-center">
        <div className="text-primary p-2 cursor-pointer" onClick={goBackToDetailPage}>
          <IoChevronBackCircle size={40} />
        </div>
        <h1 className='text-heading1 font-bold text-primary'>Dashboard</h1>
      </div>
      <AdminOverview overview={overview}/>
      <AdminStatistic />
      
    </div>
  )
}

export default EventDashboard