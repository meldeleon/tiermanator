import React from "react"
import Tiers from "./Tiers"
import { DragDropContext } from "react-beautiful-dnd"
import { getViewers, pushViewer } from "./db.js"
console.log(pushViewer)
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
    console.log(result)
    const draggableIndex = this.state.currentViewers.findIndex(
      (x) => x.login === draggableId
    )
    //update state
    let newState = { ...this.state }
    if (destination) {
      newState.currentViewers[draggableIndex].place = destination.index
      newState.currentViewers[draggableIndex].tier = destination.droppableId
      this.setState({
        currentTiers: this.state.currentTiers,
        currentViewers: newState.currentViewers,
      })
      console.table(this.state)
      //push to DB
      console.log("place: " + destination.index)
      pushViewer(draggableId, destination.index, destination.droppableId)
    }

    // if there is no destination do nothing
    else if (!destination) {
      console.log("viewer carried outside of droppable area")
    }

    //if position does not change also do nothing
    else if (
      destination.droppableId === source.droppableId &&
      destination.place === source.place
    ) {
      console.log("viewer position unchanged")
    } else {
      console.log("last edge case, check code")
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
