'use client'
import { useRouter } from "next/navigation"
import Tag from "./Tag";

const Card = ({id,name, date, vouchers,status, bannerImg}) => {
  const {push} = useRouter();

  const viewDetailEvent = () => {
    // redirect: fix id
    push(`/brand/event/eventDetail?id=${id}&s=${status}`);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[328px] cursor-pointer hover:shadow-lg" onClick={viewDetailEvent}>
    <div className="absolute">
      <Tag status={status} />
    </div>
        <img
            className="h-[200px] w-full"
            src={bannerImg || "https://placehold.co/328x200"}
            alt="event image"
        />

        <div className="flex w-full gap-2 px-4 py-2">
            <div className="w-[200px] gap-2 flex grow flex-col">
                <h5 className="text-lg font-bold max-h-[60px] overflow-clip">{name}</h5>
                <span className="text-md text-gray-500">{date}</span>
            </div>

            <div className="w-[0.5px] h-[73px] bg-gray-500 "></div>

            <div className="flex flex-1 grow flex-col items-center ">
                <h2 className="text-primary text-heading1">{vouchers}</h2>
                <span className="text-md text-gray-500">vouchers</span>
            </div>
        </div>
    </div>
  )
}

export default Card