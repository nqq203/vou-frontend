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


{/* <div className='flex-1'>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex items-center bg-white shadow-md rounded-[8px] p-4">
            <div className="text-yellow-500 rounded-full bg-yellow-50 p-4 mr-4">
              <FaSackDollar size={32} />
            </div>
            <div>
              <div className="text-l font-semi-light text-blue-200">My Balance</div>
              <div className="text-l">$12,750</div>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-[8px] p-4">
            <div className="text-blue-100 rounded-full bg-blue-50 p-4 mr-4">
              <FaHandHoldingDollar size={32} />
            </div>
            <div>
              <div className="text-l font-semi-light text-blue-200">Income</div>
              <div className="text-l">$5,600</div>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-[8px] p-4">
            <div className="text-yellow-500 rounded-full bg-pink-50 p-4 mr-4">
              <Image
                src="icons/001-medical.svg"
                alt="EXPENSE"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-l font-semi-light text-blue-200">Expense</div>
              <div className="text-l">$3,460</div>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-md rounded-[8px] p-4">
            <div className="text-yellow-500 rounded-full bg-green-50 p-4 mr-4">
              <Image
                src="icons/003-saving.svg"
                alt="total saving"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-l font-semi-light text-blue-200">Total Saving</div>
              <div className="text-l">$7,920</div>
            </div>
          </div>
        </div>
      </div> */}