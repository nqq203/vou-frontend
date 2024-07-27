'use client'
import { useState, useRef} from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Notification from "@components/common/Notification";

const AdminProfile = () => {
    const listCategory = ['Đồ ăn', 'Vận chuyển', 'Mỹ phẩm', 'Thức uống']
    const listStates = ['Active', 'InActive', 'Pending']
    const [category, setCategory] = useState(listCategory[0]);
    const [accountState, setAccountState] = useState(listStates[0])
    const [openCategory, setOpenCategory] = useState(false)
    const [openStates, setOpenStates] = useState(false)
    const [showNoti, setShowNoti] = useState(false)
  
    const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80")
    const hiddenFileInput = useRef(null);
  
    const formAccount = useRef(null);
  
    const changeState = (state) => {
      setOpenStates(!state);
    }
  
    const changeCategory = (state) => {
      setOpenCategory(!state);
    }
  
    const handleClick = () => {
      hiddenFileInput.current.click();
    } 
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const imgname = e.target.files[0]?.name;
      if(imgname){
        const fileUrl = URL.createObjectURL(file)
        setAvatar(fileUrl);
        handleUploadButtonClick(file)
      }
    };
  
    const handleUploadButtonClick = (file) => {
      console.log(file)
    }
  
    const handleFormData = () => {
      const formData = new FormData(formAccount.current);
      const formProps = Object.fromEntries(formData);
      console.log(formProps)
      // console.log("category: ", category);
      // console.log("status: ", accountState);
      // console.log("avatar: ", avatar); // not yet 
  
      setShowNoti(true);
    }
  
    const closeNoti = () => {
      setShowNoti(false)
    }
  
    return (
      <div className='container w-full my-4'>
        <div className={`${showNoti ? '' : 'hidden'} absolute container w-screen h-screen bg-gray-50 bg-opacity-50` }>
          <Notification type={'success'} title={'Thành công'} content={'Thông tin đã được cập nhật'} close={closeNoti}/>
        </div>
        <h1 className='text-heading1 font-bold text-primary'>Thông tin tài khoản</h1>
  
        <div className='container flex justify-center bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
          <div className="flex flex-col min-w-[150px] items-center gap-4">
              <span className="text-heading3_bold text-primary text-center">Admin</span>
              <img
                className="inline-block h-[130px] w-[130px] rounded-full ring-2 ring-white"
                width={130}
                height={130}
                src={avatar}
                alt="upload image"
              />
              <input
                id="image-upload-input"
                type="file"
                onChange={handleImageChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            
              <span className="text-base font-semibold cursor-pointer hover:underline" onClick={handleClick} >Chỉnh sửa</span>
          </div>
  
          <form id='form-account' ref={formAccount} className="container" onSubmit={(e) => {e.preventDefault()}} >
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên tài khoản</h5>
                  <input disabled type="text" className="input_text_disabled" value={'Admin'} name="accountName"   />
                </div>
  
                <div className="flex flex-col px-2 py-2 min-w-[424px]">
                  <h5 className="text-base font-semibold">Email</h5>
                  <input disabled type="text" className="input_text_disabled" value={'admin@gmail.com'} name="email"  />
                </div>
  
              </div>
  
            <div className="flex gap-4">
              <div className="flex flex-col px-2 py-2 grow">
                <h5 className="text-base font-semibold">Tên đăng nhập</h5>
                <input type="text" className="input_text" placeholder="username" defaultValue="" name="username" required />
              </div>

              <div className="flex flex-col px-2 py-2 min-w-[424px]">
                <h5 className="text-base font-semibold">Điện thoại</h5>
                <input type="text" className="input_text" placeholder="+84" defaultValue="" name="phone" required />
              </div>
            </div>

              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Họ và tên</h5>
                <input type="text" className="input_text" placeholder="Nguyen Van A" defaultValue="" name="fullName" required />
              </div>

              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Địa chỉ</h5>
                <input type="text" className="input_text" placeholder="227 Nguyễn Văn Cừ" defaultValue="" name="address" required />
              </div>
  
              <div className="flex flex-col px-2 py-1 w-[424px] ">
                  <h5 className="text-base font-semibold">Trạng thái</h5>
                  <div className="input_dropdown" onClick={() => changeState(openStates)}>
                    <span className='text-gray-900'>{accountState}</span>
                    <MdOutlineArrowDropDown size={28}/>
                  </div>
  
                  {openStates ? 
                    (
                      <div 
                        className="absolute z-10 mt-[88px] w-[400px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                        <div className="py-1 " role="none">
                          {listStates.map((item) => (
                            <a href="#" key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
                              role="menuitem" value={item} onClick={(e) => {setAccountState(e.target.textContent); setOpenStates(false);}}
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
  
              <div className="primary_btn w-[200px] mt-8" onClick={handleFormData}>Lưu thông tin</div>
          </form>
        </div>
      </div>
    )
}

export default AdminProfile