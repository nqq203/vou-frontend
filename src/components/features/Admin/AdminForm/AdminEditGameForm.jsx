import { IoMdClose } from "react-icons/io"
import { useState,useRef } from "react";

export default function AdminEditGameForm({gameInfo, handleClose}) {
  const [game, setGame] = useState(gameInfo);
  const formGame = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Submit your form logic here
  };

  console.log(game.exchangeItems)


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}>
          <IoMdClose size={24} />
        </button>
        <form className="mx-4" ref={formGame}>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[24px]">Thông tin game</h3>

            <div className="mr-5 flex justify-center items-center">
              <img src={game.imageUrl} alt="avt" className="h-[200px]" />
            </div>
            
            <div className="flex gap-3">
              <div className="flex flex-col py-2 w-[50%]">
                  <h5 className="text-base font-semibold">Tên game</h5>
                  <input type="text" name="title" value={game.title} onChange={handleChange} className="input_text" />
              </div>

              <div className="flex flex-col py-2 grow">
                  <h5 className="text-base font-semibold">Loại game</h5>
                  <select
                    name="gameType"
                    value={game.type}
                    onChange={handleChange} 
                    className="input_dropdown h-full"
                  >
                    <option value="Trí tuệ">Trí tuệ</option>
                    <option value="Giải trí">Giải trí</option>
                  </select>
              </div>
            </div>
          
            <div className="flex flex-col w-full">
              <h5 className="text-base font-semibold">Hướng dẫn chơi</h5>
              <textarea type="text" className="input_text h-[100px] w-full" placeholder="Mô tả ngắn gọn về cách sử dụng voucher"
                name="description" defaultValue={game.description } />
            </div>

            <div className="flex flex-col w-full">
              <h5 className="text-base font-semibold">Cho phép trao đổi vật phẩm</h5>
              <div className="flex gap-6 mt-2">
                {game.exchangeItems.length === 0 ? (
                  <div className="text-base font-regular">Không cho phép</div>
                ) : (
                  game.exchangeItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1 justify-center items-center">
                      <img
                        className="h-10 w-10"
                        src={item.imageUrl || "https://placehold.co/40x40"}
                        alt={`${item.itemName} image`}
                      />
                      <span>{item.itemName}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn bg-primary rounded-[12px] pt-2 pb-2 pr-3 pl-3 font-bold text-white w-[200px] mt-6" onClick={handleChange}>Chỉnh sửa</button>
        </form>
      </div>
    </div>
  )    
}