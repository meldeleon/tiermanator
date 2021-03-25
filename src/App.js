import React from "react"
import Tiers from "./Tiers"
import { DragDropContext } from "react-beautiful-dnd"
import { getViewers, pushViewer } from "./db.js"
console.log(pushViewer)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new Object(),
    }
  }
  async componentDidMount() {
    let dbState = await getViewers()
    console.log(dbState)
    this.setState({ data: dbState })
  }
  //what to do when a viewer gets dragged to a new destination
  onDragEnd = (result) => {
    let { destination, source, draggableId } = result
    console.log(result)
    let newState = { ...this.state }
    //check if destination exists
    if (destination) {
      let sourceArray = newState.data[source.droppableId]
      let destinationArray = newState.data[destination.droppableId]
      console.log(sourceArray, destinationArray)
      //if dragging to new tier
      if (source.droppableId !== destination.droppableId) {
        //splice viewer to destination tier at destination index
        destinationArray.splice(destination.index, 0, sourceArray[source.index])
        //remove viewer from previous source tier.
        sourceArray.splice(source.index, 1)

        //update tier in viwer data object
        newState.data[source.droppableId].tier = destination.droppableId
      } //if dragging within same tier
      else {
        arrayMove(sourceArray, source.index, destination.index)
      }
      //reassign place as new index.
      destinationArray.forEach((viewer, index) => {
        viewer.place = index
        viewer.tier = destination.droppableId
        console.log(viewer)
        pushViewer(viewer.login, index, viewer.tier)
      })
      sourceArray.forEach((viewer, index) => {
        viewer.place = index
        pushViewer(viewer.login, index, viewer.tier)
      })
    } else {
      console.log("Destionation does not exist.")
    }
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div id="board" className="columns" style={{ padding: "1.5%" }}>
          <Tiers columns={this.state} />
        </div>
      </DragDropContext>
    )
  }
}
export default App

//helper functions for re-arranging viewers
function arrayMove(arr, oldIndex, newIndex) {
  arr.splice(newIndex + 1, 0, arr[oldIndex])
  arr.splice(oldIndex, 1)
}
