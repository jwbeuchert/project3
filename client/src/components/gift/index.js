import React from "react";

<<<<<<< HEAD
const Gift = (props) => {
  if (props.noGift) {

  }

  return (
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Gift Page</h5>
    <h6 class="card-subtitle mb-2 text-muted">Gift Description</h6>
    <p class="card-text">A description of your gift.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
  {!props.noGift ?
   <button className="btn btn-danger" onClick={e => props.deleteList(e, props.list._id)}>Delete</button>
   : null }
</div>
  )
}
export default Gift
=======
function Gift() {
  return <h1>Gift</h1>;
}

export default Gift;
>>>>>>> 7f488016091581f523a895b7348ba5fad5051b38
