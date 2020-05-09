import React from 'react';
import { Tier } from './Tier.jsx';
import viewers from './data.js';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'


//define board. Board consists of tiers. 

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
