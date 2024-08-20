'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { callApiSignUp } from '@pages/api/user';
import Notification from '@components/common/Notification';

const SignUpPage = () => {
    const [showNoti, setShowNoti] = useState(false)
    const [error, setError] = useState("");
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

    const signUpMutation = useMutation(
        (account) => callApiSignUp(account),
        {
            onSuccess: (data) => {
                console.log(data);
                if(data.success){
                    window.location.href = 'http://localhost:3000/signIn';
                } else {
                    console.log("Sign up failed");
                }
            },
            onError: (error) =>{
                const msgErr = error.response.data.message;
                setError(msgErr);
                setShowNoti(true);               
            } 
        }
    )

    const submitHandler = async (e) => {
        console.log("Submit: ", account);
        if(account.username === "" || account.email === "" || account.password === "" || account.phoneNumber === ""){
            setError("Some fields are missing");
            setShowNoti(true);
            return;
        }

        const emailRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        if (!emailRegex.test(account.email)) {
            setError("Password must includes upper and lower case letters, number, symbol (e.g. !@#$)");
            setShowNoti(true);
            return;
        }
        if (account.password.length < 8) {
            setError("Password length must greater than 8 characters");
            setShowNoti(true);
            return;
        }

        signUpMutation.mutate(account);
    }

    const closeNoti = () => {
        setShowNoti(false)
    }


  return (
    <div className='w-screen h-screen bg-[url("/images/bgSignIn.png")] flex flex-center'>
        <div className={`${showNoti ? '' : 'hidden'} absolute w-screen h-screen bg-gray-50 bg-opacity-50 flex justify-center items-center` }>
            <Notification type={'error'} title={'Error'} content={error} close={closeNoti} containerStyle={''}/>
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
                <h2 className='text-[28px] text-center'>Create an account</h2>
            </div>

            <div className='flex flex-col gap-3'>
                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Username</span>
                    <input placeholder='username' name='username' type='text' className='search_input'onChange={setInfo} ></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Password</span>
                    <input placeholder='12345' name='password' type='password' className='search_input'onChange={setInfo} ></input>
                    <span className="text-xs text-gray-500 ">
                        Use 8 or more characters including upper and lower case letters, number, symbol (e.g. !@#$)
                    </span>

                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Email</span>
                    <input placeholder='email@gmail.com' name='email' type='email' className='search_input'onChange={setInfo} ></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Phone</span>
                    <input placeholder='096100200' name='phoneNumber' type='phone' className='search_input'onChange={setInfo} ></input>
                </div>

                <span className="text-sm text-gray-500 text-center">By creating an account, you agree to the Terms of use and Privacy Policy</span>

                <button className='primary_btn' onClick={submitHandler}>Sign Up</button>
            </div>

            <span className='text-sm text-center'>
               Already have an account?
                <Link href={'/signIn'} className=' underline ml-1'>Sign in</Link>
            </span>
        </div>

    </div>
  )
}

export default SignUpPage