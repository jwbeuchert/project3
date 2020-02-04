import React from "react"

const FriendCardContents = (props) => {
    return (
        <div className="card-body">
          <h5 className="card-title">{props.user.email}</h5>
          <div>{props.isChecked}</div>
        </div>
    )
}

export default FriendCardContents