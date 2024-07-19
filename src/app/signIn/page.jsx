'use client';
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from 'react';

const LoginPage = () => {
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

    const submitHandler = async (e) => {
        console.log("Submit: ", account);
    }

  return (
    <div className='w-screen h-screen bg-[url("/images/bgSignIn.png")] flex flex-center'>
        <div className='container flex flex-col justify-center align-middle 
            w-[620px] p-8 gap-8 rounded-[24px] bg-white shadow-lg'
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
                <h2 className=' text-[24px] text-center text-semibold'>Create wonderful events with us</h2>
            </div>
            
            <div className='flex flex-col gap-3'>
                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Username</span>
                    <input placeholder='username' name='username' type="text" className='search_input' onChange={setInfo}></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Password</span>
                    <input placeholder='12345' name='password' type='password' className='search_input' onChange={setInfo}></input>
                </div>

                <Link href={'/signIn'} className='text-sm underline text-gray-500' >Forget your password?</Link>
                <button className='primary_btn' onClick={submitHandler}>Sign In</button>
            </div>

            <div className="flex gap-2 items-center">
                <div className='h-0.5 w-screen bg-gray-300'></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className='h-0.5 w-screen bg-gray-300'></div>
            </div>

            <button className='rounded-full border border-gray-500 py-2 px-5 text-center text-lg hover:bg-gray-100
                font-montserrat flex items-center justify-center'
            >
                <FcGoogle size={24} className='mr-3'></FcGoogle>
                Continue with Google
            </button>


            <span className='text-sm text-center'>
                Don't have an account?
                <Link href={'/signUp'} className='underline ml-1'>Sign up</Link>
            </span>
        </div>

    </div>
  )
}

export default LoginPage