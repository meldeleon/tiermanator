import React from "react"
import Tier from "./Tier"

//define board. Board consists of tiers.

function Tiers({ columns, viewerList }) {
  //console.table(viewerList)
  return columns.map((column) => {
    const viewersInTier = viewerList
      .filter((viewer) => viewer.tier === column)
      .sort(function (a, b) {
        return a.index - b.index
      })
    //console.table(viewersInTier)
    return <Tier key={column} name={column} viewersInTier={viewersInTier} />
  })
}
export default Tiers
