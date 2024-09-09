"use client"
import ScrollView from "./ScrollView";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Table({ head, rows, listUsers, isEditTable, scrollViewStyle, setInfo, handleOpenForm }) {
  
  return (
    <div className="rounded-lg shadow-md mt-5 border-spacing-x-2 bg-white max-h-[550px] overflow-hidden border border-gray-200">
      {listUsers.length === 0 ? (
        <div className="text-lg font-regular m-10">Không có dữ liệu</div>
      ) : (
        <>
          <table className="table-fixed text-center items-center ml-2 mr-10">
            <div className="h-[50x]"> {/* this is make for the header is aligned evenly with the body*/}
              <thead className="h-[70px]">
                <tr className="first:w-[10px]">
                  {head.map((header, index) => {
                    if(index === 0 ){
                      return <th key={index} className="border-b-2 border-grey-50 w-[50px]">{header}</th>
                    } else if(index === 4 || index === 5){
                      return <th key={index} className="border-b-2 border-grey-50 w-[150px]">{header}</th>
                    }
                    
                    return <th key={index} className="border-b-2 border-grey-50 w-[250px]">{header}</th>
                  }
                  )}
                </tr>
              </thead>
            </div>
          </table>
          <ScrollView style={scrollViewStyle}>
            <table className="table-fixed text-center items-center ml-2 mr-10">
                <tbody>
                  {rows?.map((row,index) => {
                    return (
                      <tr key={index} className="relative hover:bg-gray-50" onClick={() => {
                        setInfo(listUsers[index])
                        handleOpenForm()
                      }}>
                        {Object.values(row).map((cell, index) => {
                          if(index === 0){
                            return <td className="border-b-2 border-grey-50 pt-3 pb-3 text-[14px] w-[50px] cursor-pointer" key={index}>{cell?.length > 30 ? cell.slice(0, 30) + "..." : cell}</td>
                          } else if(index === 4 || index === 5){
                            return <td className="border-b-2 border-grey-50 pt-3 pb-3 text-[14px] w-[150px] cursor-pointer" key={index}>{cell?.length > 30 ? cell.slice(0, 30) + "..." : cell}</td>
                          }
                          return <td className="border-b-2 border-grey-50 pt-3 pb-3 text-[14px] w-[250px] cursor-pointer" key={index}>{cell?.length > 30 ? cell.slice(0, 30) + "..." : cell}</td>
                        }
                        )}
                        {isEditTable && <MdEdit className="absolute h-full cursor-pointer hover:bg-gray-50" style={{right: "-30px"}} color="#949494"/>}
                      </tr>
                    )
                  })}
                </tbody>
                <div className="h-5 bg-white"></div>
            </table>
          </ScrollView>
        </>
      )}
    </div>
  )
}