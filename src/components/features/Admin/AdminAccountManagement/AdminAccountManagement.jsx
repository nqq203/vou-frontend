import AdminOverview from "../AdminOverview/AdminOverview"
import AdminStatistic from "../AdminStatistic/AdminStatistic"
import SearchBar from "@components/common/SearchBar"
import Table from "@components/common/Table"
import { FaSackDollar } from "react-icons/fa6"
import { FaHandHoldingDollar } from "react-icons/fa6"
import Image from "next/image"
import { MdEdit } from "react-icons/md";

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

  const header = [
    "STT",
    "Họ tên",
    "username",
    "email",
    "Số điện thoại",
    "Quyền hạn",
    "Tình trạng",
    " "
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
      icon: <MdEdit />
    },
    {
      no: "2",
      name: "Jane Doe",
      username: "jane.doe",
      email: "jane.doe@example.com",
      phone: "0987654322",
      role: "User",
      status: "inactive",
      icon: <MdEdit/>
    },
    {
      no: "3",
      name: "Alice Doe",
      username: "alice.doe",
      email: "alice.doe@example.com",
      phone: "0987654323",
      role: "User",
      status: "active",
      icon: <MdEdit/>
    },
    {
      no: "4",
      name: "Bob Doe",
      username: "bob.doe",
      email: "bob.doe@example.com",
      phone: "0987654324",
      role: "User",
      status: "active",
      icon: <MdEdit/>
    },
    {
      no: "5",
      name: "David Doe",
      username: "david.doe",
      email: "david.doe@example.com",
      phone: "0987654325",
      role: "User",
      status: "active",
      icon: <MdEdit/>
    },
    {
      no: "6",
      name: "Emily Doe",
      username: "emily.doe",
      email: "emily.doe@example.com",
      phone: "0987654326",
      role: "User",
      status: "pending",
      icon: <MdEdit/>
    }
  ]

  return (
    <div className='container p-6 mx-auto'>
      <h1 className='text-[40px] header font-bold text-left'>Dashboard</h1>
      <AdminOverview overview={overview}/>
      <AdminStatistic />
      <div className='flex flex-col mt-5'>
        <SearchBar />
        <Table head={header} rows={rows}/>
      </div>
    </div>
  )
}