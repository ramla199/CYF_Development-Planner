import React, { useState } from "react";
import Logout from "../Logout";

function File({
  name,
  completed,
  id,
  toggleTaskCompleted,
  deleteTask,
  editTask,
  setAuth,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={id}>Edit</label>
        <textarea id={id} type="text" value={newName} onChange={handleChange} />
      </div>
      <div>
        <button type="button" onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div>
      <div>
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id}>{name}</label>
      </div>
      <div className="buttons">
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Logout setAuth={setAuth} />
      <li>{isEditing ? editingTemplate : viewTemplate}</li>
    </>
  );
}

export default File;
