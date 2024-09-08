'use client'
import { useState,useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import {vi} from 'date-fns/locale'
import { useRouter } from "next/navigation";    
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useCallback } from "react";
import { useQuery,useMutation } from "react-query";
import { useSelector } from "react-redux";

import ImageUploader from "@components/common/ImageUploader";
import Tag from "@components/common/Tag";
import CheckBox from "@components/common/CheckBox";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";

import Notification from "@components/common/Notification";
import TitlePage from "@components/common/TitlePage";
import FormGame from "../FormGame";
import { convertDataToOutput,convertInputToSave } from "@utils/date";
import { callApiGetEventDetail, callApiUpdateEventDetail,callApiUploadEventImgs } from "@pages/api/event";

const EventDetail = () => {
  const {push} = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('s') || "active";
  const idEvent = searchParams.get('id') || 0;  
  const eventStore = useSelector(state=> state.event);

  //Event
  const formDataEvent = useRef(null);
  const [dataEvent, setDataEvent] = useState({});
  const idBrand = useSelector(state => state.auth.idUser);

  // Notification
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');

  //Other Brands
  const listAvailableBrands = eventStore.listAvailableBrands;
  const [listBrands, setListBrands] = useState([])

  // Event
  const [banner, setBanner] = useState(undefined)
  const [qrImg, setQrImg] = useState(undefined)
  const [voucherImg, setvoucherImg] = useState(undefined)
  const [numOfVouchers, setNumOfVouchers] = useState(dataEvent.numberOfVouchers);
  const [startDate, setStartDate] = useState(convertDataToOutput(dataEvent.startDate));
  const [endDate, setEndDate] = useState(convertDataToOutput(dataEvent.endDate));
  const [expiredDay, setExpiredDay] = useState(convertDataToOutput(dataEvent.inventoryInfo?.expiration_date));
  const [eventName, setEventName] = useState("")

  // Game 
  const listGames = ['Quizz','Lắc xu']
  const [openCategory, setOpenCategory] = useState(false)
  const [gameType, setgameType] = useState(dataEvent.gameInfoDTO?.gameType === "shake-game" ? "Lắc xu" : "Quizz");
  const [gameName, setGameName] = useState(dataEvent.gameInfoDTO?.name);

  // Voucher
  const [voucherCode, setVoucherCode] = useState("")
  const [voucherDescription, setVoucherDescription] = useState("")
  const [voucherName, setVoucherName] = useState("")
  const [voucherPrice, setVoucherPrice] = useState("")

  // List items game LAC XU
  const listAvailableItems = eventStore.listAvailableItems;
  const [listItems, setListItems] = useState([]);
  const [hasItemCoin, setHasItemCoin] = useState(false);

  // Game quiz
  const [startedAt, setGameStartAt] = useState(convertDataToOutput(dataEvent.gameInfoDTO?.startedAt));
  const [quizData, setQuizData] = useState({});

  // Voucher Type
  const listVoucherType = ['Online','Offline']
  const [openCategoryVoucher, setOpenCategoryVoucher] = useState(false)
  const [voucherType, setvoucherType] = useState(dataEvent.inventoryInfo?.voucher_type)
  
  const changeCategoryVoucher = (state) => {
    if(status !== "done"){
      setOpenCategoryVoucher(!state);
    }    
  }

  const {isFetching, refetch} = useQuery(
    "fetch-event-detail",
    () => callApiGetEventDetail(idEvent),
    {
      onSuccess: (data) => {
        console.log(data.metadata);
        setDataEvent(data.metadata);
        setEventName(data.metadata?.eventName);
        setNumOfVouchers(data.metadata?.numberOfVouchers);
        setStartDate(convertDataToOutput(data.metadata?.startDate));
        setEndDate(convertDataToOutput(data.metadata?.endDate));
        setExpiredDay(convertDataToOutput(data.metadata?.inventoryInfo?.expiration_date));
        
        setgameType(data.metadata?.gameInfoDTO?.gameType === "shake-game" ? "Lắc xu" : "Quizz");
        setGameName(data.metadata?.gameInfoDTO?.name);
        
        setGameStartAt(convertDataToOutput(data.metadata?.gameInfoDTO?.startedAt))

        setQuizData(data.metadata?.gameInfoDTO.quiz.sort((a, b) => a.quizId - b.quizId));
        setvoucherType(data.metadata?.inventoryInfo?.voucher_type);
        setVoucherCode(data.metadata?.inventoryInfo?.voucher_code);
        setVoucherDescription(data.metadata?.inventoryInfo?.voucher_description);
        setVoucherName(data.metadata?.inventoryInfo?.voucher_name);
        setVoucherPrice(data.metadata?.inventoryInfo?.voucher_price);

        setBanner(data.metadata?.imageUrl);
        setvoucherImg(data.metadata?.inventoryInfo?.imageUrl);
        setQrImg(data.metadata?.inventoryInfo?.qrCode);
        const dataItems = data.metadata?.inventoryInfo?.items;
        setListItems(dataItems.map(item => {
          if(item.idItem === 5) setHasItemCoin(true);
          return item.idItem;
        }))
        

        const dataBrand = data.metadata?.brandId
        setListBrands(dataBrand.map(brand => brand.idBrand));
      },
      onError: (error) => {
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
      },
    }
  )
  useEffect(()=>{
    console.log("Refecth")
    window.scrollTo(0, 0);
    refetch();
  },[idEvent])

  const updateEventMutation = useMutation(
    async (data) => {
      const newEvent = await callApiUpdateEventDetail(idEvent,data);

      const images = (banner === undefined && qrImg === undefined && voucherImg === undefined) ? null : {
        bannerFile: banner,
        QRImage: qrImg,
        voucherImg: voucherImg,
      }
      // console.log(images);
      if(images != undefined){
        const eventImg = await callApiUploadEventImgs(idEvent,images)
        // console.log("Upload ảnh:" , eventImg);
        return {newEvent,eventImg}
      }
      return {newEvent}
    },
    {
      onSuccess: (data) => {
        console.log("Suc: " ,data)
        setIsEventForm(true);
        window.scrollTo(0, 0);

        setIsError(false);
        setShowNoti(true);
        setNotiMsg("Cập nhật thông tin thành công");
      },
      onError: (error) => {
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
      },
    }
  )
  
  // Change Event to Game
  const [isEventForm, setIsEventForm] = useState(true);
  const changeForm = (state) => {
    console.log(listItems);
    console.log(hasItemCoin)
    setIsEventForm(!state);
    window.scrollTo(0, 0);
  }

  // Add brand collab
  const addBrand = (brand) => {
    let listBrandsTemp = listBrands;
    if(!listBrandsTemp.includes(brand.idUser)){
      listBrandsTemp.push(brand.idUser)
    } else {
      listBrandsTemp = listBrandsTemp.filter(item => item !== brand.idUser);
    }
    setListBrands(listBrandsTemp);
  }

  // Add items game
  const addItems = (item) => {
    let listItemsTemp = listItems;
    if(!listItemsTemp.includes(item.idItem)){
      listItemsTemp.push(item.idItem)
    } else {
      listItemsTemp = listItemsTemp.filter(it => it !== item.idItem)
    }
    if(listItemsTemp.includes(5)){ // include "Xu" item
      setHasItemCoin(true);
    } else {
      setHasItemCoin(false);
    }

    setListItems(listItemsTemp);
  }

  const checkValidateData = (formProps) => {
    // check validate data
    if(eventName === "" || numOfVouchers === "" || startDate === null || endDate === null ){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Các thông tin của phần Sự kiện còn thiếu!");
      return false;
    }

    if(voucherCode === "" || voucherDescription === "" || voucherName === "" || voucherPrice === "" ){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Các thông tin của phần Voucher còn thiếu!");
      return false;
    }

    if(gameName === ""){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Tên game còn thiếu!");
      return false;
    }

    if(gameType === "Lắc xu"){
      if(listItems.length === 0){
        setIsError(true);
        setShowNoti(true);
        setNotiMsg("Vui lòng chọn các vật phẩm của sự kiện!");
        return false;
      } else if(listItems.includes("Xu") && formProps.aim_coin === ""){
        setIsError(true);
        setShowNoti(true);
        setNotiMsg("Vui lòng nhập số lượng Xu cần thiết để đổi voucher!");
        return false;
      }
    } else {
      if(startedAt === ""){
        setIsError(true);
        setShowNoti(true);
        setNotiMsg("Ngày bắt đầu livestream chơi game còn thiếu!");
        return false;
      }
    }

    return true
  }

  const [test, setTest] = useState("");

  const sendData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)

    const isValidData = checkValidateData(formProps);
    if(!isValidData){
      return;
    }
    
    // ...dataEvent,
    const data = {
      idEvent: parseInt(idEvent),
      eventName: eventName,
      numberOfVouchers: parseInt(numOfVouchers),
      startDate: convertInputToSave(startDate),
      endDate: convertInputToSave(endDate),
      brandId: dataEvent.brandId,
      brandLogo: dataEvent.brandLogo,
      createdBy: idBrand,
      imageUrl: dataEvent.imageUrl,
      'inventoryInfo':{
        voucher_code: voucherCode,
        voucher_description: voucherDescription,
        voucher_name: voucherName,
        voucher_price: parseInt(voucherPrice),
        expiration_date: convertInputToSave(expiredDay),
        aim_coin: formProps.aim_coin,
        items: listItems,
        event_id: parseInt(idEvent),
        imageUrl: dataEvent.inventoryInfo.imageUrl,
        items: dataEvent.inventoryInfo.items,
        qrCode: dataEvent.inventoryInfo.qrCode,

      },
      'gameInfoDTO': {
        gameId: dataEvent.gameInfoDTO.gameId,
        name: gameName,
        gameType: gameType === "Quizz" ? "quiz-game" : "shake-game",
        startedAt: convertInputToSave(startedAt),
        quiz: quizData, 
        eventId: parseInt(idEvent),
      },
    };

    
    console.log(data);
    // setTest(data)
    setDataEvent(data);

    updateEventMutation.mutate(data);
  }
  

  const preventSubmit = (e) => {
    e.preventDefault();
  }

  const closeNoti = () => {
    setShowNoti(false)
  }

  // routing to dashboard & home
  const {router} = useRouter();
  const toDashboard = () => {
    push('/brand/event/eventDashboard');
  }
  const goBackToHomepage = () => {
    push('/brand');
  }

  return(
    <div className='container w-full my-4'>
      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-primary p-2 cursor-pointer" onClick={goBackToHomepage}>
          <IoChevronBackCircle size={40} />
        </div>
        <TitlePage title={"Thông tin sự kiện"} />
        {/* <h5>{JSON.stringify(test)}</h5> */}

      </div>

      <div className='container flex flex-col bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
        <div className="flex justify-between items-center">
            <Tag status={status} />
            {status !== "pending" ? (
              <div className="primary_btn_small" onClick={toDashboard}>Xem báo cáo</div>
            ) : null }
        </div>
        <form className="container" ref={formDataEvent} onSubmit={(e) => preventSubmit(e)}>    
              {/* Sự kiện và vouchers */}
          {isEventForm ? (
            <div>
              <h2 className='text-heading3_semibold text-primary'>Sự kiện</h2>
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên sự kiện</h5>
                  <input disabled={status === 'done'} type="text" className={`${status === 'done' ? "input_text_disabled" : "input_text"}`} placeholder="Tên" 
                    name="eventName" value={eventName || ''} onChange={(e) => setEventName(e.target.value)}    required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Số lượng vouchers</h5>
                  <input disabled={status === 'done' || gameType === "Quizz"} type="number" 
                    className={`${(status === 'done' || gameType === "Quizz") ? "input_text_disabled" : "input_text"}`} placeholder="100"
                    name="numberOfVouchers" value={numOfVouchers || ''} onChange={(e) => setNumOfVouchers(e.target.value)}  required  />
                </div> 
  
              </div>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                  <DatePicker disabled={status === 'done'} placeholderText='dd/mm/yyy' className={`${status === 'done' ? "input_text_disabled w-full" : "input_text w-full"}`} dateFormat="dd/MM/yyyy"
                    locale={vi} selected={startDate} minDate={new Date()}  onChange={(date) => setStartDate(date)}   />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                  <DatePicker disabled={status === 'done'} placeholderText='dd/mm/yyy' className={`${status === 'done' ? "input_text_disabled w-full" : "input_text w-full"}`} dateFormat="dd/MM/yyyy" 
                    locale={vi} selected={endDate} minDate={new Date()} onChange={(date) => setEndDate(date)}  />
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
                    <CheckBox key={`${brand.idUser}-${listBrands.includes(brand.idUser)}`}
                      label={brand.fullName} image={brand.avatarUrl}
                      disable={true}
                      checked={listBrands.includes(brand.idUser)} 
                      onClick={() => addBrand(brand)}
                    />
                  ))}
                </div>
              </div>
  
  
              <h2 className='text-heading3_semibold text-primary mt-8'>Voucher</h2>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên voucher</h5>
                  <input disabled={status === 'done'} type="text" className={`${status === 'done' ? "input_text_disabled" : "input_text"}`} placeholder="Ten voucher" 
                    name="voucher_name" value={voucherName || ''} onChange={(e) => setVoucherName(e.target.value)}  required  />
                </div> 

                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Mã voucher</h5>
                  <input disabled={status === 'done'} type="text" className={`${status === 'done' ? "input_text_disabled" : "input_text"}`} placeholder="XXXXXX" 
                    name="voucher_code" value={voucherCode || ''} onChange={(e) => setVoucherCode(e.target.value)}  required  />
                </div>
  
              </div>

              <div className="flex gap-4">  
                <div className="flex flex-col px-2 py-1 grow">
                    <h5 className="text-base font-semibold">Loại voucher</h5>
                    <div className="input_dropdown" onClick={() => {if(status === 'done') {return;} changeCategoryVoucher(openCategoryVoucher)}}>
                    <span className='text-gray-900'>{voucherType}</span>
                    <MdOutlineArrowDropDown size={28}/>
                    </div>

                    {openCategoryVoucher ? 
                    (
                        <div 
                          className="absolute z-10 mt-[80px] w-[250px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                          role="menu" aria-orientation="vertical" aria-labelledby="menu-button"
                        >
                          <ul className="py-1 " role="none">
                              {listVoucherType.map((item) => (
                              <li key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
                                  role="menuitem" value={item} onClick={(e) => {setvoucherType(e.target.textContent); setOpenCategoryVoucher(false);}}
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
                  <h5 className="text-base font-semibold">Trị giá</h5>
                  <input disabled={status === 'done'} type="number" className={`${status === 'done' ? "input_text_disabled" : "input_text"}`} placeholder="100000VNĐ" 
                    name="voucher_price" value={voucherPrice || ''} onChange={(e) => setVoucherPrice(e.target.value)} required  />
                </div> 
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày hết hạn</h5>
                  <DatePicker disabled={status === 'done'} placeholderText='dd/mm/yyy' className={`${status === 'done' ? "input_text_disabled w-full" : "input_text w-full"}`} dateFormat="dd/MM/yyyy"
                    locale={vi} selected={expiredDay} minDate={new Date()}  onChange={(date) => setExpiredDay(date)}   />
                </div> 
              </div>
  
              <div className="flex flex-col px-2 py-2 h-[200px]">
                <h5 className="text-base font-semibold">Mô tả</h5>
                <textarea disabled={status === 'done'} type="text" className={`${status === 'done' ? "input_text_disabled h-full" : "input_text h-full"}`} placeholder="Mô tả ngắn gọn về cách sử dụng voucher"
                  name="voucher_description" value={voucherDescription || ''} onChange={(e) => setVoucherDescription(e.target.value)} required />
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
                  <h5 className="text-base font-semibold">Loại game</h5>
                  <input  disabled type="text" className="input_text_disabled"
                    name="game_type" value={gameType}   required  />
                </div>

                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên trò chơi</h5>
                  <input  disabled={status === 'done'} type="text" className={`${status === 'done' ? "input_text_disabled" : "input_text"}`} placeholder="Ten tro choi"
                    name="game_name" value={gameName || ''} onChange={(e) => setGameName(e.target.value)}    required  />
                </div>
              </div>
  
              {/* Nội dung trò chơi */}
              <h2 className='text-heading3_semibold text-primary mt-8'>Phần nội dung trò chơi</h2>
              {gameType === 'Quizz' ? (
                <>
                  <div className="flex flex-col px-2 py-2 max-w-[424px]">
                    <h5 className="text-base font-semibold">Thời gian bắt đầu chơi game</h5>
                    <DatePicker
                      placeholderText="dd/mm/yyyy"
                      disabled
                      className="input_text_disabled w-full"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      locale={vi}
                      selected={startedAt}
                      onChange={(date) => setGameStartAt(date)}
                      showTimeSelect
                      timeFormat="HH:mm:ss"
                      timeIntervals={15}
                    />
                  </div>
                  <FormGame quizData={quizData} setQuizData={setQuizData} />
                </>
              ) : (
                <div className="flex flex-col px-2 py-2 mb-2">
                  <div className="flex flex-col px-2 py-2">
                    <h5 className="text-base font-semibold">Chọn vật phẩm cho game</h5>
                    <span className="text-medium font-light italic tex-gray-700">Hệ thống sẽ cho phép tạo ra các vật phẩm sau</span>
                    <div className="flex gap-4 mt-2">
                      {listAvailableItems.map((item,index) => (
                        <CheckBox key={item.idItem} label={item.itemName} 
                          checked={listItems.includes(item.idItem)} 
                          image={item.imageUrl}
                          onClick={() => addItems(item)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col px-2 py-2 ">
                    <h5 className="text-base font-semibold ">Số lượng xu cần đạt để đổi voucher (Nếu có chọn item xu)</h5>
                    <input disabled={status === 'done' || (!hasItemCoin)} type="text" 
                    className={ (status === 'done' || (!hasItemCoin)) ? `input_text_disabled max-w-[404px]` : `input_text max-w-[404px]`} placeholder="" 
                      name="aim_coin" defaultValue={dataEvent.inventoryInfo?.aim_coin}  required  />
                  </div>
                  
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