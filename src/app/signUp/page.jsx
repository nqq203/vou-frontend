'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react';


const SignUpPage = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

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
                <h2 className=' text-[24px] text-center text-semibold'>Create an account</h2>
            </div>

            <div className='flex flex-col gap-3'>
                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Username</span>
                    <input placeholder='username' name='username' type='text' className='search_input'></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Password</span>
                    <input placeholder='12345' name='password' type='password' className='search_input'></input>
                    <span className="text-xs text-gray-500 ">
                        Use 8 or more characters including upper and lower case letters, number, symbol (e.g. !@#$)
                    </span>

                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Email</span>
                    <input placeholder='email@gmail.com' name='email' type='email' className='search_input'></input>
                </div>

                <div className="container flex flex-col">
                    <span className='text-sm mb-1'>Phone</span>
                    <input placeholder='096100200' name='phone' type='phone' className='search_input'></input>
                </div>

                <span className="text-sm text-gray-500 text-center">By creating an account, you agree to the Terms of use and Privacy Policy</span>

                <button className='primary_btn'>Sign Up</button>
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