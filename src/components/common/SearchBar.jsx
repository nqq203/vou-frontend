"use client"
import { FaSearch, FaPlus } from "react-icons/fa";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-[10px] shadow-md p5">
      <FaSearch className="text-center mr-3 ml-3 text-primary cursor-pointer"/>
      <input type="text" placeholder="Search..." className="flex-grow border-b-2 bg-transparent mt-3 mb-3 mr-3 outline-none placeholder:font-bold"/>
      <Image src="/icons/filter.svg" alt="filter" width={20} height={20} className="cursor-pointer ml-4"/>
      <button className="text-primary border-2 p-2 ml-4 mr-4 items-center flex flex-row rounded-[12px] border-primary text-[14px]">
        <FaPlus className="mr-2"/>
        Thêm tài khoản
      </button>
    </div>
  )
}