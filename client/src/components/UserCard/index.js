import React from "react"

const UserCard = (props) => {
    return (
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{props.giftee.email}</h5>
        </div>
      </div>
    )
}

export default UserCard