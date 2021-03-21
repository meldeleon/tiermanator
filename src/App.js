import React from "react"
import Tiers from "./Tiers"
import { data } from "./example.js"
import { DragDropContext } from "react-beautiful-dnd"
import { getViewers, pushViewer } from "./db.js"
console.log(pushViewer)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data,
    }
  }
  /*async componentDidMount() {
    this.setState(await getViewers())
  }
  */
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
