import Image from "next/image";

const GameItem = ({ game, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="relative w-full h-48">
        <Image src={game.imageUrl} alt={game.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{game.title}</h3>
        <p className="text-gray-600">{game.category}</p>
        <p className="text-gray-700 mt-2">{game.description}</p>
      </div>
    </div>
  );
};

export default GameItem;
