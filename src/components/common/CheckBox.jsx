import React from 'react'
import '../../../styles/inputCustom.css'
import { FaCheck } from "react-icons/fa6";
import { useState,useEffect } from 'react';

const CheckBox = ({id, label, image, checked, disable=false, ...props}) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    // console.log("Checkbox")


    const handleClick = () => {
        if(!disable){
            setIsChecked((prev) => !prev);
        }
    }

    return (
      <div className="flex flex-col gap-1 justify-center items-center" {...props} >
          <div className='flex flex-col gap-1 justify-center items-center' onClick={handleClick}>
            <img
              className="h-10 w-10"
              src={image || "https://placehold.co/40x40"}
              alt={label + " image"}
            />
            <span>{label}</span>
          </div>
          
          <div className={`${disable ? "bg-gray-100" : ""} relative w-5 h-5  border border-gray-300 p-3 rounded-md`} onClick={handleClick}>
            <FaCheck size={24} className={`absolute top-[1px] right-[-1px] text-primary ${isChecked ? "" : "hidden"}`} />
          </div>
          
      </div>
    );
}

export default CheckBox