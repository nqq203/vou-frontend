
import { useEffect, useState, useRef } from "react";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useMutation } from "react-query";
import { callApiSignUp } from "@pages/api/user";
import Notification from "@components/common/Notification";

const AdminAddAccountForm = ({handleCloseAddForm, handleNoti}) => {
    const formAccount = useRef();

    const [account, setAccount] = useState({
        fullName: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        role: "BRAND",
    });

    const setInfo = (e) => {
        const fullName = account.username;
        setAccount((prev) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value,
                    fullName : fullName,
                }
            }
        )

    }

    const handleClose = () => {
        handleCloseAddForm()
    }

    const closeNoti = () => {
        setShowNoti(false)
    }

    const signUpMutation = useMutation(
        (account) => callApiSignUp(account),
        {
            onSuccess: (data) => {
                console.log(data);
                handleClose();
                handleNoti(false,"Tạo thông tin thành công")

            },
            onError: (error) =>{
                const msgErr = error.response.data.message;
                setNotiMsg(msgErr);
                setIsError(true);
                setShowNoti(true);               
            } 
        }
    )

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Submit: ", account);
        if(account.username === "" || account.email === "" || account.password === "" || account.phoneNumber === ""){
            setNotiMsg("Yêu cầu điền đầy đủ các trường");
            setIsError(true);
            setShowNoti(true);
            return;
        }

        const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        if (!passRegex.test(account.password)) {
            console.log(passRegex.test(account.password))
            setNotiMsg("Sử dụng 8 ký tự trở lên bao gồm chữ hoa, chữ thường, số, ký hiệu (ví dụ: !@#$)");
            setIsError(true);
            setShowNoti(true);
            return;
        }
        if (account.password.length < 8) {
            setNotiMsg("Mật khẩu phải lớn hơn 8 kí tự");
            setIsError(true);
            setShowNoti(true);
            return;
        }
        formAccount.current.reset();
        signUpMutation.mutate(account);
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-xl h-auto mx-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}>
          <IoMdClose size={24} />
        </button>
        <form className="container" ref={formAccount}>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[24px]">Thông tin tài khoản</h3>
            <div className='flex flex-col gap-3'>
                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Username</span>
                    <input placeholder='username' name='username' type='text' className='search_input' onChange={setInfo} ></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Password</span>
                    <input placeholder='12345' name='password' type='password' className='search_input' onChange={setInfo} ></input>
                    <span className="text-xs text-gray-500 ">
                        Sử dụng 8 ký tự trở lên bao gồm chữ hoa, chữ thường, số, ký hiệu (ví dụ: !@#$)
                    </span>

                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Email</span>
                    <input placeholder='email@gmail.com' name='email' type='email' className='search_input' onChange={setInfo} ></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Phone</span>
                    <input placeholder='096100200' name='phoneNumber' type='phone' className='search_input' onChange={setInfo} ></input>
                </div>

                <div className="flex flex-col justify-between mr-8 w-full">
                    <label className="flex flex-col justify-between relative">
                    Role
                    <select
                        name="role"
                        value={account.role}
                        onChange={setInfo} 
                        className="input_dropdown">
                        <option value="PLAYER">Player</option>
                        <option value="ADMIN">Admin</option>
                        <option value="BRAND">Brand</option>
                    </select>
                    </label>
                </div>
                <div className='primary_btn w-[80%] self-center mt-4' onClick={submitHandler}>Tạo tài khoản</div>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminAddAccountForm