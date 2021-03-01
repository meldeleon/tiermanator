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
    let { destination, source, draggableId } = result
    console.log(result)
    const draggableIndex = this.state.currentViewers.findIndex(
      (x) => x.login === draggableId
    )
    let movedUp = this.state.currentViewers
      .map((viewer, index) => {
        if (
          viewer.tier === destination.droppableId &&
          viewer.place === destination.index
        ) {
          return index
        }
      })
      .filter((viewer) => {
        return viewer !== undefined
      })

    let movedDown = this.state.currentViewers
      .map((viewer, index) => {
        if (
          viewer.tier === destination.droppableId &&
          viewer.place > destination.index
        ) {
          return index
        }
      })
      .filter((viewer) => {
        return viewer !== undefined
      })
    function updateTierOrder(state, movedUp, movedDown) {
      let viewers = this.state.currentViewers
      //move up one
      viewers[movedUp[0]].place -= 1
      // move everything else down
      movedDown.map((x) => {
        viewers[x].place = viewers[x].place + 1
      })
    }
    console.log(this.state.currentViewers)
    //update state
    let newState = { ...this.state }
    if (destination) {
      console.log(
        "original index: " + this.state.currentViewers[draggableIndex].place
      )
      console.log("destination index: " + destination.index)

      newState.currentViewers[draggableIndex].place = destination.index
      newState.currentViewers[draggableIndex].tier = destination.droppableId

      //update state
      this.setState({
        currentTiers: this.state.currentTiers,
        currentViewers: newState.currentViewers,
      })

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
