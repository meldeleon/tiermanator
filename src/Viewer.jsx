import React from 'react';
import { ItemTypes } from './Constants.js';

//define a viewer card. Viewer card consists of twitch name and profile picture.
export function Viewer(props) {
  return (
    <div class="card panel-block" 
    style={{
      width:"100%", }}>
      <div class="card-content">
        <div class="media-left">
          <img class="profile-pic" src={`${(props.image)}`}></img>
          <span class="title is-6 viewer-name">{props.name}</span>
        </div>
      </div>
    </div> 
  );
}

export default Viewer

