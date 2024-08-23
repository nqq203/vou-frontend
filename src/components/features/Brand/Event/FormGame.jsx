'use client'
import { useState,useRef } from "react"
import { MdOutlineArrowDropDown } from "react-icons/md";

const FormGame = () => {
    const listGames = ['Quizz','Lắc xu']
    const [openCategory, setOpenCategory] = useState(false)
    const [gameType, setgameType] = useState(listGames[0])
    const formGameInfo = useRef(null);

    const changeCategory = (state) => {
        setOpenCategory(!state);
    }


    const handleFormData = () => {
      const formData = new FormData(formGameInfo.current);
      const formProps = Object.fromEntries(formData);
      console.log(formProps)
    }
  
    return (  
        <div className='container flex bg-white shadow-md rounded-3xl py-5 px-5 my-4 gap-5 border border-gray-200'>
          <form className="container" ref={formGameInfo}>
            {/* Tro choi */}
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
                        <div className="py-1 " role="none">
                            {listGames.map((item) => (
                            <a key={item} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-200" 
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
                  <input type="text" className="input_text" placeholder="Tên" name="game_name" required  />
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
                            required
                        />

                        <div className="flex gap-4">
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Đáp án</h5>
                            <input type="text" className="input_text" placeholder="Câu trả lời" name={`${i + 1}_answer_1`} required  />
                            </div>
            
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Trả lời 1</h5>
                            <input type="text" className="input_text" placeholder="Câu trả lời" name={`${i + 1}_answer_2`} required  />
                            </div> 
            
                            <div className="flex flex-col px-2 py-2 grow">
                            <h5 className="text-base font-medium">Trả lời 2</h5>
                            <input type="text" className="input_text" placeholder="Câu trả lời" name={`${i + 1}_answer_3`} required  />
                            </div> 
                        </div>
                    </div>
                ))
              ) : (
                <div className="flex flex-col px-2 py-2 ">
                  <h5 className="text-base font-semibold">Chọn số lượng vật phẩm</h5>
                  <span className="text-medium font-light italic tex-gray-700">Hệ thống sẽ random các vật phẩm theo số lượng yêu cầu</span>
                  <input type="number" className="input_text" placeholder="3" name="numOfItems" required  />
                  <h5 className="text-base font-semibold">Chọn số lượng xu đổi thưởng</h5>
                  <span className="text-medium font-light italic tex-gray-700">Nếu chọn đổi xu lấy voucher thì cần biết số lượng xu để đổi</span>
                  <input type="number" className="input_text" placeholder="3" name="aimCoins" required  />
                </div> 
              )}

              <div className="flex gap-4 w-[422px]">
                <div className="outline_btn w-[200px] mt-8" onClick={handleFormData}>Trở lại</div>
                <div className="primary_btn w-[200px] mt-8" onClick={handleFormData}>Tạo sự kiện</div>
              </div>
          </form>
        </div>
    )
}

export default FormGame