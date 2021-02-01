import React from "react"
import { card } from "react-bulma-components"
import { Draggable } from "react-beautiful-dnd"
//define a viewer card. Viewer card consists of twitch name and profile picture.

export function Viewer({ name, image, index }) {
  return (
    <Draggable draggableId={name} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="card panel-block"
          style={{
            width: "100%",
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-content">
            <div className="media-left">
              <img className="profile-pic" src={`${image}`}></img>
              <span className="title is-6 viewer-name">{name}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Viewer
