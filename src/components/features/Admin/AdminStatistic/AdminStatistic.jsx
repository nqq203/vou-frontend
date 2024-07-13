import dynamic from "next/dynamic"

const DynamicLineChart = dynamic(() => import("@components/common/LineChart"), { ssr: false})
const DynamicPieChart = dynamic(() => import("@components/common/PieChart"), { ssr: false})

export default function AdminStatistic() {
  return (
    <div className="flex flex-row overscroll-y-none">
      <div className="w-3/5 bg-white shadow-md rounded-[8px] p-4 mr-5">
        <DynamicLineChart />
      </div>
      <div className="w-2/5 bg-white shadow-md rounded-[8px]">
        <DynamicPieChart />
      </div>
    </div>
  )
}