import dynamic from "next/dynamic"
import { useEffect } from "react"

const DynamicLineChart = dynamic(() => import("@components/common/LineChart"), { ssr: false})
const DynamicPieChart = dynamic(() => import("@components/common/PieChart"), { ssr: false})

export default function AdminStatistic({listNumUsers}) {
  // [Player, brand, admin]
  // const listNumOfUsers = listNumUsers; 
  const dataThisYear = [12000, 19000, 3000, 5000, 2000, 30000, 45000];
  const dataLastYear = [15000, 23000, 7000, 5000, 3000, 20000, 30000];

  return (
    <div className="flex flex-row overscroll-y-none">
      <div className="w-3/5 bg-white shadow-md rounded-lg p-4 mr-5">
        <DynamicLineChart dataThisYear={dataThisYear} dataLastYear={dataLastYear} />
      </div>
      <div className="w-2/5 bg-white shadow-md rounded-lg">
        <DynamicPieChart data={listNumUsers}/>
      </div>
    </div>
  )
}