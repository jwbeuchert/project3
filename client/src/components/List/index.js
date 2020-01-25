import React from "react"

const List = (props) => {


    return (
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{props.listname}</h5>
        </div>
      </div>
    )
}

export default List