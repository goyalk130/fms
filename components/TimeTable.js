"use client"
import React from 'react'
import TimeTableRow from './TimeTableRow'

const TimeTable = ({data}) => {

  
  

  return (
 
        <table>
            <tbody>
            {data.map(item=>{
              return (<TimeTableRow data={item} />)
            })}
            </tbody>
        </table>
  )
}

export default TimeTable
