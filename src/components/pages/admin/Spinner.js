import React, { Component } from "react"
// import ClipLoader from "react-spinners/ClipLoader"
// import RingLoader from "react-spinners/RingLoader"
// import FadeLoader from "react-spinners/FadeLoader"
import {PushSpinner, ClassicSpinner, MetroSpinner} from "react-spinners-kit"

class Spinner extends Component {
  state = {}

  render() {
    return (
      <div className="jumbo-back">
        <div className="container sp">
          <div className="jumbotron jumbo">
            <div className="metro-spin">
            <MetroSpinner
              size={90}
              color={"#9a2387"}
              loading={this.state.loading}
              
              
            />
            </div>
            <small><b>{this.props.msg}</b></small>
          </div>
        </div>
      </div>
    )
  }
}

export default Spinner
