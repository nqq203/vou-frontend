"use client"

export default function Box({icon, textColor, bgColor, iconColor, textContent, value}) {
  return <div className="flex items-center bg-white shadow-md rounded-[8px] p-4">
    <div className={iconColor + " rounded-full p-4 mr-4 " + bgColor}>
      {icon}
    </div>
    <div>
      <div className={"text-l font-semi-light " + textColor}>{textContent}</div>
      <div className="text-l">${value}</div>
    </div>
  </div>
}