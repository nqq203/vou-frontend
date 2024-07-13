import Box from "@components/common/Box"

export default function AdminOverview({ overview }) {
  return (
    <div className='flex-1'>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Box 
          icon={overview[0]?.icon} 
          textColor={"text-blue-200"} 
          bgColor={"bg-yellow-50"} 
          iconColor={"text-yellow-500"} 
          textContent={overview[0]?.name} 
          value={overview[0]?.value}/>
        <Box  
          icon={overview[1]?.icon}
          textColor={"text-blue-200"}
          bgColor={"bg-blue-50"}
          iconColor={"text-blue-100"}
          textContent={overview[1]?.name}
          value={overview[1].value}/>
        <Box  
          icon={overview[2]?.icon}
          textColor={"text-blue-200"}
          bgColor={"bg-pink-50"}
          iconColor={""}
          textContent={overview[2]?.name}
          value={overview[2]?.value}/>
        <Box  
          icon={overview[3]?.icon}
          textColor={"text-blue-200"}
          bgColor={"bg-green-50"}
          iconColor={""}
          textContent={overview[3]?.name}
          value={overview[3]?.value}/>
      </div>
    </div>
  )
}