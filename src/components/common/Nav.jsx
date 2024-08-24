"use client";
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect,useRef } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react"

import { AiFillHome } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { MdAccountBox } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa";
import { useSelector } from "react-redux";


const Nav = (isAdmin) => {
    const role =  useSelector((state) => state.auth.role);
    
    const brandNav = useRef(null);
    const adminNav = useRef(null);
    
    if(role === 'ADMIN'){
        isAdmin = true;
    } else {
        isAdmin = false;
    }

  useEffect(() => {
    let items = []
      if(isAdmin){
          adminNav.current.classList.remove('hidden');
        items = adminNav.current.children;

      } else {
          brandNav.current.classList.remove('hidden');
         items = brandNav.current.children;
      }

      const currentTab = localStorage.getItem('currentTab') 

    for (let i = 0; i < items.length; i++) {
        const listItem = items[i].querySelector('li');
    
        if(currentTab === listItem.textContent){
            listItem.classList.add('sidebar_active');
            const newDiv = document.createElement('div');
            newDiv.className = 'w-1.5 bg-orange-500 rounded-tr-[10px] rounded-br-[10px] mr-4';
            listItem.insertBefore(newDiv, listItem.firstChild);
            break;
        }
    }



  },[adminNav,brandNav])

  const handleClick = (e) => {
    localStorage.setItem('currentTab',e.target.textContent)
    console.log(e.target.textContent);
    let items = brandNav.current.children;
    if(isAdmin){
        items = adminNav.current.children
    }

        // Remove 'sidebar_active' class and the div from all items
        for (let i = 0; i < items.length; i++) {
            const listItem = items[i].querySelector('li');
            if (listItem) {
                listItem.classList.remove('sidebar_active');
                const divElement = listItem.querySelector('.bg-orange-500');
                if (divElement) {
                    listItem.removeChild(divElement);
                }
            }
        }

        // Add 'sidebar_active' class to the clicked item
        e.currentTarget.classList.add('sidebar_active');

        // Add the div element to the clicked item
        const newDiv = document.createElement('div');
        newDiv.className = 'w-1.5 bg-orange-500 rounded-tr-[10px] rounded-br-[10px] mr-4';
        e.currentTarget.insertBefore(newDiv, e.currentTarget.firstChild);
  }

  return (
    <nav className="flex flex-col h-full gap-4 pt-4 w-[240px] bg-white shadow">
        <div className="flex gasidebar_icon flex-center" >
            <Image 
                src="../../icons/vou_logo.svg"
                alt="VOU"
                width={30}
                height={30}
                className="object-contain mr-1"
            />
            <p className="logo_text">VOU</p>
        </div>

        {/* Brands */}
        <ul className="hidden" ref={brandNav}>
            <Link href={'/brand'} >
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)} >
                    <AiFillHome size={25}/>
                    Trang chủ
                </li>
            </Link>


            <Link href={'/brand/event'} >
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)}>
                    <FaRegCalendarPlus size={25} />
                    Đăng ký sự kiện
                </li>
            </Link>

            <Link href={'/brand/account'} >
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)}>
                    <MdAccountBox size={25}/>
                    Tài khoản
                </li>
            </Link>

        </ul>

        {/* Admin */}
        <ul className="hidden" ref={adminNav}>
            <Link href="/admin">
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)} >
                    <AiFillHome size={25}/>
                    Trang chủ
                </li>
            </Link>

            <Link href="/admin/accounts">
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)}>
                        <MdSupervisorAccount size={25}/>
                        Quản lí tài khoản
                </li>
            </Link>

            <Link href="/admin/games">
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)}>
                    <FaGamepad size={25}/>
                    Quản lí trò chơi
                </li>
            </Link>

            <Link href="/admin/profile">
                <li className={`sidebar_icon`} onClick={(e) => handleClick(e)}>
                    <MdAccountBox size={25}/>
                    Tài khoản
                </li>
            </Link>

        </ul>
    </nav>
    )
}


export default Nav