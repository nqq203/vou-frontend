'use client'
import { useState,useRef } from "react"


import FormEvent from "./FormEvent"
import FormGame from "./FormGame"

const Event = () => {
  return(
    <div className='container w-full my-4'>
      <h1 className='text-heading1 font-bold text-primary'>Đăng ký sự kiện</h1>
      {/* <FormEvent /> */}
      <FormGame />

    </div>
  )
}

export default Event