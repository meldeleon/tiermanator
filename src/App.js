import React from "react";
import { viewers, uniqueTiers } from "./data.js";
import Tiers from "./Tiers";
import { DragDropContext } from "react-beautiful-dnd";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = viewers;
  }
  onDragEnd = () => {};
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div id="board" className="columns" style={{ padding: "1.5%" }}>
          <Tiers columns={uniqueTiers} viewerList={this.state} />
        </div>
      </DragDropContext>
    );
  }
}

export default App;
