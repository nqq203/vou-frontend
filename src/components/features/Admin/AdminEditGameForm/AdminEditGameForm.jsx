import { useEffect, useState } from "react";
import { IoMdClose, IoIosArrowDown  } from "react-icons/io";
import Image from "next/image";

export default function AdminEditGameForm({userInfo, handleClose}) {
  const [user, setUser] = useState({...userInfo, status: userInfo.status.props.children});
  const [isOpenDropdownRole, setIsOpenDropdownRole] = useState(false);
  const [isOpenDropdownStatus, setIsOpenDropdownStatus] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChange = (e) => {
    handleClose();
    e.preventDefault();
  };
  console.log(userInfo)

  function handleOpenChangeRole(e) {
    e.preventDefault();
    setIsOpenDropdownRole(!isOpenDropdownRole);
  }

  function handleOpenChangeStatus(e) {
    e.preventDefault();
    setIsOpenDropdownStatus(!isOpenDropdownStatus);
  }

  function changeRole(value) {
    setUser({...userInfo, role: value})
  }

  function changeStatus(value) {
    setUser({...userInfo, status: value})
  }

  useEffect(() => {
    console.log(user.role);
  }, [user])

  const DropdownRole = ({isOpenDropdownRole}) => {
    return (
      <div className={isOpenDropdownRole ? "absolute w-full flex flex-col bg-white z-10 border-2 rounded-[10px] top-4 visible" : "absolute w-full flex flex-col bg-white z-10 border-2 rounded-[10px] top-4 invisible"} style={{
        right: "calc(-100% - 10px)"
      }} >
        <div className="p-2 border-b-2 hover:bg-grey-50" onClick={() => changeRole("User")}>User</div>
        <div className="p-2 border-b-2 hover:bg-grey-50" onClick={() => changeRole("Admin")}>Admin</div>
        <div className="p-2 border-b-2 hover:bg-grey-50" onClick={() => changeRole("Brand")}>Brand</div>
      </div>
    )
  }

  const DropdownStatus = ({isOpenDropdownStatus}) => {
    return (
      <div className={isOpenDropdownStatus ? "absolute w-full flex flex-col bg-white z-10 border-2 rounded-[10px] top-4 visible" : "absolute w-full flex flex-col bg-white z-10 border-2 rounded-[10px] top-4 invisible"} style={{
        right: "calc(-100% - 10px)"
      }} >
        <div className="p-2 border-b-2 hover:bg-grey-50" onClick={() => changeStatus("Pending")}>Pending</div>
        <div className="p-2 border-b-2 hover:bg-grey-50" onClick={() => changeStatus("Inactive")}>Inactive</div>
        <div className="p-2 border-b-2 hover:bg-grey-50" onClick={() => changeStatus("Active")}>Active</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}>
          <IoMdClose size={24}/>
        </button>
      <form className="container ml-4 mr-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[24px]">Thông tin tài khoản</h3>
          <div className="w-[100px] h-[100px]">
            <Image src="/images/avt.png" alt="avt" width={100} height={100} className="rounded-full"/>
          </div>
          <div className="flex flex-row items-center mt-[20px]">
            <label className="flex flex-col justify-between mr-8 font-bold w-full">
              Họ và tên
              <input type="text" name="fullName" value={user.name} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
            </label>
            <label className="flex flex-col justify-between mr-8 font-bold w-full">
              Username
              <input type="text" name="username" value={user.username} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
            </label>
          </div>
          <div className="flex flex-row items-center">
            <label className="flex flex-col justify-between mr-8 font-bold w-full">
              Email
              <input type="email" name="email" value={user.email} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
            </label>
            <label className="flex flex-col justify-between mr-8 font-bold w-full">
              Số điện thoại
              <input type="number" name="phoneNumber" value={user.phone} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
            </label>
          </div>
          <div className="flex flex-row items-start">
            <label className="flex flex-col justify-between mr-8 font-bold w-1/3 relative">
                Quyền hạn
                <div className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none">
                  {user.role}
                </div>
                <DropdownRole isOpenDropdownRole={isOpenDropdownRole}/>
                <button 
                  className="absolute inset-y-1/2 right-1 text-grey-500"
                  onClick={handleOpenChangeRole}>
                  <IoIosArrowDown size={22}/>
                </button>
              </label>
          </div>
          <div className="flex flex-row items-start">
            <label className="flex flex-col justify-between mr-8 font-bold w-1/3 relative">
                Trạng thái
                <div className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none">
                  {user.status}
                </div>
                <DropdownStatus isOpenDropdownStatus={isOpenDropdownStatus}/>
                <button 
                  className="absolute inset-y-1/2 right-1 text-grey-500"
                  onClick={handleOpenChangeStatus}>
                  <IoIosArrowDown size={22}/>
                </button>
              </label>
          </div>
        </div>
        <button type="submit" className="btn mt-10 bg-primary rounded-[12px] pt-2 pb-2 pr-3 pl-3 font-bold text-white w-[200px] mt-10" onClick={handleSaveChange}>Chỉnh sửa</button>
      </form>
    </div>
    </div>
  );
}