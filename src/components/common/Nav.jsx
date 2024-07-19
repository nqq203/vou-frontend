"use client";
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react"

import { AiFillHome } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa";


const Nav = (isAdmin) => {
    const [isAuthen, setIsAuthen] = useState(false)


  return (
    <nav className="flex flex-col h-screen gap-4 pt-4 w-[250px] bg-white shadow">
        <Link href="/" className="flex gasidebar_icon flex-center" >
            <Image 
                src="icons/vou_logo.svg"
                alt="VOU"
                width={30}
                height={30}
                className="object-contain mr-1"
            />
            <p className="logo_text">VOU</p>
        </Link>

        <div className="sm:flex hidden flex-center">
            <Link href={'/signIn'} className="primary_btn">
                Sign In
            </Link>
        </div>

        {/* Brands */}
        <ul className="hidden">
            <li className="sidebar_icon sidebar_active">
                <div className="w-1.5 bg-orange-500 rounded-tr-[10px] rounded-br-[10px] mr-4"></div>
                <AiFillHome size={25}/>
                Trang chủ
            </li>

            <li className="sidebar_icon">
                <FaRegCalendarPlus size={25} />
                Đăng ký sự kiện
            </li>

            <li className="sidebar_icon">
                <MdAccountBox size={25}/>
                Tài khoản
            </li>

        </ul>

        {/* Admin */}
        <ul className="">
            <li className="sidebar_icon sidebar_active">
                <div className="w-1.5 bg-orange-500 rounded-tr-[10px] rounded-br-[10px] mr-4"></div>
                <AiFillHome size={25}/>
                Trang chủ
            </li>

            <li className="sidebar_icon">
                <MdSupervisorAccount size={25}/>
                Quản lí tài khoản
            </li>

            <li className="sidebar_icon">
                <MdEvent size={25}/>
                Quản lí sự kiện
            </li>

            <li className="sidebar_icon">
                <FaGamepad size={25}/>
                Quản lí trò chơi
            </li>

            <li className="sidebar_icon">
                <MdAccountBox size={25}/>
                Tài khoản
            </li>

        </ul>
    </nav>
    )
}

export default Nav