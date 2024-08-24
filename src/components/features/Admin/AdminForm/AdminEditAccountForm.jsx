import { useEffect, useState } from "react";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useMutation } from "react-query";
import { callApiUpdateAccount } from "@pages/api/user";
import { useRef } from "react";
import Notification from "@components/common/Notification";

export default function AdminEditAccountForm({ userInfo, handleClose,handleNoti }) {
  const [user, setUser] = useState(userInfo);

  const formAccount = useRef(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const updateAccountMutation = useMutation(
    ({id,data}) => callApiUpdateAccount(id,data),
    {
      onSuccess: (data) => {
        console.log(data)
        handleClose();
        handleNoti(false,"Cập nhật thông tin thành công")
        
      },
      onError: (error) => {
          const msgErr = error.response.data.message;
          setIsError(true);
          setShowNoti(true);
          setNotiMsg(msgErr);
      },
    }
  )



  const handleSaveChange = (e) => {
    // handleClose();
    e.preventDefault();
    const formData = new FormData(formAccount.current);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)

    updateAccountMutation.mutate({id: user.idUser,data: formProps});
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}>
          <IoMdClose size={24} />
        </button>
        <form className="container ml-4 mr-4" ref={formAccount}>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[24px]">Chỉnh sửa tài khoản</h3>
            <div className="w-[150px] h-[150px]">
              <Image src={user.avatarUrl || '/images/defaultAva.jpg'} alt="avt" width={150} height={150} className="rounded-full" />
            </div>
            <div className="flex flex-row items-center ">
              <label className="flex flex-col justify-between mr-8 w-full">
                Họ và tên
                <input type="text" name="fullName" value={user.fullName} onChange={handleChange} className="input_text" />
              </label>
              <label className="flex flex-col justify-between mr-8 w-full">
                Username
                <input type="text" name="username" value={user.username} onChange={handleChange} className="input_text" />
              </label>
            </div>
            <div className="flex flex-row items-center">
              <label className="flex flex-col justify-between mr-8 w-full">
                Email
                <input type="email" name="email" value={user.email} onChange={handleChange} className="input_text" />
              </label>
              <label className="flex flex-col justify-between mr-8 w-full">
                Số điện thoại
                <input type="number" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="input_text" />
              </label>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex flex-col justify-between mr-8 w-full">
                <label className="flex flex-col justify-between relative">
                  Quyền hạn
                  <select
                    name="role"
                    value={user.role}
                    onChange={handleChange} 
                    className="input_dropdown">
                    <option value="PLAYER">Player</option>
                    <option value="ADMIN">Admin</option>
                    <option value="BRAND">Brand</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col justify-between mr-8 w-full">
                <label className="flex flex-col justify-between relative">
                  Trạng thái
                  <select
                    name="status"
                    value={user.status}
                    onChange={handleChange} 
                    className="input_dropdown">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn bg-primary rounded-[12px] pt-2 pb-2 pr-3 pl-3 font-bold text-white w-[200px] mt-6" onClick={handleSaveChange}>Chỉnh sửa</button>
        </form>
      </div>
    </div>
  );
}