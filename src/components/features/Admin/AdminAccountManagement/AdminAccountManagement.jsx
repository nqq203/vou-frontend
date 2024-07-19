import AdminOverview from "../AdminOverview/AdminOverview"
import AdminStatistic from "../AdminStatistic/AdminStatistic"
import SearchBar from "@components/common/SearchBar"
import Table from "@components/common/Table"
import { FaSackDollar } from "react-icons/fa6"
import { FaHandHoldingDollar } from "react-icons/fa6"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import AdminEditGameForm from "../AdminEditGameForm/AdminEditGameForm"

export default function AdminAccountManagement() {
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
    "Username",
    "Email",
    "Số điện thoại",
    "Quyền hạn",
    "Tình trạng",
  ]

  const rows = [
    {
      no: "1",
      name: "John Doe",
      username: "john.doe",
      email: "john.doe@example.com",
      phone: "0987654321",
      role: "Admin",
      status: "active",
    },
    {
      no: "2",
      name: "Jane Doe",
      username: "jane.doe",
      email: "jane.doe@example.com",
      phone: "0987654322",
      role: "User",
      status: "inactive",
    },
    {
      no: "3",
      name: "Alice Doe",
      username: "alice.doe",
      email: "alice.doe@example.com",
      phone: "0987654323",
      role: "User",
      status: "active",
    },
    {
      no: "4",
      name: "Bob Doe",
      username: "bob.doe",
      email: "bob.doe@example.com",
      phone: "0987654324",
      role: "User",
      status: "active",
    },
    {
      no: "5",
      name: "David Doe",
      username: "david.doe",
      email: "david.doe@example.com",
      phone: "0987654325",
      role: "User",
      status: "active",
    },
    {
      no: "6",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
    },
    {
      no: "7",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
    },
    {
      no: "8",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
    },
    {
      no: "9",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
    },
    {
      no: "10",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
    },
    {
      no: "11",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
    }
  ]

  const newRows = useMemo(() => {
    const nRows = rows.map(row => {
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
  }, [rows])

  const scrollViewStyle = {
    minHeight: "550px",
    maxHeight: "550px",
  }

  const [isOpenEditAccount, setIsOpenEditAccount] = useState(false)
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  function handleCloseForm() {
    setIsOpenEditAccount(false)
  }
  
  function handleOpenForm() {
    setIsOpenEditAccount(true)
  }

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  return (
    <div className='container relative p-6 mx-auto'>
      {isOpenEditAccount && <AdminEditGameForm userInfo={userInfo} handleClose={handleCloseForm}/>}
      <h1 className='text-[40px] header font-bold text-left'>Dashboard</h1>
      <AdminOverview overview={overview}/>
      <AdminStatistic />
      <div className='flex flex-col mt-5'>
        <SearchBar />
        <Table head={header} rows={newRows} isEditTable={true} scrollViewStyle={scrollViewStyle} setInfo={setUserInfo} handleOpenForm={handleOpenForm}/>
      </div>
    </div>
  )
}