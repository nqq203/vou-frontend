"use client"
export default function Table({head, rows}) {
  const maxVisible = 8;
  const maxHeight = `${48 * maxVisible}px`


  return (
    <table className="table-fixed w-full rounded-[12px] shadow-md mt-5 border-spacing-x-2 text-center">
      <thead>
        <tr>
          {head.map((header, index) => (
            <th className="border-b-2 border-grey-50 p-3" key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map(row => {
          return (
            <tr key={row.id}>
              {Object.values(row).map((cell, index) => (
                <td className="border-b-2 border-grey-50 p-2 text-[14px]" key={index}>{cell}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
      <div className="h-5 bg-white"></div>
    </table>
  )
}