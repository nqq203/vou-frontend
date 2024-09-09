import { FaSearch } from "react-icons/fa";
import GameItem from "@components/common/GameItem";
import AdminEditGameForm from "../AdminForm/AdminEditGameForm";
import { useEffect, useState } from "react";
import TitlePage from "@components/common/TitlePage";
import { useSelector } from "react-redux";

export default function AdminGameManagement() {
  const [gameInfo, setGameInfo] = useState(null);
  const [isOpenEditGame, setIsOpenEditGame] = useState(false);
  const listItems = useSelector(state=> state.event.listAvailableItems);
  
  const gameList = [
    {
      title: "Quiz Game",
      imageUrl: "/images/quizGame.jpg",
      type: "Trí tuệ",
      description: "Quiz là game tương tác, nơi người dùng cùng xem livestream và trả lời các câu hỏi trong thời gian thực. Người chơi tham gia qua thiết bị cá nhân, cạnh tranh với nhau bằng cách chọn câu trả lời đúng nhanh nhất, tạo nên trải nghiệm học hỏi và giải trí trực tiếp",
      exchangeItems: [],
    },
    {
      title: "Lắc Xu",
      imageUrl: "/images/shakeGame.png",
      type: "Giải trí",
      description: "Lắc Xu là game tương tác, trong đó người dùng lắc điện thoại để nhận các vật phẩm ngẫu nhiên như xu, quà, hoặc điểm thưởng. Các vật phẩm thu thập được có thể dùng để đổi lấy phần thưởng hấp dẫn, tạo cảm giác hứng thú và hồi hộp khi chơi",
      exchangeItems: listItems,
    }
  ]

  function handleOpenEditGame(gameInfo) {
    setIsOpenEditGame(true);
    setGameInfo(gameInfo);
  }

  function handleCloseEditGame() {
    setIsOpenEditGame(false);
    setGameInfo(null);
  }

  useEffect(() => {
    console.log(gameInfo);
  }, [gameInfo])
  console.log(listItems)

  

  return (
    <div className="container w-full my-4">
      {isOpenEditGame && <AdminEditGameForm gameInfo={gameInfo} handleClose={handleCloseEditGame}/>}
      <TitlePage title={"Quản lí trò chơi"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {gameList.map((game, index) => (
          <GameItem key={index} game={game} onClick={() => handleOpenEditGame(game)}/>
        ))}
      </div>
    </div>
  )
}