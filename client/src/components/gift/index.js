// import React from "react";

<<<<<<< HEAD
// const Gift = props => {
//   if (props.noGift) {
//   }

//   return (
//     <div class="card" style="width: 18rem;">
//       <div class="card-body">
//         <h5 class="card-title">Gift Page</h5>
//         <h6 class="card-subtitle mb-2 text-muted">Gift Description</h6>
//         <p class="card-text">A description of your gift.</p>
//         <a href="#" class="card-link">
//           Card link
//         </a>
//         <a href="#" class="card-link">
//           Another link
//         </a>
//       </div>
//       {!props.noGift ? (
//         <button
//           className="btn btn-danger"
//           onClick={e => props.deleteList(e, props.list._id)}
//         >
//           Delete
//         </button>
//       ) : null}
//     </div>
//   );
// };
// export default Gift;
=======
const Gift = props => {
  return (
    <div class="card sub-card">
      <div class="card-body">
        <h5 class="card-title">{props.gift.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Gift Description</h6>
        <p class="card-text">{prop.gift.description}</p>
        <h6 class="card-subtitle mb-2">{`Cost: ${props.gift.cost}`}</h6>
        <a href={props.gift.link} class="card-link">
          Link to gift
        </a>
      </div>
    </div>
  );
};
export default Gift;
>>>>>>> c1ec740c448f312e8c170e84c2a31aaad7f6c6bb
