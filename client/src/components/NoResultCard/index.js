import React from "react"

// pass in a string via the props named "message" to print to the screen
const NoResultCard = (props) => {
    return (
        <div className="card sub-card">
        <div className="card-body">
          <h5 className="card-title">{props.message}</h5>
        </div>
        </div>
    )
}

export default NoResultCard