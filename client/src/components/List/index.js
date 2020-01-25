import React from "react"

const List = (props) => {
    if (props.noList) {

    }

    return (
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{props.list.name}</h5>
        </div>
        {!props.noList ?
        <button className="btn btn-danger" onClick={e => props.deleteList(e, props.list._id)}>Delete</button>
        : null }
      </div>
    )
}

export default List