import React, { useState } from "react";

const EditDraft = ({ todo, setTodosChange }) => {
  //editText function

  const editText = async (id) => {
    try {
      const body = { description };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/dashboard/drafts/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTodosChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [description, setDescription] = useState(todo.description);
  return (
    <>
      <button
        type="button"
        data-toggle="modal"
        data-target={`#id${todo.draft_id}`}
      >
        Edit
      </button>

      <div
        id={`id${todo.draft_id}`}
        onClick={() => setDescription(todo.draft_text)}
      >
        <div>
          <div>
            <div>
              <h4>Edit Todo</h4>
              <button
                type="button"
                data-dismiss="modal"
                onClick={() => setDescription(todo.draft_text)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                onClick={() => editText(todo.draft_id)}
              >
                Edit
              </button>
              <button
                type="button"
                data-dismiss="modal"
                onClick={() => setDescription(todo.draft_text)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDraft;
