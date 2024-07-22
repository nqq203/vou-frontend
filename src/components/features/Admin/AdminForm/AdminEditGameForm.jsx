import { IoMdClose } from "react-icons/io"
import { useState } from "react";

export default function AdminEditGameForm({gameInfo, handleClose}) {
  const [game, setGame] = useState(gameInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // Submit your form logic here
  };

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-4xl h-auto mx-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={handleClose}
        >
          <IoMdClose size={24} />
        </button>
        <form onSubmit={handleSubmit} className="ml-4 mr-4">
          <div className="mb-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <div
                  className="border-orange-500 text-orange-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                  onClick={() => setCurrentTab(0)}
                >
                  Edit Info
                </div>
                <div
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                  onClick={() => setCurrentTab(1)}
                >
                  Preferences
                </div>
                <div
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                  onClick={() => setCurrentTab(2)}
                >
                  Security
                </div>
              </nav>
            </div>
          </div>
          {currentTab === 0 && 
          <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="flex flex-col w-full mr-4">
              Tên game
              <input
                type="text"
                name="title"
                value={game.title}
                onChange={handleChange}
                className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none"
              />
            </label>
            <label className="flex flex-col w-full">
              Loại
              <select
                name="category"
                value={game.category}
                onChange={handleChange}
                className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none"
              >
                <option value="quiz">Quiz</option>
                <option value="shake">Lắc xì</option>
              </select>
            </label>
          </div>
          <label className="flex flex-col">
            Hướng dẫn chơi
            <textarea
              name="description"
              value={game.description}
              onChange={handleChange}
              className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none"
              rows="4"
            ></textarea>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex flex-col">
              Phần thưởng
              <div className="flex space-x-4 mt-2">
                <img src="/icons/cat.svg" alt="Cat" className="w-20 h-20" />
                <img src="/icons/chicken.svg" alt="Chicken" className="w-20 h-20" />
                <img src="/icons/dog.svg" alt="Dog" className="w-20 h-20" />
                <img src="/icons/pig.svg" alt="Pig" className="w-20 h-20" />
              </div>
            </label>
          </div>
          <label className="flex flex-col">
            Trạng thái
            <select
              name="status"
              value={game.status}
              onChange={handleChange}
              className="input input-bordered w-full border-2 rounded-[8px] pt-1 pb-1 pl-2 pr-2 font-normal text-grey-500 outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-4 bg-orange-500 rounded-md pt-2 pb-2 pr-3 pl-3 font-bold text-white w-full"
          >
            Chỉnh sửa
          </button>
        </div>}
        {currentTab === 1 && <div></div>}
        {currentTab === 2 && <div></div>}
        </form>
      </div>
    </div>
  )    
}