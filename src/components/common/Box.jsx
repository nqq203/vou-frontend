"use client"

export default function Box({icon, textColor, bgColor, iconColor, textContent, value}) {
  return <div className="flex items-center bg-white shadow-md rounded-[8px] p-4">
    <div className={"text-heading1 font-bold mr-3 " + textColor}>{value}</div>
    <div>
      <div className={"text-[18px] font-semibold text-black"}>{textContent}</div>
      {/* <div className={iconColor + " rounded-full p-2 " + bgColor}>
        {icon}
      </div> */}
    </div>
  </div>
}