'use client'
import React from 'react'
import { useRef } from 'react';

const ImageUploader = ({image,setResource}) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  } 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imgname = e.target.files[0]?.name;
    if(imgname){
      const fileUrl = URL.createObjectURL(file)
      setResource(fileUrl);
      handleUploadButtonClick(file)
    }
  };

  const handleUploadButtonClick = (file) => {
    console.log(file)
  }

  return (
    <div className="flex items-center justify-center w-auto mt-2" onClick={handleClick}>
        {image ? (
        <img
            className="w-auto h-64 ring-2 ring-white"
            width={130}
            height={130}
            src={image}
            alt="upload image"
            />
        ) : (
        <div className="relative flex flex-col justify-center items-center w-full h-[200px] bg-gray-50 text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer">
            <div class="absolute z-10 self-center flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
            </div>
        </div>
        )}

        <input
        id="image-upload-input"
        type="file"
        onChange={handleImageChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        />
    </div>
  )
}

export default ImageUploader