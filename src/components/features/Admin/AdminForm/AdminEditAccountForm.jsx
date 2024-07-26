import { useEffect, useState } from "react";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

export default function AdminEditAccountForm({ userInfo, handleClose }) {
  const [user, setUser] = useState({ ...userInfo, status: userInfo.status.props.children });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChange = (e) => {
    handleClose();
    e.preventDefault();
  };
  console.log(userInfo)

  useEffect(() => {
    console.log(user.role);
  }, [user])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}>
          <IoMdClose size={24} />
        </button>
        <form className="container ml-4 mr-4">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[24px]">Thông tin tài khoản</h3>
            <div className="w-[100px] h-[100px]">
              <Image src="/images/avt.png" alt="avt" width={100} height={100} className="rounded-full" />
            </div>
            <div className="flex flex-row items-center mt-[20px]">
              <label className="flex flex-col justify-between mr-8 w-full">
                Họ và tên
                <input type="text" name="name" value={user.name} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
              </label>
              <label className="flex flex-col justify-between mr-8 w-full">
                Username
                <input type="text" name="username" value={user.username} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
              </label>
            </div>
            <div className="flex flex-row items-center">
              <label className="flex flex-col justify-between mr-8 w-full">
                Email
                <input type="email" name="email" value={user.email} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
              </label>
              <label className="flex flex-col justify-between mr-8 w-full">
                Số điện thoại
                <input type="number" name="phone" value={user.phone} onChange={handleChange} className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none" />
              </label>
            </div>
            <div className="flex flex-row items-start">
              <label className="flex flex-col justify-between mr-8 w-1/3 relative">
                Quyền hạn
                <select
                  name="status"
                  value={user.role}
                  onChange={handleChange} 
                  className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="brand">Brand</option>
                </select>
              </label>
            </div>
            <div className="flex flex-row items-start">
              <label className="flex flex-col justify-between mr-8 w-1/3 relative">
                Trạng thái
                <select
                  name="status"
                  value={user.status}
                  onChange={handleChange} 
                  className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </label>
            </div>
          </div>
          <button type="submit" className="btn bg-primary rounded-[12px] pt-2 pb-2 pr-3 pl-3 font-bold text-white w-[200px] mt-10" onClick={handleSaveChange}>Chỉnh sửa</button>
        </form>
      </div>
    </div>
  );
}