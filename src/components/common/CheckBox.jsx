import React from 'react'
import '../../../styles/inputCustom.css'
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';

const CheckBox = ({id, label, checked, disable=false, ...props}) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleClick = () => {
        if(!disable){
            setIsChecked((prev) => !prev);
        }
    }

    return (
      <div className="flex gap-1" {...props}>
          <div className='relative border border-gray-300 p-3 rounded-md' onClick={handleClick}>
            <FaCheck size={24} className={`absolute top-[1px] right-[-1px] text-primary ${isChecked ? "" : "hidden"}`} />
          </div>
          <div onClick={handleClick}>
            <span>{label}</span>
          </div>
      </div>
    );
}

export default CheckBox