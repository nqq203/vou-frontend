import Image from "next/image";

const GameItem = ({ game, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-48">
        <Image src={game.imageUrl} alt={game.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-2 mb-4">
        <h3 className="text-lg font-semibold">{game.title}</h3>
        <div className="text-gray-700 mt-1 text-clip h-3 mb-4">{game.description}</div>
      </div>
    </div>
  );
};

export default GameItem;
