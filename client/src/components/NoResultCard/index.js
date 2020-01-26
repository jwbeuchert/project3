import React from "react"

const NoResultCard = (props) => {
    return (
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{`There are no ${props.type}.`}</h5>
        </div>
        </div>
    )
}

export default NoResultCard