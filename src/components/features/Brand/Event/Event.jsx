'use client'
import { useState,useRef } from "react"
import ImageUploader from "@components/common/ImageUploader";
import CheckBox from "@components/common/CheckBox";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Event = () => {
  //Other Brands
  const listAvailableBrands = ['Grab','Katinat','BE','Vinfast'];
  const [listBrands, setListBrands] = useState([])

  // Event
  const [banner, setBanner] = useState(null)
  const [qrImg, setQrImg] = useState(null)
  const [voucherImg, setvoucherImg] = useState(null)
  
  // Game 
  const listGames = ['Quizz','Lắc xu']
  const [openCategory, setOpenCategory] = useState(false)
  const [gameType, setgameType] = useState(listGames[0])
  
  const changeCategory = (state) => {
    setOpenCategory(!state);
  }
  
  // Change Event to Game
  const [isEventForm, setIsEventForm] = useState(true);
  const changeForm = (state) => {
    handleFormData();
    console.log(dataEvent)
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

  const sendData = () => {
    const formData = new FormData(formDataEvent.current);
    const formProps = Object.fromEntries(formData);
    const data = {
      ...dataEvent,
      [isEventForm ? 'eventInfo' : 'gameInfo']: {
        ...formProps,
        ...(isEventForm ? {} : { gameType }),
      },
      bannerFile: banner,
      QRImage: qrImg,
      voucherImg: voucherImg,
      listBrands: listBrands,
    };

    setDataEvent(data);
    console.log(data);

    // delete form data
  }

  return(
    <div className='container w-full my-4'>
      <h1 className='text-heading1 font-bold text-primary'>Đăng ký sự kiện</h1>

      <div className='container flex bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
        <form className="container" ref={formDataEvent}>    
              {/* Sự kiện và vouchers */}
          {isEventForm ? (
            <div>
              <h2 className='text-heading3_semibold text-primary'>Sự kiện</h2>
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên sự kiện</h5>
                  <input type="text" className="input_text" placeholder="Tên" 
                    name="event_name" defaultValue={dataEvent.eventInfo.event_name }    required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Số lượng vouchers</h5>
                  <input type="number" className="input_text" placeholder="100"
                    name="numOfVouchers" defaultValue={dataEvent.eventInfo.numOfVouchers}  required  />
                </div> 
  
              </div>
  
              <div className="flex gap-4">
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày bắt đầu</h5>
                  <input type="text" className="input_text" placeholder="dd/mm/yyyy" 
                    name="startDay" defaultValue={dataEvent.eventInfo.startDay }    required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày kết thúc</h5>
                  <input type="text" className="input_text" placeholder="dd/mm/yyyy" 
                    name="endDay" defaultValue={dataEvent.eventInfo.startDay }    required />
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
                  <h5 className="text-base font-semibold">Mã voucher</h5>
                  <input type="text" className="input_text" placeholder="XXXXXX" 
                    name="voucher_code" defaultValue={dataEvent.eventInfo.voucher_code }    required  />
                </div>
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Trị giá</h5>
                  <input type="number" className="input_text" placeholder="100000VNĐ" 
                    name="voucher_price" defaultValue={dataEvent.eventInfo.voucher_price }    required  />
                </div> 
  
                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Ngày hết hạn</h5>
                  <input type="text" className="input_text" placeholder="dd/mm/yyyy" 
                    name="voucher_expired" defaultValue={dataEvent.eventInfo.voucher_expired }    required  />
                </div> 
              </div>
  
              <div className="flex flex-col px-2 py-2 h-[200px]">
                <h5 className="text-base font-semibold">Mô tả</h5>
                <textarea type="text" className="input_text h-full" placeholder="Mô tả ngắn gọn về cách sử dụng voucher"
                  name="voucher_description" defaultValue={dataEvent.eventInfo.voucher_description }   required />
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
                    <h5 className="text-base font-semibold">Lĩnh vực</h5>
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
                        <div className="py-1 " role="none">
                            {listGames.map((item) => (
                            <a href="#" key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
                                role="menuitem" value={item} onClick={(e) => {setgameType(e.target.textContent); setOpenCategory(false);}}
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

                <div className="flex flex-col px-2 py-2 grow">
                  <h5 className="text-base font-semibold">Tên trò chơi</h5>
                  <input type="text" className="input_text" placeholder="Ten tro choi"
                    name="game_name" defaultValue={dataEvent.gameInfo.game_name }    required  />
                </div> 
                
                 
              </div>
  
              {/* Nội dung trò chơi */}
              <h2 className='text-heading3_semibold text-primary mt-8'>Phần nội dung trò chơi</h2>
              {gameType === 'Quizz' ? (
                Array.from({ length: 10 }).map((_, i) => (
                    <div className="flex flex-col px-2 py-2 mb-2" key={i}>
                        <h5 className="text-base font-semibold ">Câu hỏi {i + 1}</h5>
                        <input
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
                            <input type="text" className="input_text" placeholder="Câu trả lời" 
                              name={`${i + 1}_answer_1`} defaultValue={dataEvent.gameInfo[`${i + 1}_answer_1`] }    required  />
                            </div>
            
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Trả lời 1</h5>
                            <input type="text" className="input_text" placeholder="Câu trả lời" 
                              name={`${i + 1}_answer_2`} defaultValue={dataEvent.gameInfo[`${i + 1}_answer_2`] }    required  />
                            </div> 
            
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Trả lời 2</h5>
                            <input type="text" className="input_text" placeholder="Câu trả lời" 
                              name={`${i + 1}_answer_3`} defaultValue={dataEvent.gameInfo[`${i + 1}_answer_3`] }    required  />
                            </div> 
                        </div>
                    </div>
                ))
              ) : (
                <div className="flex flex-col px-2 py-2 ">
                  <h5 className="text-base font-semibold">Chọn số lượng vật phẩm</h5>
                  <span className="text-medium font-light italic tex-gray-700">Hệ thống sẽ random các vật phẩm theo số lượng yêu cầu</span>
                  <input type="number" className="input_text" placeholder="3" 
                    name="numOfItems" defaultValue={dataEvent.gameInfo.numOfItems }    required  />
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