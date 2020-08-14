import React from "react";
import { Columns } from "react-bulma-components";
import Tier from "./Tier";

//define board. Board consists of tiers.

function Tiers({ columns, viewerList }) {
  console.table(viewerList);
  return columns.map((column) => {
    const viewersInTier = viewerList.filter((viewer) => viewer.tier === column);
    return (
      <Columns>
        <Tier key={column} name={column} viewersInTier={viewersInTier} />
      </Columns>
    );
  });
}
export default Tiers;
