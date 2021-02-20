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
          <div className="card-header">
            <p className="card-header-title title is-5">{index + 1}</p>
          </div>
          <div className="card-content">
            <div className="media">
              <img className="card-image profile-pic" src={`${image}`}></img>
              <span className="title is-5 viewer-name">{name}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Viewer
