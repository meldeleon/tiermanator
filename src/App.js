import React from "react"
import Tiers from "./Tiers"
import { DragDropContext } from "react-beautiful-dnd"
import { getViewers } from "./db.js"
console.log(getViewers)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTiers: [],
      currentViewers: [],
    }
  }
  async componentDidMount() {
    this.setState(await getViewers())
  }
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    console.log(destination)
    console.table(this.state)
    // if there is no destination do nothing
    if (!destination) {
      console.log("viewer carried outside of droppable area")
      return
    }

    //if position does not change also do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("viewer position unchanged")
      return
    } else {
      // if the tier changes we want to change the value of the viewer's tier property to the new destination tier.
      // starting tier source.droppableId; ending tier destination.droppableId
      //destroy the value of tier and replaice it with the new value
      //destroy the value of the index, and replace it with new value
      // if the index changes within the tier we want change the index value of the viewer when generating tier.
    }
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div id="board" className="columns" style={{ padding: "1.5%" }}>
          <Tiers
            columns={this.state.currentTiers}
            viewerList={this.state.currentViewers}
          />
        </div>
      </DragDropContext>
    )
  }
}
export default App
