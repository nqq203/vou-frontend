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
                src="/icons/vou_logo.svg"
                alt="VOU"
                width={30}
                height={30}
                className="object-contain mr-1"
            />
            <p className="logo_text">VOU</p>
        </Link>

        <div className="sm:flex hidden flex-center">
            <button
                type="button"
                key={1}
                onClick={() => {}}
                className="black_btn"
            >
                Sign In
            </button>
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
            <Link href="/admin">
                <li className="sidebar_icon sidebar_active">
                    <div className="w-1.5 bg-orange-500 rounded-tr-[10px] rounded-br-[10px] mr-4"></div>
                    <AiFillHome size={25}/>
                    Trang chủ
                </li>
            </Link>

            <Link href="/admin/accounts">
                <li className="sidebar_icon">
                        <MdSupervisorAccount size={25}/>
                        Quản lí tài khoản
                </li>
            </Link>


            <Link href="/admin/events">
                <li className="sidebar_icon">
                    <MdEvent size={25}/>
                    Quản lí sự kiện
                </li>
            </Link>

            <Link href="/admin/games">
                <li className="sidebar_icon">
                    <FaGamepad size={25}/>
                    Quản lí trò chơi
                </li>
            </Link>

            <li className="sidebar_icon">
                <MdAccountBox size={25}/>
                Tài khoản
            </li>

        </ul>
    </nav>

// {/* <div class="w-[250px] h-[1024px] relative shadow">
//   <div class="w-px h-[1024px] left-[249px] top-0 absolute bg-slate-200"></div>
//   <div class="w-[187px] h-[158px] left-0 top-[101px] absolute">
//     <div class="left-0 top-0 absolute justify-start items-center gap-6 inline-flex">
//       <div class="w-1.5 h-[60px] bg-orange-500 rounded-tr-[10px] rounded-br-[10px]"></div>
//       <div class="justify-start items-center gap-4 flex">
//         <div class="w-[25px] h-[25px] relative"></div>
//         <div class="text-orange-500 text-xl font-bold font-['Montserrat']">Homepage</div>
//       </div>
//     </div>
//     <div class="left-[30px] top-[79px] absolute justify-start items-center gap-4 inline-flex">
//       <div class="w-[25px] h-[25px] relative"></div>
//       <div class="text-zinc-400 text-xl font-medium font-['Montserrat']">Đăng ký sự kiện</div>
//     </div>
//     <div class="left-[30px] top-[133px] absolute justify-start items-end gap-4 inline-flex">
//       <div class="w-[25px] h-[25px] relative"></div>
//       <div class="text-zinc-400 text-xl font-medium font-['Montserrat']">Tài khoản</div>
//     </div>
//   </div>
//   <div class="left-[61px] top-[25px] absolute justify-start items-center gap-[9px] inline-flex">
//     <div class="w-12 h-[54.35px] flex-col justify-center items-center inline-flex">
//       <img class="w-12 h-[54.35px]" src="https://via.placeholder.com/48x54" />
//     </div>
//     <div class="text-orange-500 text-[25px] font-bold font-['Montserrat']">VOU</div>
//   </div>
// </div> */}

    )
}

export default Nav