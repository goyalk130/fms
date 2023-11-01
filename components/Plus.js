"use client"
import React from "react";
// import AddIcon from '@mui/icons-material/Add';
const Plus = ({className,onAddClick}) => {
  return (
    <div className={`${className}`} onClick={()=>{
      onAddClick();
    }}>
      <button
        type="submit"
        className=" bg-blue-300 hover:bg-blue-400 w-full   rounded-lg text-white shadow-lg flex justify-center items-center text-2xl p-2 "
      >
        {/* <AddIcon/> */}
        +
      </button>
    </div>
  );
};

export default Plus;

