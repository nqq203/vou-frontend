'use client';
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { FaSackDollar } from 'react-icons/fa6'
import Image from 'next/image'
import AdminOverview from './AdminOverview/AdminOverview'
import AdminStatistic from './AdminStatistic/AdminStatistic'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import TitlePage from '@components/common/TitlePage';
import { updateStatesEvent } from '@redux/event';
import { callApiGetAllBrands } from '@pages/api/brand';
import { callApiGetItems } from '@pages/api/item';
import { useQuery } from 'react-query';
import { callApiGetAllUser } from '@pages/api/user';
import { useMemo } from 'react';
import Table from '@components/common/Table';
import { convertDataToOutputString } from '@utils/date';

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const temp = [
    {
      "idEvent": 1,
      "eventName": "Summer Festival",
      "imageUrl": "https://placehold.co/300x400",
      "shareCount": 150,
      "numberOfVouchers": 500,
      "remainingVouchers": 200,
      "startDate": "2024-09-08T10:00:00.000+00:00",
      "endDate": "2024-09-11T12:45:00.000+00:00",
      "deletedDate": null,
      "createdBy": 100
    },
    {
      "idEvent": 2,
      "eventName": "Winter Gala",
      "imageUrl": "https://placehold.co/300x400",
      "shareCount": 75,
      "numberOfVouchers": 300,
      "remainingVouchers": 50,
      "startDate": "2024-09-08T10:00:00.000+00:00",
      "endDate": "2024-09-11T12:45:00.000+00:00",
      "deletedDate": null,
      "createdBy": 101
    },
    {
      "idEvent": 3,
      "eventName": "Spring Concert",
      "imageUrl": "https://placehold.co/300x400",
      "shareCount": 250,
      "numberOfVouchers": 700,
      "remainingVouchers": 500,
      "startDate": "2024-09-08T10:00:00.000+00:00",
      "endDate": "2024-09-11T12:45:00.000+00:00",
      "deletedDate": null,
      "createdBy": 102
    },
    {
      "idEvent": 4,
      "eventName": "Tech Expo",
      "imageUrl": "https://placehold.co/300x400",
      "shareCount": 400,
      "numberOfVouchers": 1000,
      "remainingVouchers": 850,
      "startDate": "2024-09-08T10:00:00.000+00:00",
      "endDate": "2024-09-11T12:45:00.000+00:00",
      "deletedDate": "2024-09-08T10:00:00",
      "createdBy": 103
    },
    {
      "idEvent": 5,
      "eventName": "Food Carnival",
      "imageUrl": "https://placehold.co/300x400",
      "shareCount": 600,
      "numberOfVouchers": 1200,
      "remainingVouchers": 1000,
      "startDate": "2024-09-08T10:00:00.000+00:00",
      "endDate": "2024-09-11T12:45:00.000+00:00",
      "deletedDate": null,
      "createdBy": 104
    }
  ]

  const list = temp.map((event,index) => {
    return {
      no: index+1,
      name: event.eventName,
      email: event.numberOfVouchers,
      phone: event.shareCount,
      role: convertDataToOutputString(event.startDate),
      status: convertDataToOutputString(event.endDate),
    }
  })
  const idUser = useSelector(state => state.auth.idUser);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [fullListEvents, setFullListEvents] = useState(temp)
  const [listEvents, setListEvents] = useState(list);
  const [isOpenInfoForm, setIsOpenInfoForm] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  

  function handleCloseForm() {
    setIsOpenEditAccount(false)
  }
  
  function handleOpenForm() {
    setIsOpenEditAccount(true)
  }

  const header = [
    "STT",
    "Tên sự kiện",
    "Số lượng vouchers",
    "Số lượt chia sẻ sự kiện",
    "Ngày bắt đầu",
    "Ngày kết thúc",
  ]

  const scrollViewStyle = {
    minHeight: "550px",
    maxHeight: "550px",
  }

  const overview = [
    {
      icon: <FaSackDollar size={32} />,
      name: 'Tổng số sự kiện',
      value: '12,750',
    }, 
    {
      icon: <FaHandHoldingDollar size={32} />,
      name: 'Tổng số vouchers',
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
      name: 'Tổng số lượt chia sẻ',
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
      name: 'Tổng số tài khoản',
      value: totalAccounts,
    }
  ]

  const newRows = useMemo(() => {
    const nRows = listEvents.map((row,index) => {
      // if (row.status.toLowerCase() === 'active') {
      //   return {...row, status: <div className="border-2 border-active rounded-[50px] pl-[10px] pr-[10px] pt-1 pb-1 text-active">Active</div>}
      // }
      // else if (row.status.toLowerCase() === 'inactive') {
      //   return {...row, status: <div className="border-2 border-red rounded-[50px] pl-1 pr-1 pt-1 pb-1 text-red">Inactive</div>}
      // }
      // else if (row.status.toLowerCase() === 'pending') {
      //   return {...row, status: <div className="border-2 border-pending rounded-[50px] pl-1 pr-1 pt-1 pb-1 text-pending">Pending</div>}
      // }
      return row;
    })
    return nRows
  }, [listEvents])

  const {isFetching, refetch} = useQuery(
    "fetch-items-accounts",
    async () => {
      const accounts = await callApiGetAllUser(idUser);
      const items = await callApiGetItems();
      return {accounts,items}
    },
    {
      onSuccess: (data) => {
        console.log(data);
        const totalAccs = data.accounts?.metadata?.length;
        setTotalAccounts(totalAccs);
        const listAvailableBrands = [];
        const listAvailableItems = data.items?.metadata;
        dispatch(updateStatesEvent({listAvailableBrands,listAvailableItems}))        
      },
      onError: (error) => {
        // Handle error and log the appropriate message
        console.log(error.response?.data?.message || error.message);
      },
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will be cached indefinitely      
    }
  )

  
  

  return (
    <div className='container w-full my-4'>
      <TitlePage title={"Dashboard"} />

      <AdminOverview overview={overview}/>

      <Table head={header} rows={newRows} listUsers={fullListEvents} isEditTable={false} scrollViewStyle={scrollViewStyle} 
          setInfo={setEventInfo} handleOpenForm={handleOpenForm}/>
    </div>
  )
}

export default Admin