import AdminOverview from "../AdminOverview/AdminOverview"
import AdminStatistic from "../AdminStatistic/AdminStatistic"
import SearchBarAccount from "@components/common/SearchBarAccount"
import Table from "@components/common/Table"
import { FaSackDollar } from "react-icons/fa6"
import { FaHandHoldingDollar } from "react-icons/fa6"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import AdminEditAccountForm from "../AdminForm/AdminEditAccountForm"
import TitlePage from "@components/common/TitlePage"
import { useQuery } from "react-query"
import { callApiGetAllUser } from "@pages/api/user"
import { useSelector } from "react-redux"
import Notification from "@components/common/Notification"

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


  const {isFetching} = useQuery(
    "fetch-all-users",
    () => callApiGetAllUser(idUser),
    {
      onSuccess: (data) => {
        console.log(data.metadata);
        const list = data.metadata.map((user,index) => {
          return {
            no: index,
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
      }
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
  const [userInfo, setUserInfo] = useState(null);


  function handleCloseForm() {
    setIsOpenEditAccount(false)
  }
  
  function handleOpenForm() {
    setIsOpenEditAccount(true)
  }


  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  return (
    <div className='container w-full my-4'>
      <div className={`${showNoti ? '' : 'hidden'} absolute w-full h-full bg-gray-50 bg-opacity-50 flex justify-center items-center` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Error' : 'Success'}` }  content={notiMsg} close={closeNoti}/>
      </div>

      {isOpenEditAccount && <AdminEditAccountForm userInfo={userInfo} handleClose={handleCloseForm}/>}
      <TitlePage title={"Quản lí tài khoản"} />

      <AdminOverview overview={overview}/>
      <AdminStatistic />

      <div className='flex flex-col mt-5'>
        <SearchBarAccount />
        <Table head={header} rows={newRows} listUsers={fulllistUsers} isEditTable={true} scrollViewStyle={scrollViewStyle} 
          setInfo={setUserInfo} handleOpenForm={handleOpenForm}/>
      </div>
    </div>
  )
}