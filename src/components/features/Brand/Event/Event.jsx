'use client'
import { useState,useRef } from "react"
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";    
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useMutation } from "react-query";

import ImageUploader from "@components/common/ImageUploader";
import CheckBox from "@components/common/CheckBox";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Notification from "@components/common/Notification";
import TitlePage from "@components/common/TitlePage";
import FormGame from "./FormGame";
import { callApiCreateEvent } from "@pages/api/event";


const Event = () => {
  const {push} = useRouter();

  //Other Brands
  const listAvailableBrands = ['Grab','Katinat','BE','Vinfast'];
  const [listBrands, setListBrands] = useState([])
  // List items game LAC XU
  const listAvailableItems = ['Chó','Gà','Vịt','Mèo','Xu'];
  const [listItems, setListItems] = useState([]);

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

  
  const changeCategory = (state) => {
    setOpenCategory(!state);
  }

  // Voucher Type
  const listVoucherType = ['Online','Offline']
  const [openCategoryVoucher, setOpenCategoryVoucher] = useState(false)
  const [voucherType, setvoucherType] = useState(listVoucherType[0])
  
  const changeCategoryVoucher = (state) => {
    setOpenCategoryVoucher(!state);
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
    // setListBrands(listBrandsTemp);
    setListBrands([1]);
  }

  // Add items game
  const addItems = (item) => {
    let listItemsTemp = listItems;
    if(!listItemsTemp.includes(item)){
      listItemsTemp.push(item)
    } else {
      listItemsTemp = listItemsTemp.filter(it => it !== item)
    }
    // setListItems(listItemsTemp);
    setListItems([1,2]);

  }
  
  const formDataEvent = useRef(null);
  const [dataEvent, setDataEvent] = useState({ gameInfoDTO: {},});

   // Notification
   const [showNoti, setShowNoti] = useState(false)
   const [isError, setIsError] = useState(false);
   const [notiMsg, setNotiMsg] = useState('');


  const handleFormData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)

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

  const formatDate = (date) => {
    if (!date) return '';
    const pad = (num) => String(num).padStart(2, '0');
    const padMilliseconds = (num) => String(num).padStart(3, '0');
    
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());
    const milliseconds = padMilliseconds(date.getUTCMilliseconds());
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
  };

  

  const [gameStartAt, setGameStartAt] = useState(null);
  const [quizData, setQuizData] = useState(Array.from({ length: 10 }).map((_, i) => ({
    question: dataEvent.gameInfoDTO[`question${i + 1}`] || '',
    ans1: dataEvent.gameInfoDTO[`${i + 1}_answer_1`] || '',
    ans2: dataEvent.gameInfoDTO[`${i + 1}_answer_2`] || '',
    ans3: dataEvent.gameInfoDTO[`${i + 1}_answer_3`] || '',
    correctAnswerIndex: 0,
  })));

  const createEventMutation = useMutation(
    (data) => callApiCreateEvent(data),
    {
      onSuccess: (data) => {
        console.log(data)
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

  const [test, setTest] = useState("");


  const sendData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    console.log(formProps)

    // check validate data
    if(dataEvent.eventName === "" ){
      setIsError(true);
      setShowNoti(true);
      setNotiMsg("Yêu cầu điền đầy đủ các trường thông tin");
    }


    const data = {
      eventName: dataEvent.eventName,
      numberOfVouchers: numOfVouchers,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      brandId: listBrands,
      'inventoryInfo':{
        gameType: gameType === "Quizz" ? "quiz-game" : "shake-game",
        voucher_type: voucherType,
        voucher_code: dataEvent.voucher_code,
        voucher_description: dataEvent.voucher_description,
        voucher_name: dataEvent.voucher_name,
        voucher_price: dataEvent.voucher_price,
        expiration_date: formatDate(expiredDay),
        aim_coin: formProps.aim_coin,
        items: listItems,
      },
      'gameInfoDTO': {
        name: formProps.game_name,
        gameType: gameType === "Quizz" ? "quiz-game" : "shake-game",
        gameStartAt: formatDate(gameStartAt),
        quiz: quizData,        
      },
    };
    
    const dataImage = {
      bannerFile: banner,
      QRImage: qrImg,
      voucherImg: voucherImg,
    }

    // setDataEvent(data);
    console.log(data);

    // delete form data

    // setIsEventForm(true);
    // formDataEvent.current.reset();
    // window.scrollTo(0, 0);
    // setShowNoti(true);
    setTest(data);
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
      <div className={`${showNoti ? '' : 'hidden'} flex flex-row justify-end` }>
        <Notification type={`${isError ? 'error' : 'success'}` } 
            title={`${isError ? 'Có lỗi xảy ra' : 'Thành công'}` }  content={notiMsg} close={closeNoti}/>
      </div>
      <TitlePage title={"Đăng ký sự kiện"} />
      <h5>{JSON.stringify(test)}</h5>

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
                    name="eventName" defaultValue={dataEvent.eventName || "" }    required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Số lượng vouchers</h5>
                  <input type="number" className="input_text" placeholder="100" min={0}
                    name="numberOfVouchers" value={numOfVouchers || ''} onChange={(e) => setNumOfVouchers(e.target.value)}  required  />
                </div> 
  
              </div>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                  <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy"
                    selected={startDate} minDate={new Date()}  onChange={(date) => setStartDate(date)}   />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                  <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy" 
                    selected={endDate} minDate={new Date()} onChange={(date) => setEndDate(date)}  />
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
                  {listAvailableBrands.map((brand,index) => (
                    <CheckBox key={index} label={brand} 
                      checked={listBrands.includes(brand)} onClick={() => addBrand(brand)}
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
                  <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy"
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
                    <DatePicker placeholderText='dd/mm/yyy' className="input_text w-full" dateFormat="dd/MM/yyyy"
                      selected={gameStartAt} minDate={new Date()}  onChange={(date) => setGameStartAt(date)}   />
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
                        <CheckBox key={index} label={item} 
                          checked={listItems.includes(item)} 
                          onClick={() => addItems(item)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col px-2 py-2 ">
                    <h5 className="text-base font-semibold ">Số lượng xu cần đạt để đổi voucher (Nếu có chọn item xu)</h5>
                    <input type="text" className="input_text max-w-[404px]" placeholder="" 
                      name="aim_coin" defaultValue={dataEvent.gameInfoDTO?.aim_coin}  required  />
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
    </div>
  )
}

export default Event