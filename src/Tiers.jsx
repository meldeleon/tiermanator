import React from "react";
import { columns } from "react-bulma-components";
import Tier from "./Tier";

//define board. Board consists of tiers.

function Tiers({ columns, viewerList }) {
  console.table(viewerList);
  return columns.map((column) => {
    const viewersInTier = viewerList.filter((viewer) => viewer.tier === column);
    return (
      <div className="columns">
        <Tier key={column} name={column} viewersInTier={viewersInTier} />
      </div>
    );
  });
}
export default Tiers;

/*BAD CODE FOR BAD PEOPLE
export function Board() {
    return (
        <DndProvider backend={Backend}>

        <div id="board" class="columns" style={{padding: "1.5%"}}>
            {
                renderTiers()
            }
        </div >
        </DndProvider>
    )
}


function renderTiers() {
    let renderedTiers = generateTiers();
    return (
        renderedTiers
    )
}


//get list of tiers
const tiers = viewers.map(item => {
    return item.tier
}
);
//remove duplicates
const uniqueTiers = Array.from(new Set(tiers));

//print tiers for check
console.log(`unique tiers: ${uniqueTiers}`);

function generateTiers() {
    const currentTiers = uniqueTiers.map(item => {
        return (
            <Tier name={item} />
        )
    })
    return currentTiers
}
*/
