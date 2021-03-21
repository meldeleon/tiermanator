import React from "react"
import Tier from "./Tier"

//define board. Board consists of tiers.

function Tiers({ columns }) {
  console.log(columns)
  console.log(Object.keys(columns.data))

  return Object.keys(columns.data).map((column) => {
    console.log(columns.data[column])
    return (
      <Tier
        key={column}
        name={column}
        viewersInTier={columns.data[column]}
      ></Tier>
    )
  })
}
export default Tiers
