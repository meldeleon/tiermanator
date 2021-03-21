import React from "react"
import Tier from "./Tier"

//define board. Board consists of tiers.

function Tiers({ tiers }) {
  return Object.keys(tiers).map(x => return x)



  return columns.map((column) => {
    const viewersInTier = viewerList
      .filter((viewer) => viewer.tier === column)
      .sort(function (a, b) {
        return a.place - b.place
      })
    //console.table(viewersInTier)
    if (column.index % 2 === 0) {
      return <Tier key={column} name={column} viewersInTier={viewersInTier} />
    } else {
      return (
        <Tier
          key={column}
          name={column}
          viewersInTier={viewersInTier}
          className={"lightblue"}
        />
      )
    }
  })
}
export default Tiers
