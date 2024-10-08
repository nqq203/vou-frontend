'use client'
import { MdOutlineArrowDropDown } from "react-icons/md";
import Notification from "@components/common/Notification";
import { callApiGetUser, callApiUpdateAccount, callApiUpdateAccountImage } from "@pages/api/user";
import TitlePage from "@components/common/TitlePage";
import { useState, useRef, useEffect} from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateStates } from "@redux/auth";
import ChangePassForm from "./ChangePassForm";

import dynamic from "next/dynamic";
const Map = dynamic(()  => import("@components/common/Map"),{ssr: false})

const Account = () => {
  const data = useSelector(state => state.auth)
  console.log(data);
  const dispatch = useDispatch();
  const listCategory = ['Đồ ăn', 'Vận chuyển', 'Mỹ phẩm', 'Thức uống']
  const [field, setField] = useState(data.field);
  const [openCategory, setOpenCategory] = useState(false)
  
  const [avatar, setAvatar] = useState(data.avatarUrl || '/images/defaultAva.jpg')
  const [tempAvatar, setTempAvatar] = useState(data.avatarUrl || '/images/defaultAva.jpg')
  
  const hiddenFileInput = useRef(null);
  const formAccount = useRef(null);

  // Change password form
  const [showChangePassForm, setShowChangePassForm] = useState(false);
  function handleCloseForm() {
    setShowChangePassForm(false);
  }

  // Notification
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');


  const [brandInfo, setBrandInfo] = useState({
    idUser: data.idUser,
    username: data.username,
    fullName: data.fullName,
    phoneNumber: data.phoneNumber,
    email: data.email,
    address: data.address,
    status: data.status,
    role: data.role,
    avatarUrl: avatar,
    field: field,
    latitude: data.latitude,
    longitude: data.longitude,
  })

  const setValue = (e) => {
    setBrandInfo({
      ...brandInfo,
      [e.target.name]: e.target.value,
    })
  }

  const changeCategory = (state) => {
    setOpenCategory(!state);
  }

  const handleImageEdit = () => {
    hiddenFileInput.current.click();
  } 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imgname = e.target.files[0]?.name;
    if(imgname){
      const fileUrl = URL.createObjectURL(file)
      setAvatar(file);
      setTempAvatar(fileUrl);
    }
  };

  const closeNoti = () => {
    setShowNoti(false)
  }  

  const updateAccountMutation = useMutation(
    async ({updatedData, avatar}) => {
      const updatedAccount = await callApiUpdateAccount(brandInfo.idUser,updatedData);
      let updatedAva = null;
      if(avatar instanceof File){
        updatedAva = await callApiUpdateAccountImage(brandInfo.idUser,avatar);
      }
      return {updatedAccount,updatedAva};
    },
    {
      onSuccess: (data) => {
        console.log(data)
        setIsError(false);
        setShowNoti(true);
        setNotiMsg("Cập nhật thông tin thành công");

        // Update redux
        // dispatch(updateStates(data.updatedAccount.metadata));
        const avatar = data.updatedAva?.metadata;
        if(data.updatedAva != null){
          const updatedData = {
            ...(data.updatedAccount.metadata),
            avatarUrl: avatar
          };
          console.log("Update: ", updatedData);
          dispatch(updateStates(updatedData));
        } else {
          console.log("No new ava: ",data.updatedAccount.metadata )
          dispatch(updateStates(data.updatedAccount.metadata));
        }
      },
      onError: (error) => {
          const msgErr = error.response.data.message;
          setIsError(true);
          setShowNoti(true);
          setNotiMsg(msgErr);
      },

    }
  )

  const submitFormData = () => {
    const formData = new FormData(formAccount.current);
    const formProps = Object.fromEntries(formData);

    // parseFloat(formProps.longitude) + 0.0001
    const updateData = {
      ...formProps,
      longitude: parseFloat(location.longitude) ,
      latitude: parseFloat(location.latitude) ,
      address: location.address,
      field,
    }
    
    updateAccountMutation.mutate({ updatedData: updateData, avatar: avatar });
  }

  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState({
    longitude: brandInfo.longitude || 106.68194889934966, 
    latitude: brandInfo.latitude || 10.762850154401937,
    address: brandInfo.address || "Đại học Khoa học Tự nhiên",
  })
  const closeLocationForm = () => {
    setShowMap(false);
    console.log(location)
  }  

  return (
    <div className='container w-full my-4'>
      {showMap && <Map location={location} 
        editLocation={setLocation}
        handleClose={closeLocationForm} />
      }
      {showChangePassForm && <ChangePassForm handleClose={handleCloseForm}/>}
      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>
      <TitlePage title={"Thông tin thương hiệu"} />

      <div className='container flex bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
        <div className="flex flex-col min-w-[150px] items-center gap-4">
            <span className="text-heading3_bold text-primary text-center">{brandInfo.fullName}</span>
            <img
              className="inline-block h-[130px] w-[130px] rounded-full ring-2 ring-white object-cover"
              width={130}
              height={130}
              src={tempAvatar}
              alt="upload image"
            />
            <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />

          <span className="text-base font-semibold text-black cursor-pointer hover:underline" onClick={handleImageEdit}>Chỉnh sửa</span>
        </div>

        <form id='form-account' ref={formAccount} className="container" onSubmit={(e) => {e.preventDefault()}} >
            <div className="flex gap-4">
              <div className="flex flex-col px-2 py-2 grow">
                <h5 className="text-base font-semibold">Tên thương hiệu</h5>
                <input type="text" className="input_text" placeholder="Ten thuong hieu" 
                  value={brandInfo.fullName} name="fullName" required onChange={(e) => setValue(e)}  />
              </div>

              <div className="flex flex-col px-2 py-2 min-w-[424px] ">
                <h5 className="text-base font-semibold">Lĩnh vực</h5>
                <div className="input_dropdown" onClick={() => changeCategory(openCategory)}>
                  <span className='text-gray-900'>{field}</span>
                  <MdOutlineArrowDropDown size={28}/>
                </div>

                {openCategory ? 
                  (
                    <div 
                      className="absolute z-10 mt-[88px] w-[400px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                      role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                      <div className="py-1 " role="none">
                        {listCategory.map((item) => (
                          <a key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
                            role="menuitem" value={item} onClick={(e) => {setField(e.target.textContent); setOpenCategory(false);}}
                          > 
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                  : <></>
                }
                
              </div>

            </div>

            <div className="flex gap-4">
              <div className="flex flex-col px-2 py-2 grow">
                <h5 className="text-base font-semibold">Tên đăng nhập</h5>
                <input type="text" className="input_text" placeholder="username" defaultValue={brandInfo.username} name="username" required onChange={(e) => setValue(e)} />
              </div>

              <div className="flex flex-col px-2 py-2 w-[424px] ">
                <h5 className="text-base font-semibold">Trạng thái</h5>
                <input disabled type="text" className="input_text_disabled" defaultValue={brandInfo.status} name="status" required />               
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col px-2 py-2 grow">
                <h5 className="text-base font-semibold">Email</h5>
                <input type="email" className="input_text" placeholder="email@gmail.com" defaultValue={brandInfo.email} name="email" onChange={(e) => setValue(e)}  />
              </div>

              <div className="flex flex-col px-2 py-2 min-w-[424px]">
                <h5 className="text-base font-semibold">Điện thoại</h5>
                <input type="text" className="input_text" placeholder="+84" defaultValue={brandInfo.phoneNumber} name="phoneNumber" required onChange={(e) => setValue(e)} />
              </div>
            </div>

            <div className="flex flex-col px-2 py-2">
              <h5 className="text-base font-semibold">Địa chỉ</h5>
              <input type="text" className="input_text_disabled" placeholder="227 Nguyễn Văn Cừ" value={location.address} name="address" required onChange={(e) => setValue(e)} />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col px-2 py-2 grow">
                <h5 className="text-base font-semibold">Kinh độ</h5>
                <input type="number" className="input_text" placeholder="23.01" value={location.longitude} name="longitude" required onChange={(e) => setValue(e)} />
              </div>

              <div className="flex flex-col px-2 py-2 grow">
                <h5 className="text-base font-semibold">Vĩ độ</h5>
                <input type="number" className="input_text" placeholder="100.01" value={location.latitude} name="latitude" required onChange={(e) => setValue(e)} />
              </div>
              <div className="outline_btn max-w-[200px] h-[36px] mt-11" onClick={() => setShowMap(true)}>Chọn vị trí</div>

            </div>

            <div onClick={() => setShowChangePassForm(true)} className="flex flex-col px-2 py-2 min-w-[424px] justify-center">
                <h5 className="text-base text-primary font-semibold underline">Đổi mật khẩu</h5>
            </div>
            <div className="primary_btn w-[200px] mt-8" onClick={submitFormData}>Lưu thông tin</div>
        </form>
      </div>
    </div>
  )
}

export default Account