'use client';
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { callApiSignIn } from '@pages/api/user';
import { loginSuccess } from '@redux/auth';
import Notification from '@components/common/Notification';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const dispatch = useDispatch()
    const [showNoti, setShowNoti] = useState(false)
    const [isError, setIsError] = useState(false);
    const [notiMsg, setNotiMsg] = useState('')
    const [account, setAccount] = useState({
        username: '',
        password: '',
    })

    const setInfo = (e) => {
        setAccount((prev) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value,
                }
            }
        )
    }

    const loginMutation = useMutation(
        (account) => callApiSignIn(account),
        {
            onSuccess: (data) => {
                console.log(data);
                if (data.success) {        
                    const { token, account } = data.metadata;
                    // console.log(account);
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('idUser', account.idUser);
                    localStorage.setItem('avatarUrl', account.avatarUrl);
                    localStorage.setItem('username', account.username);
                    localStorage.setItem('currentTab', "Trang chủ");
                    // localStorage.setItem('fullName', account.fullName);
                    // localStorage.setItem('email', account.email);
                    // localStorage.setItem('phoneNumber', account.phoneNumber);
                    // localStorage.setItem('address', account.address);
                    // localStorage.setItem('lockedDate', account.lockedDate);
                    // localStorage.setItem('role', account.role);
                    // localStorage.setItem('status', account.status);
                    // localStorage.setItem('field', account.field);
                    // localStorage.setItem('longitude', account.longitude);
                    // localStorage.setItem('latitude', account.latitude);
                    

                    const userInfo = {
                        accessToken: token, 
                        idUser: account.idUser,
                        avatarUrl: account.avatarUrl,
                        username: account.username,
                        fullName: account.fullName,
                        email: account.email,
                        phoneNumber: account.phoneNumber,
                        address: account.address,
                        status: account.status,
                        lockedDate: account.lockedDate,
                        role: account.role, 
                        expiresIn: '10h', 
                        field: account.field || '',
                        longitude: account.longitude || '',
                        latitude: account.latitude || '',
                    }
                    dispatch(loginSuccess(userInfo))
                    
                    if(account.role === 'BRAND') {
                        window.location.href = "http://localhost:3000/brand";
                    } else {
                        window.location.href = "http://localhost:3000/admin";
                    }
                } else {
                    console.log("Login failed")
                }
            },
            onError: (error) => {
                const msgErr = error.response.data.message;
                setIsError(true);
                setShowNoti(true);
                setNotiMsg(msgErr);
            }
        }
    )

    const submitHandler = async (e) => {
        console.log("Submit: ", account);
        if(account.username === '' || account.password === ''){
            setIsError(true);
            setShowNoti(true);
            setNotiMsg("Some fields are missing")
        }

        loginMutation.mutate(account);
    }

    const closeNoti = () => {
        setShowNoti(false)
    }

  return (
    <div className='w-screen h-screen bg-[url("/images/bgSignIn.png")] flex flex-center'>
        <div className={`${showNoti ? '' : 'hidden'} absolute w-screen h-screen bg-gray-50 bg-opacity-50 flex justify-center items-center` }>
            <Notification type={`${isError ? 'error' : 'success'}` } 
                title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
        </div>
        <div className='container flex flex-col justify-center align-middle 
            w-[540px] p-8 gap-8 rounded-[24px] bg-white shadow-lg'
        >
            <div className='flex flex-col gap-3'>
                <Link href="/" className="flex gasidebar_icon flex-center" >
                    <Image 
                        src="/icons/vou_logo.svg"
                        alt="VOU"
                        width={30}
                        height={30}
                        className="object-contain mr-1"
                    />
                    <p className="logo_text">VOU</p>
                </Link>
                <h2 className='text-[28px] text-center'>Cùng tạo ra những sự kiện thú vị</h2>
            </div>
            
            <div className='flex flex-col gap-3'>
                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Tên đăng nhập</span>
                    <input placeholder='username' name='username' type="text" className='search_input' onChange={setInfo}></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Mật khẩu</span>
                    <input placeholder='12345' name='password' type='password' className='search_input' onChange={setInfo}></input>
                </div>

                <Link href={'/signIn'} className='text-sm underline text-gray-500' >Quên mật khẩu?</Link>
                <button className='primary_btn' onClick={submitHandler}>Đăng nhập</button>
            </div>

            <div className="flex gap-2 items-center">
                <div className='h-0.5 w-screen bg-gray-300'></div>
                <span className="text-sm text-gray-500">Hoặc</span>
                <div className='h-0.5 w-screen bg-gray-300'></div>
            </div>

            <button className='rounded-full border border-gray-500 py-2 px-5 text-center text-lg hover:bg-gray-100
                font-montserrat font-medium flex items-center justify-center'
            >
                <FcGoogle size={24} className='mr-3'></FcGoogle>
                Continue with Google
            </button>


            <span className='text-sm text-center'>
                Chưa có tài khoản?
                <Link href={'/signUp'} className='underline ml-1'>Đăng ký</Link>
            </span>
        </div>

    </div>
  )
}

export default LoginPage