import React from 'react';
import { Tier } from './Tier.jsx';
import viewers from './data.js';


//define board. Board consists of tiers. 

export function Board() {
    return (
        <div id="board" class="columns" style={{padding: "1.5%"}}>
            {
                renderTiers()
            }
        </div >
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
