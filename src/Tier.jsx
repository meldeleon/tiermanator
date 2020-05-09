import React from 'react';
import { Viewer } from './Viewer'
import { columns } from "react-bulma-components";
import viewers from './data.js'
import { ItemTypes } from './Constants';
import { useDrop } from 'react-dnd';


//return tier with viewers in data object where tier matches
export function Tier(props) {
    return (<div class="column panel">
        <h1 class="panel-heading has-text-centered is-size-3"><strong>{props.name} tier</strong></h1>
            {
                generateViewers(props.name)
            }
    </div>
    )

}

//return arrway of viewers in a specific tier
function generateViewers(tierName) {
    return (
        viewers.map(item => {
            if (item.tier === tierName) {
                return (
                    <Viewer name={item.login} image={item.profile_image_url} />
                )
            }
        })
    )

}

function reAssignTier(tier) {

}

