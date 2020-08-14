import React, { Profiler } from "react";
import { Column } from "react-bulma-components";
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
          <div className="title is-1 has-text-centered">{name}</div>
          {viewersInTier.map((viewer, index) => {
            return (
              <Viewer
                name={viewer.login}
                image={viewer.profile_image_url}
                key={viewer.login}
                index={index}
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
