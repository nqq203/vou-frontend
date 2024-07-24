'use client'
import { useState,useRef, useEffect } from "react"
import { useRouter } from "next/navigation";    
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import ImageUploader from "@components/common/ImageUploader";
import Tag from "@components/common/Tag";
import CheckBox from "@components/common/CheckBox";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";


const EventDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'none';
  const status = searchParams.get('status') || 'pending';
//   console.log(id)

  //Other Brands
  const listAvailableBrands = ['Grab','Katinat','BE','Vinfast'];
  const [listBrands, setListBrands] = useState(['Grab','Katinat'])

  // Event
  const [banner, setBanner] = useState(null)
  const [qrImg, setQrImg] = useState(null)
  const [voucherImg, setvoucherImg] = useState(null)
  const [numOfVouchers, setNumOfVouchers] = useState(undefined);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expiredDay, setExpiredDay] = useState(null);
  
  // Game 
  const listGames = ['Quizz','Lắc xu']
  const [openCategory, setOpenCategory] = useState(false)
  const [gameType, setgameType] = useState(listGames[0])
  const [gameName, setGameName] = useState("");

  
  const changeCategory = (state) => {
    if(status !== 'done'){
        setOpenCategory(!state);
    }
  }
  
  // Change Event to Game
  const [isEventForm, setIsEventForm] = useState(true);
  const changeForm = (state) => {
    handleFormData();
    setIsEventForm(!state);
    window.scrollTo(0, 0);
  }

  // Add brand collab
  const addBrand = (brand) => {
    let listBrandsTemp = listBrands;
    if(!listBrandsTemp.includes(brand)){
      listBrandsTemp.push(brand)
    } else {
      listBrandsTemp = listBrandsTemp.filter(item => item !== brand)
    }
    setListBrands(listBrandsTemp);
  }
  
  const formDataEvent = useRef(null);
  const [dataEvent, setDataEvent] = useState({eventInfo: {}, gameInfo: {}});

  const handleFormData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    setDataEvent((prevDataEvent) => ({
      ...prevDataEvent,
      [isEventForm ? 'eventInfo' : 'gameInfo']: { ...formProps },
    }));
  }

  const formatDate = (date) => {
    return format(date,'dd/MM/yyyy');
  }

  const sendData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    const data = {
      ...dataEvent,
      'eventInfo': {
        ...dataEvent.eventInfo,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        expiredDay: formatDate(expiredDay),
      },
      'gameInfo': {
        ...formProps,
        ...{gameType},
      },
      bannerFile: banner,
      QRImage: qrImg,
      voucherImg: voucherImg,
      listBrands: listBrands,
    };
    
    setDataEvent(data);
    console.log(data);

    // delete form data
    push('/brand');

  }

  // routing to dashboard & home
  const {push,router} = useRouter();
  const toDashboard = () => {
    push('/brand/event/eventDashboard');
  }
  const goBackToHomepage = () => {
    push('/brand');
  }

  const preventSubmit = (e) => {
    e.preventDefault();
  }

  return(
    <div className='container w-full my-4'>
      <div className="flex gap-2 items-center">
        <div className="text-primary p-2 cursor-pointer" onClick={goBackToHomepage}>
          <IoChevronBackCircle size={40} />
        </div>
        <h1 className='text-heading1 font-bold text-primary'>Thông tin sự kiện</h1>
      </div>

      <div className='container flex flex-col bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
        <div className="flex justify-between items-center">
            <Tag status={status} />
            <div className="primary_btn_small" onClick={toDashboard}>Xem báo cáo</div>
        </div>
        <form className="container" ref={formDataEvent} onSubmit={(e) => preventSubmit(e)}>    
              {/* Sự kiện và vouchers */}
          {isEventForm ? (
            <div>
              <h2 className='text-heading3_semibold text-primary'>Sự kiện</h2>
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên sự kiện</h5>
                  <input  disabled={status === 'done'} type="text" className="input_text" placeholder="Tên" 
                    name="event_name" defaultValue={dataEvent.eventInfo.event_name }  required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Số lượng vouchers</h5>
                  <input  disabled={status === 'done'} type="number" className="input_text" placeholder="100"
                    name="num_of_vouchers" value={numOfVouchers || ''} onChange={(e) => setNumOfVouchers(e.target.value)} required  />
                </div> 
  
              </div>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                  <DatePicker disabled={status === 'done'} placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy"
                    selected={startDate} minDate={new Date()}  onChange={(date) => setStartDate(date)}   />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                  <DatePicker disabled={status === 'done'} placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy" 
                    selected={endDate} minDate={new Date()} onChange={(date) => setEndDate(date)}  />
                </div>
              </div>
  
              {/* Event image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hình ảnh</h5>
                <ImageUploader image={banner} setResource={setBanner} isDisabled={status === 'done'} />
              </div>
  
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hợp tác với brand khác (Nếu có)</h5>
                <div className="flex gap-4 mt-2">
                  {listAvailableBrands.map((brand,index) => (
                    <CheckBox key={index} label={brand} 
                      disable={status === 'done'}
                      checked={listBrands.includes(brand)} 
                      onClick={() => addBrand(brand)}
                    />
                  ))}
                </div>
              </div>
  
  
              <h2 className='text-heading3_semibold text-primary mt-8'>Vouchers</h2>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Mã voucher</h5>
                  <input  disabled={status === 'done'} type="text" className="input_text" placeholder="XXXXXX" 
                    name="voucher_code" defaultValue={dataEvent.eventInfo.voucher_code }   required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Trị giá</h5>
                  <input  disabled={status === 'done'} type="number" className="input_text" placeholder="100000VNĐ" 
                    name="voucher_price" defaultValue={dataEvent.eventInfo.voucher_price }   required  />
                </div> 
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày hết hạn</h5>
                  <DatePicker disabled={status === 'done'} placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy"
                    selected={expiredDay} minDate={new Date()}  onChange={(date) => setExpiredDay(date)}   />
                </div> 
              </div>
  
              <div className="flex flex-col px-2 py-2 h-[200px]">
                <h5 className="text-base font-semibold">Mô tả</h5>
                <textarea disabled={status === 'done'} type="text" className="input_text h-full" placeholder="Mô tả ngắn gọn về cách sử dụng voucher"
                  name="voucher_description" defaultValue={dataEvent.eventInfo.voucher_description }   required />
              </div>
  
              {/* QR Code image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">QR Code</h5>
                <ImageUploader image={qrImg} setResource={setQrImg} isDisabled={status === 'done'}/>
                
              </div>
              
              {/* Voucher image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hình ảnh voucher</h5>
                <ImageUploader image={voucherImg} setResource={setvoucherImg} isDisabled={status === 'done'}/>
              </div>
  
              <div className="primary_btn w-[200px] mt-8" onClick={() => changeForm(isEventForm)}>Tiếp theo</div>
            </div>
          ) : (

            /* Tro choi */
            <div>
               <h2 className='text-heading3_semibold text-primary'>Trò chơi</h2>
              <div className="flex gap-4">

                <div className="flex flex-col px-2 py-1 min-w-[424px] ">
                    <h5 className="text-base font-semibold">Lĩnh vực</h5>
                    <div className="input_dropdown" onClick={() => changeCategory(openCategory)}>
                    <span className='text-gray-900'>{gameType}</span>
                    <MdOutlineArrowDropDown size={28}/>
                    </div>

                    {openCategory ? 
                    (
                        <div 
                        className="absolute z-10 mt-[88px] w-[400px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                          <ul className="py-1 " role="none">
                              {listGames.map((item) => (
                              <li key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
                                  role="menuitem" value={item} onClick={(e) => {setgameType(e.target.textContent); setOpenCategory(false);}}
                              > 
                                  {item}
                              </li>
                              ))}
                          </ul>
                        </div>
                    )
                    : <></>
                    }
                    
                </div>

                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên trò chơi</h5>
                  <input  disabled={status === 'done'} type="text" className="input_text" placeholder="Ten tro choi"
                    name="game_name" value={gameName || ''} onChange={(e) => setGameName(e.target.value)}    required  />
                </div>                 
                 
              </div>
  
              {/* Nội dung trò chơi */}
              <h2 className='text-heading3_semibold text-primary mt-8'>Phần nội dung trò chơi</h2>
              {gameType === 'Quizz' ? (
                Array.from({ length: 10 }).map((_, i) => (
                    <div className="flex flex-col px-2 py-2 mb-2" key={i}>
                        <h5 className="text-base font-semibold ">Câu hỏi {i + 1}</h5>
                        <input  disabled={status === 'done'}
                            type="text"
                            className="input_text"
                            placeholder="Tên"
                            name={`question${i + 1}`}
                            defaultValue={dataEvent.gameInfo[`question${i + 1}`] }  
                            required
                        />

                        <div className="flex gap-4">
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Đáp án</h5>
                            <input  disabled={status === 'done'} type="text" className="input_text" placeholder="Câu trả lời" 
                              name={`${i + 1}_answer_1`} defaultValue={dataEvent.gameInfo[`${i + 1}_answer_1`] }   required  />
                            </div>
            
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Trả lời 1</h5>
                            <input  disabled={status === 'done'} type="text" className="input_text" placeholder="Câu trả lời" 
                              name={`${i + 1}_answer_2`} defaultValue={dataEvent.gameInfo[`${i + 1}_answer_2`] }   required  />
                            </div> 
            
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Trả lời 2</h5>
                            <input  disabled={status === 'done'} type="text" className="input_text" placeholder="Câu trả lời" 
                              name={`${i + 1}_answer_3`} defaultValue={dataEvent.gameInfo[`${i + 1}_answer_3`] }   required  />
                            </div> 
                        </div>
                    </div>
                ))
              ) : (
                <div className="flex flex-col px-2 py-2 ">
                  <h5 className="text-base font-semibold">Chọn số lượng vật phẩm</h5>
                  <span className="text-medium font-light italic tex-gray-700">Hệ thống sẽ random các vật phẩm theo số lượng yêu cầu</span>
                  <input  disabled={status === 'done'} type="number" className="input_text" placeholder="3" 
                    name="num_of_items" defaultValue={dataEvent.gameInfo.num_of_items }   required  />
                </div> 
              )}

              <div className="flex gap-4 w-[422px]">
                <div className="outline_btn w-[200px] mt-8" onClick={() => changeForm(isEventForm)}>Trở lại</div>
                {status === 'done' ? null : (
                    <div className="primary_btn w-[200px] mt-8" onClick={() => sendData()}>Lưu thay đổi</div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default EventDetail