import React from 'react'
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { FaSackDollar } from 'react-icons/fa6'
import Image from 'next/image'
import AdminOverview from './AdminOverview/AdminOverview'
import AdminStatistic from './AdminStatistic/AdminStatistic'

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
              src="icons/001-medical.svg"
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
              src="icons/003-saving.svg"
              alt="total saving"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Total Saving',
      value: '7,920',
    }
  ]

  return (
    <div className='container p-6 mx-auto'>
      <h1 className='text-[40px] header font-bold text-left'>Dashboard</h1>
      <AdminOverview overview={overview}/>
      <AdminStatistic />
    </div>
  )
}

export default Admin