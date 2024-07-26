import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className='container bg-white shadow-md rounded-2xl flex items-end gap-6 py-2 px-4'>
        <div className="py-1 px-2 hover:bg-primary hover:text-white rounded-lg text-primary">
            <IoSearchOutline size={28} />
        </div>
        <div className="form__group field w-[80%]">
            <input type="input" className="form__field" placeholder="Ten su kien" name="name" id='name' required />
            <label className="form__label">Tên sự kiện</label>
        </div>

        <div className="form__group field">
            <input type="input" className="form__field" placeholder="01/01/2024" name="date" id='date' required />
            <label className="form__label">Ngày bắt đầu</label>
        </div>
        
    </div>
  )
}

export default SearchBar
