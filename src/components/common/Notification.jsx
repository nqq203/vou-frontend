'use client'
import { IoClose } from "react-icons/io5";
import { useRef } from 'react';

const Notification = ({type,title,content,close,containerStyle,...props}) => {
  const notiContainer = useRef();
  
  return (
    <div ref={notiContainer} className={`animate-bottom_to_mid fixed min-w-[350px]  ${type === 'success' ? 'bg-active' : 'bg-red'}  text-white p-4 shadow-md rounded-sm' ${containerStyle}`} {...props}>
        <div className='flex justify-between text-heading3_semibold mb-2'>
            {title}
          <IoClose size={28} className="cursor-pointer hover:opacity-75"  onClick={close}/>
        </div>

        <p>{content}</p>
    </div>
  )
}

export default Notification;