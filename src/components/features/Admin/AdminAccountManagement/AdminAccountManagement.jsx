import Table from "@components/common/Table"
import AdminOverview from "../AdminOverview/AdminOverview"
import AdminStatistic from "../AdminStatistic/AdminStatistic"
import AdminEditAccountForm from "../AdminForm/AdminEditAccountForm"
import AdminAddAccountForm from "../AdminForm/AdminAddAccountForm"
import TitlePage from "@components/common/TitlePage"
import Notification from "@components/common/Notification"
import Image from "next/image"

import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useQuery } from "react-query"
import { callApiGetAllUser } from "@pages/api/user"

import { FaSearch } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaSackDollar } from "react-icons/fa6"
import { FaHandHoldingDollar } from "react-icons/fa6"

export default function AdminAccountManagement() {
  const idUser = useSelector(state => state.auth.idUser);
  // Notification
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');
  const [shortlistUsers, setShortlistUsers] = useState([]);
  const [fulllistUsers, setFulllistUsers] = useState([]);


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

  const header = [
    "STT",
    "Họ tên",
    "Email",
    "Số điện thoại",
    "Quyền hạn",
    "Tình trạng",
  ]

  const closeNoti = () => {
    setShowNoti(false)
  }


  const {isFetching, refetch} = useQuery(
    "fetch-all-users",
    () => callApiGetAllUser(idUser),
    {
      onSuccess: (data) => {
        console.log(data.metadata);
        const list = data.metadata.map((user,index) => {
          return {
            no: index+1,
            name: user.fullName,
            email: user.email,
            phone: user.phoneNumber,
            role: user.role,
            status: user.status,
          }
        })
        setFulllistUsers(data.metadata);
        setShortlistUsers(list);
      },
      onError: (error) => {
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
      },
    }
  )

  const newRows = useMemo(() => {
    const nRows = shortlistUsers.map((row,index) => {
      if (row.status.toLowerCase() === 'active') {
        return {...row, status: <div className="border-2 border-active rounded-[50px] pl-[10px] pr-[10px] pt-1 pb-1 text-active">Active</div>}
      }
      else if (row.status.toLowerCase() === 'inactive') {
        return {...row, status: <div className="border-2 border-red rounded-[50px] pl-1 pr-1 pt-1 pb-1 text-red">Inactive</div>}
      }
      else if (row.status.toLowerCase() === 'pending') {
        return {...row, status: <div className="border-2 border-pending rounded-[50px] pl-1 pr-1 pt-1 pb-1 text-pending">Pending</div>}
      }
    })
    return nRows
  }, [shortlistUsers])

  const scrollViewStyle = {
    minHeight: "550px",
    maxHeight: "550px",
  }

  const [isOpenEditAccount, setIsOpenEditAccount] = useState(false)
  const [isOpenAddAccount, setIsOpenAddAccount] = useState(false)
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    refetch();
  },[isOpenAddAccount, isOpenEditAccount])


  function handleCloseForm() {
    setIsOpenEditAccount(false)
  }

  function handleCloseAddForm() {
    setIsOpenAddAccount(false)
  }
  
  function handleOpenForm() {
    setIsOpenEditAccount(true)
  }

  const showNotification = (isError,content) => {
    setIsError(isError);
    setShowNoti(true);
    setNotiMsg(content);
  }


  useEffect(() => {
    console.log(userInfo);
  }, [isOpenEditAccount])

  return (
    <div className='container w-full my-4'>
      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>

      {isOpenEditAccount && <AdminEditAccountForm userInfo={userInfo} handleClose={handleCloseForm} handleNoti={showNotification} />}
      {isOpenAddAccount && <AdminAddAccountForm handleCloseAddForm={handleCloseAddForm} handleNoti={showNotification}/>}
      <TitlePage title={"Quản lí tài khoản"} />

      <AdminOverview overview={overview}/>
      <AdminStatistic />

      <div className='flex flex-col mt-5 '>
        <div className="flex items-center bg-white rounded-lg shadow-md p5 border border-gray-200">
          <div className="p-2 mx-2 cursor-pointer hover:bg-grey-50 rounded-sm">
            <FaSearch size={20} className="text-primary"/>
          </div>
          <input type="text" placeholder="Search" className="flex-grow border-b-2 bg-transparent mt-3 mb-3 mr-3 outline-none placeholder:text-base"/>
          <div className="p-2 cursor-pointer hover:bg-grey-50 rounded-sm">
            <IoFilterOutline size={20}/>
          </div>
          <div className="primary_btn_small h-full m-2" onClick={() => setIsOpenAddAccount(true)}>
            <GoPlus size={24} className="mr-2"/>
            Thêm tài khoản
          </div>
        </div>

        <Table head={header} rows={newRows} listUsers={fulllistUsers} isEditTable={true} scrollViewStyle={scrollViewStyle} 
          setInfo={setUserInfo} handleOpenForm={handleOpenForm}/>
      </div>
    </div>
  )
}