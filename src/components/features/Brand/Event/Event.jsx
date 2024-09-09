'use client'
import { useState,useRef } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "react-query";

import ImageUploader from "@components/common/ImageUploader";
import CheckBox from "@components/common/CheckBox";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Notification from "@components/common/Notification";
import TitlePage from "@components/common/TitlePage";
import FormGame from "./FormGame";
import { callApiCreateEvent, callApiUploadEventImgs } from "@pages/api/event";
import { convertInputToSave } from "@utils/date";
import { useSelector } from "react-redux";
import {vi} from 'date-fns/locale'
import { PropagateLoader } from 'react-spinners';

const Event = () => {
  const formDataEvent = useRef(null);
  const [isLoading, setIsLoading] = useState(false)
  const [dataEvent, setDataEvent] = useState({ gameInfoDTO: {},});
  const idBrand = useSelector(state => state.auth.idUser);
  const eventStore = useSelector(state=> state.event);


  // Notification
  const [showNoti, setShowNoti] = useState(false)
  const [isError, setIsError] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');

  //Other Brands
  const listAvailableBrands = eventStore.listAvailableBrands;
  const [listBrands, setListBrands] = useState([idBrand])

  // Event
  const [banner, setBanner] = useState(undefined)
  const [qrImg, setQrImg] = useState(undefined)
  const [voucherImg, setvoucherImg] = useState(undefined)
  const [numOfVouchers, setNumOfVouchers] = useState(undefined);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expiredDay, setExpiredDay] = useState(null);
  
  // Game 
  const listGames = ['Quizz','Lắc xu']
  const [openCategory, setOpenCategory] = useState(false)
  const [gameType, setgameType] = useState(listGames[1])
  const [gameName, setGameName] = useState("");

  // List items game LAC XU
  const listAvailableItems = eventStore.listAvailableItems;
  const [listItems, setListItems] = useState([]);

  
  const changeCategory = (state) => {
    setOpenCategory(!state);
  }

  // Game quiz
  const [startedAt, setGameStartAt] = useState("");
  const [quizData, setQuizData] = useState(Array.from({ length: 10 }).map((_, i) => ({
    question: dataEvent.gameInfoDTO[`question${i + 1}`] || '',
    ans1: dataEvent.gameInfoDTO[`${i + 1}_answer_1`] || '',
    ans2: dataEvent.gameInfoDTO[`${i + 1}_answer_2`] || '',
    ans3: dataEvent.gameInfoDTO[`${i + 1}_answer_3`] || '',
    correctAnswerIndex: 0,
  })));

  // Voucher Type
  const listVoucherType = ['online','offline']
  const [openCategoryVoucher, setOpenCategoryVoucher] = useState(false)
  const [voucherType, setvoucherType] = useState(listVoucherType[0])
  
  const changeCategoryVoucher = (state) => {
    setOpenCategoryVoucher(!state);
  }
  
  // Change Event to Game
  const [isEventForm, setIsEventForm] = useState(true);
  const changeForm = (state) => {
    console.log(startedAt);
    handleFormData();
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
  const [hasItemCoin, setHasItemCoin] = useState(false);
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
  
  
  const handleFormData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)
    console.log("Brands: ", listBrands);
    console.log("Brands: ", listItems);

    setDataEvent((prevDataEvent) => {
      if(isEventForm){
        return {
          ...prevDataEvent,
          ...formProps,
        }
      } else {
        return{
          ...prevDataEvent,
          'gameInfoDTO': {...formProps},
        }
      }
    });
  }

  const resetForm = () => {
    setIsEventForm(true);
    setDataEvent({ gameInfoDTO: {},});
    
    setListItems([]);
    setListBrands([]);
    setBanner(undefined);
    setQrImg(undefined);
    setvoucherImg(undefined);
    setNumOfVouchers(0);
    setStartDate(null);
    setEndDate(null);
    setExpiredDay(null);
    setGameName("");
    setvoucherType(listVoucherType[0]);
    setgameType(listGames[1]);
    setQuizData(Array.from({ length: 10 }).map((_, i) => ({
      question: dataEvent.gameInfoDTO[`question${i + 1}`] || '',
      ans1: dataEvent.gameInfoDTO[`${i + 1}_answer_1`] || '',
      ans2: dataEvent.gameInfoDTO[`${i + 1}_answer_2`] || '',
      ans3: dataEvent.gameInfoDTO[`${i + 1}_answer_3`] || '',
      correctAnswerIndex: 0,
    })));
    setGameStartAt("");
    setHasItemCoin(false);
    window.scrollTo(0, 0);
}
  
  const createEventMutation = useMutation(
    async (data) => {
      const newEvent = await callApiCreateEvent(data);
      // console.log("EVENT: ",newEvent)

      const idEvent = newEvent.metadata?.idEvent;
      const images = (banner == undefined && qrImg == undefined && voucherImg == undefined) ? null : {
        bannerFile: banner,
        QRImage: qrImg,
        voucherImg: voucherImg,
      }
      console.log(images);
      if(images != undefined){
        const eventImg = await callApiUploadEventImgs(idEvent,images)
        return {newEvent,eventImg}
      }
      return {newEvent}
    },
    {
      onSuccess: (data) => {
        console.log(data)
        setIsLoading(false);
        
        resetForm();

        setIsError(false);
        setShowNoti(true);
        setNotiMsg("Tạo sự kiện mới thành công");
      },
      onError: (error) => {
        setIsLoading(false);
        const msgErr = error.response.data.message;
        setIsError(true);
        setShowNoti(true);
        setNotiMsg(msgErr);
      },
    }
  )

  const [test, setTest] = useState("");

  const checkValidateData = (formProps) => {
    // check validate data
    if(dataEvent.eventName === "" || dataEvent.numberOfVouchers === "" || startDate === null || endDate === null ){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Các thông tin của phần Sự kiện còn thiếu!");
      return false;
    }

    if(dataEvent.voucher_code === "" || dataEvent.voucher_description === "" || dataEvent.voucher_name === "" || dataEvent.voucher_price === "" ){
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


  const sendData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);

    const isValidData = checkValidateData(formProps);
    if(!isValidData){
      return;
    }
    setIsLoading(true)

    const filterQuizData = quizData.filter(quiz => quiz.question != "")

    const data = {
      eventName: dataEvent.eventName,
      numberOfVouchers: parseInt(numOfVouchers),
      startDate: convertInputToSave(startDate),
      endDate: convertInputToSave(endDate),
      brandId: listBrands,
      createdBy: idBrand,
      'inventoryInfo':{
        gameType: gameType === "Quizz" ? "quiz-game" : "shake-game",
        voucher_type: voucherType,
        voucher_code: dataEvent.voucher_code,
        voucher_description: dataEvent.voucher_description,
        voucher_name: dataEvent.voucher_name,
        voucher_price: parseInt(dataEvent.voucher_price),
        expiration_date: convertInputToSave(expiredDay),
        aim_coin: formProps.aim_coin,
        items: listItems,
      },
      'gameInfoDTO': {
        name: gameName,
        gameType: gameType === "Quizz" ? "quiz-game" : "shake-game",
        startedAt: convertInputToSave(startedAt),
        quiz: filterQuizData,        
      },
    };
    
    console.log(data);
    
    // setTest(data);
    window.scrollTo(0, 0);
    createEventMutation.mutate(data);
  }

  const preventSubmit = (e) => {
    e.preventDefault();
  }

  const closeNoti = () => {
    setShowNoti(false)
  }


  return(
    <div className='container w-full my-4'>
    {isLoading ? (
        <div className="flex w-[90%] h-screen items-center justify-center absolute z-50">
          <PropagateLoader color="#EA661C" />
        </div>
      ) : (
        <>

      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end`}>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>
      <TitlePage title={"Đăng ký sự kiện"} />
      {/* <h5>{JSON.stringify(test)}</h5> */}

      <div className='container flex bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
        <form className="container" ref={formDataEvent} onSubmit={(e) => preventSubmit(e)}>    
          {/* Sự kiện và vouchers */}
          {isEventForm ? (
            <div>
              <h2 className='text-heading3_semibold text-primary'>Sự kiện</h2>
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên sự kiện</h5>
                  <input type="text" className="input_text" placeholder="Tên" 
                    name="eventName" defaultValue={dataEvent.eventName || "" } required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Số lượng vouchers</h5>
                  <input type="number" className="input_text" placeholder="100" min={0}
                    name="numberOfVouchers" value={numOfVouchers || ''} onChange={(e) => setNumOfVouchers(e.target.value)}  required  />
                </div> 
  
              </div>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow ">
                  <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                  
                  <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" 
                    dateFormat="dd/MM/yyyy h:mm aa" 
                    showTimeSelect
                    timeFormat="HH:mm:ss" timeIntervals={15}
                    locale={vi}
                    selected={startDate} minDate={new Date()}  onChange={(date) => setStartDate(date)}  
                  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow ">
                  <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                  <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" 
                    dateFormat="dd/MM/yyyy h:mm aa" 
                    showTimeSelect
                    timeFormat="HH:mm:ss" timeIntervals={15}
                    locale={vi}
                    selected={endDate} minDate={new Date()} onChange={(date) => setEndDate(date)} 
                  />
                </div>
              </div>
  
              {/* Event image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hình ảnh</h5>
                <ImageUploader image={banner} setResource={setBanner} />
              </div>
  
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hợp tác với brand khác (Nếu có)</h5>
                <div className="flex gap-4 mt-2">
                  {listAvailableBrands?.map((brand,index) => (
                    <CheckBox key={index} label={brand.fullName} image={brand.avatarUrl}
                      checked={listBrands.includes(brand.idUser)} onClick={() => addBrand(brand)}
                    />
                  ))}
                </div>
              </div>
  
  
              <h2 className='text-heading3_semibold text-primary mt-8'>Vouchers</h2>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên voucher</h5>
                  <input type="text" className="input_text" placeholder="Ten voucher" 
                    name="voucher_name" defaultValue={dataEvent.voucher_name }   required  />
                </div> 

                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Mã voucher</h5>
                  <input type="text" className="input_text" placeholder="XXXXXX" 
                    name="voucher_code" defaultValue={dataEvent.voucher_code }   required  />
                </div>
  
              </div>

              <div className="flex gap-4">  
                <div className="flex flex-col px-2 py-1 grow">
                    <h5 className="text-base font-semibold">Loại voucher</h5>
                    <div className="input_dropdown" onClick={() => changeCategoryVoucher(openCategoryVoucher)}>
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
                  <input type="number" className="input_text" placeholder="VNĐ" 
                    name="voucher_price" defaultValue={dataEvent.voucher_price }  min={10000} required  />
                </div> 
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày hết hạn</h5>
                  <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy" locale={vi}
                    selected={expiredDay} minDate={new Date()}  onChange={(date) => setExpiredDay(date)}   />
                </div> 
              </div>
  
              <div className="flex flex-col px-2 py-2 h-[200px]">
                <h5 className="text-base font-semibold">Mô tả</h5>
                <textarea type="text" className="input_text h-full" placeholder="Mô tả ngắn gọn về cách sử dụng voucher"
                  name="voucher_description" defaultValue={dataEvent.voucher_description }   required />
              </div>
  
              {/* QR Code image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">QR Code</h5>
                <ImageUploader image={qrImg} setResource={setQrImg}/>
                
              </div>
              
              {/* Voucher image */}
              <div className="flex flex-col px-2 py-2">
                <h5 className="text-base font-semibold">Hình ảnh voucher</h5>
                <ImageUploader image={voucherImg} setResource={setvoucherImg}/>
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
                    <div className="input_dropdown" onClick={() => changeCategory(openCategory)}>
                    <span className='text-gray-900'>{gameType}</span>
                    <MdOutlineArrowDropDown size={28}/>
                    </div>

                    {openCategory ? 
                    (
                        <div 
                          className="absolute z-10 mt-[88px] w-[400px] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                          role="menu" aria-orientation="vertical" aria-labelledby="menu-button"
                        >
                          <ul className="py-1 " role="none">
                              {listGames.map((item) => (
                              <li key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" role="menuitem" value={item} 
                                  onClick={(e) => {
                                    setgameType(e.target.textContent); setOpenCategory(false); window.scrollTo(0,0);
                                    if(e.target.textContent === "Quizz"){
                                      setNumOfVouchers("3");
                                    }
                                  }}
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
                  <input type="text" className="input_text" placeholder="Ten tro choi"
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
                      className="input_text w-full"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      selected={startedAt}
                      locale={vi}
                      minDate={new Date()}
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
                    <div className="flex gap-6 mt-2">
                      {listAvailableItems.map((item,index) => (
                        <CheckBox key={index} label={item.itemName} 
                          checked={listItems.includes(item.idItem)} 
                          image={item.imageUrl}
                          onClick={() => addItems(item)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col px-2 py-2 ">
                    <h5 className="text-base font-semibold ">Số lượng xu cần đạt để đổi voucher (Nếu có chọn item xu)</h5>
                    <input type="number" className={`${hasItemCoin ? "input_text" : "input_text_disabled"}  max-w-[404px]`} placeholder="" disabled={!hasItemCoin}
                      name="aim_coin" min={0} defaultValue={dataEvent.gameInfoDTO?.aim_coin}  required  />
                  </div>
                  
                </div>
              )}

              <div className="flex gap-4 w-[422px]">
                <div className="outline_btn w-[200px] mt-8" onClick={() => changeForm(isEventForm)}>Trở lại</div>
                <div className="primary_btn w-[200px] mt-8" onClick={() => sendData()}>Tạo sự kiện</div>
              </div>
            </div>
          )}
        </form>
      </div>
      </>
      )}
    </div>
  )
}

export default Event