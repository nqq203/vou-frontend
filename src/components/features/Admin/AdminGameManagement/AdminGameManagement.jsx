import { FaSearch } from "react-icons/fa";
import GameItem from "@components/common/GameItem";
import AdminEditGameForm from "../AdminForm/AdminEditGameForm";
import { useEffect, useState } from "react";
import TitlePage from "@components/common/TitlePage";

export default function AdminGameManagement() {
  const gameList = [
    {
      imageUrl: "/images/avt.png",
      title: "Game 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Quiz", 
    },
    {
      imageUrl: "/images/avt.png",
      title: "Game 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Lắc xì", 
    }
  ]

  const [gameInfo, setGameInfo] = useState(null);
  const [isOpenEditGame, setIsOpenEditGame] = useState(false);

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

  return (
    <div className="container p-6 mx-auto">
      {isOpenEditGame && <AdminEditGameForm gameInfo={gameInfo} handleClose={handleCloseEditGame}/>}
      <TitlePage title={"Quản lí trò chơi"} />

      <div className="flex items-center bg-white rounded-[10px] shadow-md p5">
        <FaSearch className="text-center mr-3 ml-3 text-primary cursor-pointer"/>
        <input type="text" placeholder="Tên game..." className="flex-grow border-b-2 bg-transparent mt-3 mb-3 mr-3 outline-none placeholder:font-bold"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {gameList.map((game, index) => (
          <GameItem key={index} game={game} onClick={() => handleOpenEditGame(game)}/>
        ))}
      </div>
    </div>
  )
}