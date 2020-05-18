import React, { Profiler } from "react";
import { column } from "react-bulma-components";
import { Droppable } from "react-beautiful-dnd";
import { Viewer } from "./Viewer";

function Tier({ name, viewersInTier }) {
  console.table(name);
  return (
    <Droppable droppableId={name} type="TIER">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="column is-centered"
          {...provided.droppableProps}
        >
          <div className="title is-1">{name}</div>
          {viewersInTier.map((viewer) => {
            return (
              <Viewer
                name={viewer.login}
                image={viewer.profile_image_url}
                key={viewer.login}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Tier;
