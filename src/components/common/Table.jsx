"use client"
import ScrollView from "./ScrollView";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Table({ head, rows, isEditTable, scrollViewStyle, setInfo, handleOpenForm }) {

  return (
    <div className="rounded-[20px] shadow-md mt-5 border-spacing-x-2 bg-white">
      <table className="table-fixed text-center items-center ml-2 mr-10">
        <div className="h-[70x]"> {/* this is make for the header is aligned evenly with the body*/}
          <thead className="h-[70px]">
            <tr className="first:w-[100px]">
              {head.map((header, index) => (
                <th className="border-b-2 border-grey-50 w-[200px]" key={index}>{header}</th>
              ))}
            </tr>
          </thead>
        </div>
      </table>
      <ScrollView style={scrollViewStyle}>
        <table className="table-fixed text-center items-center ml-2 mr-10">
            <tbody>
              {rows?.map(row => {
                return (
                  <tr key={row.id} className="relative" onClick={() => {
                    setInfo(row)
                    handleOpenForm()
                  }}>
                    {Object.values(row).map((cell, index) => (
                      <td className="border-b-2 border-grey-50 pt-3 pb-3 text-[14px] w-[200px] cursor-pointer" key={index}>{cell.length > 10 ? cell.slice(0, 10) + "..." : cell}</td>
                    ))}
                    {isEditTable && <MdEdit className="absolute h-full cursor-pointer" style={{right: "-30px"}} color="#cecece"/>}
                  </tr>
                )
              })}
            </tbody>
            <div className="h-5 bg-white"></div>
        </table>
      </ScrollView>

    </div>
  )
}