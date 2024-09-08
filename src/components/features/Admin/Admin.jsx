'use client';
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { FaSackDollar } from 'react-icons/fa6'
import Image from 'next/image'
import AdminOverview from './AdminOverview/AdminOverview'
import AdminStatistic from './AdminStatistic/AdminStatistic'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import TitlePage from '@components/common/TitlePage';
import { updateStatesEvent } from '@redux/event';
import { callApiGetAllBrands } from '@pages/api/brand';
import { callApiGetItems } from '@pages/api/item';
import { useQuery } from 'react-query';
import { callApiGetAllUser } from '@pages/api/user';
import { useMemo } from 'react';
import Table from '@components/common/Table';
import { convertDataToOutputString } from '@utils/date';
import { IoMdClose } from "react-icons/io"

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
  const [totalBrandAccounts, setTotalBrandAccounts] = useState(0);
  const [totalPlayerAccounts, setTotalPlayerAccounts] = useState(0);
  const [fullListEvents, setFullListEvents] = useState(temp)
  const [listEvents, setListEvents] = useState(list);
  const [isOpenInfoForm, setIsOpenInfoForm] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  
  
  function handleOpenForm() {
    setIsOpenInfoForm(true)
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
      name: 'Số tài khoản Brands',
      value: totalBrandAccounts,
    },
    {
      icon: <Image
              src="/icons/003-saving.svg"
              alt="total saving"
              width={32}
              height={32}
              className="object-contain"
            />,
      name: 'Số tài khoản Players',
      value: totalPlayerAccounts,
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

  const {isFetching: isFetchingItems, refetch: refetchItems} = useQuery(
    "fetch-items",
    () => callApiGetItems(),
    {
      onSuccess: (data) => {
        console.log(data);
        const listAvailableBrands = [];
        const listAvailableItems = data.metadata;
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

  const {isFetching, refetch} = useQuery(
    "fetch-items-accounts",
    async () => {
      const accounts = await callApiGetAllUser(idUser);
      return {accounts}
    },
    {
      onSuccess: (data) => {
        console.log(data);
        const totalAccs = data.accounts?.metadata;
        // const totalAccs = temp
        let numberOfBrand = 0;
        let numberOfPlayer = 0;

        if(totalAccs.length != 0){
          totalAccs?.map((user,index) => {
            if(user.role === "BRAND"){
              numberOfBrand++;
            } else if(user.role === "PLAYER"){
              numberOfPlayer++;
            }
          })
        }
        setTotalBrandAccounts(numberOfBrand);
        setTotalPlayerAccounts(numberOfPlayer);          
      },
      onError: (error) => {
        // Handle error and log the appropriate message
        console.log(error.response?.data?.message || error.message);
      },      
    }
  )

  

  return (
    <div className='container w-full my-4'>
      <TitlePage title={"Dashboard"} />
      {isOpenInfoForm ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => setIsOpenInfoForm(false)}>
              <IoMdClose size={24} />
            </button>
            <div className="mx-4">
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-[24px]">Thông tin sự kiện</h3>

                <div className="mr-5 flex justify-center items-center">
                  <img src={eventInfo.imageUrl} alt="avt" className="h-[200px]"  />
                </div>
                
                <div className="flex gap-3">
                  <div className="flex flex-col py-2 w-[50%]">
                      <h5 className="text-base font-semibold">Tên sự kiện</h5>
                      <div className="input_text">{eventInfo.eventName}</div>
                  </div>
                  <div className="flex flex-col py-2 grow">
                      <h5 className="text-base font-semibold">Số lượt chia sẻ</h5>
                      <div className="input_text">{eventInfo.shareCount}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col py-2 w-[50%]">
                      <h5 className="text-base font-semibold">Tổng số vouchers</h5>
                      <div className="input_text">{eventInfo.numberOfVouchers}</div>
                  </div>

                  <div className="flex flex-col py-2 grow">
                      <h5 className="text-base font-semibold">Số lượng vouchers còn lại</h5>
                      <div className="input_text">{eventInfo.remainingVouchers}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col py-2 w-[50%]">
                      <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                      <div className="input_text">{convertDataToOutputString(eventInfo.startDate)}</div>
                  </div>

                  <div className="flex flex-col py-2 grow">
                      <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                      <div className="input_text">{convertDataToOutputString(eventInfo.endDate)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ): null}
      <AdminOverview overview={overview}/>

      <Table head={header} rows={newRows} listUsers={fullListEvents} isEditTable={false} scrollViewStyle={scrollViewStyle} 
          setInfo={setEventInfo} handleOpenForm={handleOpenForm}/>
    </div>
  )
}

export default Admin